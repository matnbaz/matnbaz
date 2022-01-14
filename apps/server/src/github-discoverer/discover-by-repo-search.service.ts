import { MINIMUM_STARS } from '@matnbaz/common';
import { OctokitService } from '@matnbaz/octokit';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { OwnerReason } from '../owner/constants';
import { GithubDiscovererService } from './github-discoverer.service';
import { repoDiscoveryTerms } from './repo-discovery-terms';

@Injectable()
export class GithubDiscoverByRepoSearchService {
  constructor(
    private readonly octokit: OctokitService,
    private readonly prisma: PrismaService,
    private readonly githubDiscovererService: GithubDiscovererService
  ) {}
  private logger = new Logger(GithubDiscoverByRepoSearchService.name);

  async discoverByPredefinedTerms() {
    for (const term of repoDiscoveryTerms) await this.discover(term);
    this.logger.log('Finished discovery for all discovery terms');
  }

  /**
   * Discovers repositories based on the given term and discovers new owners
   * @param term Pass `term` to search for a term, pass `topic:topic_name` to search for a topic
   */
  async discover(term: string) {
    let page = 1;
    const repos: Awaited<
      ReturnType<OctokitService['rest']['search']['repos']>
    >['data']['items'] = [];
    this.logger.log(`Starting the discovery process for term "${term}"`);

    let finished = false;
    while (!finished) {
      const response = await this.octokit.rest.search.repos({
        q: term,
        per_page: 100,
        page,
        sort: 'stars',
        request: { timeout: 10000 },
      });

      page++;

      repos.push(...response.data.items);

      if (
        repos.length >= response.data.total_count || // Last page
        repos[repos.length - 1]?.stargazers_count < MINIMUM_STARS || // Low-star repos
        repos.length >= 1000 // Can't query more - GitHub has a limit of 10 pages
      ) {
        finished = true;
      }
      this.logger.log(`Finished a page of repositories for term "${term}"...`);
    }

    this.logger.log(
      `Now populating the ${repos.length} discovered maintainers for term "${term}" to the database`
    );

    for (const { owner, ...repo } of repos) {
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
      if (repo.stargazers_count < MINIMUM_STARS) {
        // Disqualified
        continue;
      }
      await this.githubDiscovererService.populateOwner(
        owner,
        OwnerReason.REPOSITORY_SEARCH,
        term
      );
    }
  }
}
