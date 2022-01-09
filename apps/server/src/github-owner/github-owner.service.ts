import { Injectable, Logger } from '@nestjs/common';
import { OwnerType, PlatformType } from '@prisma/client';
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

  async updateAllOwnersStatistics() {
    const owners = await this.prisma.owner.findMany({
      where: { blockedAt: null, type: OwnerType.User },
      select: { id: true, login: true },
    });

    for (const { id, login } of owners) {
      try {
        const { followersCount, totalContributions } =
          await this.getOwnerStatistics(login);
        await this.prisma.ownerStatistic.create({
          data: {
            contributionsCount: totalContributions,
            followersCount: followersCount,
            Owner: { connect: { id } },
          },
        });
      } catch (e) {
        this.logger.error(
          `Error while extracting statistics for owner ${login}.`
        );
      }
    }
  }

  async getOwnerStatistics(login: string) {
    const response: any = await this.octokit.graphql(
      `query ($login: String!) {
      user(login: $login) {
        name
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
    }`,
      { login, request: { timeout: 5000 } }
    );

    if (!response.user) throw Error('User does not exist.');

    return {
      totalContributions:
        response.user.contributionsCollection.contributionCalendar
          .totalContributions,
      followersCount: response.user.followers.totalCount,
      followingCount: response.user.following.totalCount,
    };
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
    reason: OwnerReason
  ) {
    try {
      await this.prisma.owner.upsert({
        where: {
          platform_platformId: {
            platformId: owner.id.toString(),
            platform: PlatformType.GitHub,
          },
        },
        create: {
          reason,
          platformId: owner.id.toString(),
          platform: PlatformType.GitHub,
          gravatarId: owner.gravatar_id,
          login: owner.login,
          type: owner.type as OwnerType,
          siteAdmin: owner.site_admin,
        },
        update: {
          reason: OwnerReason.PERSIAN_REPOSITORY,
          platformId: owner.id.toString(),
          platform: PlatformType.GitHub,
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
