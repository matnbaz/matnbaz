import { MINIMUM_STARS } from '@matnbaz/common';
import { OctokitService } from '@matnbaz/octokit';
import { Injectable, Logger } from '@nestjs/common';
import { OwnerType, PlatformType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OwnerReason } from '../owner/constants';

@Injectable()
export class GithubDiscovererService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService
  ) {}
  private logger = new Logger(GithubDiscovererService.name);

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
          reason: reasonWithParam,
          platformId: owner.id.toString(),
          platform: PlatformType.GitHub,
          nodeId: owner.node_id,
          login: owner.login,
          type: owner.type as OwnerType,
        },
        update: {
          reason: reasonWithParam,
          platformId: owner.id.toString(),
          platform: PlatformType.GitHub,
          nodeId: owner.node_id,
          login: owner.login,
          type: owner.type as OwnerType,
        },
      });
    } catch (e) {
      this.logger.error(
        `Error while populating ${owner.login} with the ID of ${owner.id}: ${e.message}`
      );
    }
  }

  async validateOwner(githubLogin: string, type?: OwnerType) {
    if (!type) {
      const response = await this.octokit.rest.search.users({ q: githubLogin });
      if (response.data.items.length === 0) return false;
      type = response.data.items[0].type as OwnerType;
    }

    try {
      const q = `${
        type === 'User' ? 'user' : 'org'
      }:${githubLogin} stars:>${MINIMUM_STARS}`;

      const response = await this.octokit.rest.search.repos({
        q,
        per_page: 1,
        page: 1,
        request: { timeout: 10000 },
      });

      return response.data.total_count > 0;
    } catch (e) {
      return false;
    }
  }
}
