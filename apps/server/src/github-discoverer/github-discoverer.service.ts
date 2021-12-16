import { Injectable, Logger } from '@nestjs/common';
import { OwnerType, PlatformType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OctokitService } from '../octokit/octokit.service';
import { MINIMUM_STARS } from './constants';

@Injectable()
export class GithubDiscovererService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService
  ) {}
  private logger = new Logger(GithubDiscovererService.name);

  async discoverByPredefinedTerms() {
    const terms = await this.prisma.discoveryTerm.findMany();

    for (const { term } of terms) await this.discover(term);
    this.logger.log('Finished discovery for all discovery terms');
  }

  /**
   * Discovers maintainers based on the given term
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
      if (repo.stargazers_count < MINIMUM_STARS) {
        this.logger.warn(
          `repo ${repo.full_name} with ${repo.stargazers_count} stars disqualified.`
        );
        continue;
      }
      this.logger.log(
        `repo ${repo.full_name} with ${repo.stargazers_count} stars qualified.`
      );
      this.populateOwner(owner);
    }
  }

  async populateOwner(
    owner: Awaited<
      ReturnType<OctokitService['rest']['search']['repos']>
    >['data']['items'][0]['owner']
  ) {
    this.logger.log(`Now populating ${owner.login} with the ID of ${owner.id}`);
    await this.prisma.owner.upsert({
      where: {
        platform_platformId: {
          platformId: owner.id.toString(),
          platform: PlatformType.GitHub,
        },
      },
      create: {
        platformId: owner.id.toString(),
        platform: PlatformType.GitHub,
        gravatarId: owner.gravatar_id,
        login: owner.login,
        type: owner.type as OwnerType,
        siteAdmin: owner.site_admin,
      },
      update: {
        platformId: owner.id.toString(),
        platform: PlatformType.GitHub,
        gravatarId: owner.gravatar_id,
        login: owner.login,
        type: owner.type as OwnerType,
        siteAdmin: owner.site_admin,
      },
    });
  }
}
