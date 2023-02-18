import { Injectable, Logger, Inject } from '@nestjs/common';
import { OwnerType } from '@prisma/client';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { Octokit } from 'octokit';
import { OCTOKIT } from '../octokit/octokit.constants';
import { OwnerReason } from '../owner/constants';
import { GithubDiscovererService } from './github-discoverer.service';
import { ownerDiscoveryTerms } from './owner-discovery-terms';

@Injectable()
export class GithubDiscoverByOwnerSearchService {
  constructor(
    @Inject(OCTOKIT) private readonly octokit: Octokit,
    private readonly prisma: PrismaService,
    private readonly githubDiscovererService: GithubDiscovererService,
  ) {}
  private logger = new Logger(GithubDiscoverByOwnerSearchService.name);

  async discoverByPredefinedTerms() {
    for (const term of ownerDiscoveryTerms) await this.discover(term);
    this.logger.log('Finished discovery for all discovery terms');
  }

  /**
   * Discovers maintainers based on the given term
   * @param term Pass `term` to search for a term, pass `location:location` to search for a specific location
   */
  async discover(term: string) {
    let page = 1;
    const owners: Awaited<
      ReturnType<Octokit['rest']['search']['users']>
    >['data']['items'] = [];
    this.logger.log(`Starting the discovery process for term "${term}"`);

    let finished = false;
    while (!finished) {
      const response = await this.octokit.rest.search.users({
        q: term,
        per_page: 100,
        page,
        sort: 'followers',
        request: { timeout: 10000 },
      });

      page++;

      owners.push(...response.data.items);

      if (
        owners.length >= response.data.total_count || // Last page
        owners.length >= 1000 // Can't query more - GitHub has a limit of 10 pages
      ) {
        finished = true;
      }
      this.logger.log(`Finished a page of owners for term "${term}"...`);
    }

    this.logger.log(
      `Now populating the ${owners.length} discovered maintainers for term "${term}" to the database`,
    );

    for (const owner of owners) {
      if (
        await this.prisma.owner.findUnique({
          where: {
            platform_platformId: {
              platform: 'GitHub',
              platformId: owner.id.toString(),
            },
          },
        })
      ) {
        // Already exists
        continue;
      }

      if (
        !(await this.githubDiscovererService.validateOwner(
          owner.login,
          owner.type as OwnerType,
        ))
      ) {
        // Not validated
        continue;
      }

      await this.githubDiscovererService.populateOwner(
        owner,
        OwnerReason.USER_SEARCH,
        term,
      );
    }
  }
}
