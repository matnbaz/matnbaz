import { Injectable, Logger } from '@nestjs/common';
import { OwnerType, PlatformType } from '@prisma/client';
import { subHours } from 'date-fns-jalali';
import { PrismaService } from 'nestjs-prisma';
import { OctokitService } from '../octokit/octokit.service';
import { OwnerReason } from '../owner/constants';

@Injectable()
export class GithubOwnerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService
  ) {}
  private logger = new Logger(GithubOwnerService.name);

  async updateAllOwnersData() {
    const owners = await this.prisma.owner.findMany({
      where: {
        blockedAt: null,
        type: OwnerType.User,
        OR: [
          {
            latestExtractionAt: { lt: subHours(new Date(), 12) },
          },
          {
            latestExtractionAt: null,
          },
        ],
      },
      select: { id: true, nodeId: true, login: true },
    });
    const ownersCount = owners.length;
    let completedCount = 0;

    this.logger.log(`${ownersCount} owners found. Extracting now...`);

    const interval = setInterval(() => {
      const completedPercentage =
        Math.floor((completedCount / ownersCount) * 10000) / 100;
      this.logger.log(
        `${completedCount}/${ownersCount} (~${completedPercentage}%)`
      );
    }, 60000);

    for (const { id, login, nodeId } of owners) {
      try {
        const { followersCount, totalContributions, ...ownerData } =
          await this.getOwnerProfileData({ login, nodeId });
        await this.prisma.owner.update({
          where: { id },
          data: {
            nodeId: ownerData.nodeId,
            login: ownerData.login,
            latestExtractionAt: new Date(),
          },
        });
        await this.prisma.ownerStatistic.create({
          data: {
            contributionsCount: totalContributions,
            followersCount: followersCount,
            Owner: { connect: { id } },
          },
        });
      } catch (e) {
        if (e.message === 'User does not exist.') {
          await this.prisma.owner.delete({ where: { id } });
          this.logger.error(
            `User ${login} not found. deleting from the database.`
          );
        } else
          this.logger.error(
            `Error while extracting statistics owner ${login}.`
          );
      }
      completedCount++;
    }
    clearInterval(interval);
  }

  async getOwnerProfileData(owner: { nodeId?: string; login: string }) {
    const nodeId = owner.nodeId || (await this.getNodeIdFromLogin(owner.login));
    const response: any = await this.octokit.graphql(
      `query ($id: ID!) {
      node(id: $id) {
        ...on User { 
          name
          login
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }          
          }

          followers(first: 0){
            totalCount
          }
          
          following(first:0){
            totalCount
          }
        }
      }
    }`,
      { id: nodeId, request: { timeout: 5000 } }
    );

    if (!response.node) throw Error('User does not exist.');

    return {
      totalContributions:
        response.node.contributionsCollection.contributionCalendar
          .totalContributions,
      followersCount: response.node.followers.totalCount,
      followingCount: response.node.following.totalCount,
      login: response.node.login,
      nodeId,
    };
  }

  async getNodeIdFromLogin(login: string) {
    const response = await this.octokit.rest.users.getByUsername({
      username: login,
    });
    return response.data.node_id;
  }

  async addOwner(username: string) {
    const response = await this.octokit.rest.users.getByUsername({
      username,
      request: { timeout: 10000 },
    });

    this.populateOwner(
      response.data as Awaited<
        ReturnType<OctokitService['rest']['search']['repos']>
      >['data']['items'][0]['owner'],
      OwnerReason.SUBMISSION
    );
  }

  async populateOwner(
    owner: Awaited<
      ReturnType<OctokitService['rest']['search']['repos']>
    >['data']['items'][0]['owner'],
    reason: OwnerReason,
    reasonParam?: string
  ) {
    const reasonWithParam = reasonParam ? `${reason}:${reasonParam}` : reason;
    try {
      await this.prisma.owner.upsert({
        where: {
          platform_platformId: {
            platformId: owner.id.toString(),
            platform: PlatformType.GitHub,
          },
        },
        create: {
          latestExtractionAt: new Date(),
          reason: reasonWithParam,
          platformId: owner.id.toString(),
          platform: PlatformType.GitHub,
          nodeId: owner.node_id,
          gravatarId: owner.gravatar_id,
          login: owner.login,
          type: owner.type as OwnerType,
          siteAdmin: owner.site_admin,
        },
        update: {
          latestExtractionAt: new Date(),
          reason: reasonWithParam,
          platformId: owner.id.toString(),
          platform: PlatformType.GitHub,
          nodeId: owner.node_id,
          gravatarId: owner.gravatar_id,
          login: owner.login,
          type: owner.type as OwnerType,
          siteAdmin: owner.site_admin,
        },
      });
    } catch (e) {
      this.logger.error(
        `Error while populating ${owner.login} with the ID of ${owner.id}: ${e.message}`
      );
    }
  }
}
