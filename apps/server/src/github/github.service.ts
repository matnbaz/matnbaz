import { Injectable, Logger } from '@nestjs/common';
import { OwnerType, PlatformType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OctokitService } from '../octokit/octokit.service';
import { OwnerReason } from '../owner/constants';

@Injectable()
export class GithubService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService
  ) {}
  private logger = new Logger(GithubService.name);

  async addOwner(username: string) {
    const response = await this.octokit.rest.users.getByUsername({ username });

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
