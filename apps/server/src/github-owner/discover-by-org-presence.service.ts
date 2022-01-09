import { Injectable, Logger } from '@nestjs/common';
import { OwnerType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OctokitService } from '../octokit/octokit.service';
import { OwnerReason } from '../owner/constants';
import { GithubOwnerService } from './github-owner.service';

@Injectable()
export class GithubDiscoverByOrgPresenceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService,
    private readonly githubOwnerService: GithubOwnerService
  ) {}
  private logger = new Logger(GithubDiscoverByOrgPresenceService.name);

  async discover() {
    const organizations = await this.prisma.owner.findMany({
      where: {
        type: OwnerType.Organization,
        blockedAt: null,
      },
    });

    for (const org of organizations) {
      this.logger.log(
        `Starting the discovery process based on organization membership`
      );

      const response = await this.octokit.rest.orgs.listPublicMembers({
        org: org.login,
        per_page: 100,
        sort: 'followers',
        request: { timeout: 10000 },
      });
      const owners = response.data;

      this.logger.log(
        `Now populating the ${owners.length} discovered orgs to the database...`
      );

      for (const org of owners)
        this.githubOwnerService.populateOwner(
          org,
          OwnerReason.ORGANIZATION_PRESENCE
        );
    }
  }
}
