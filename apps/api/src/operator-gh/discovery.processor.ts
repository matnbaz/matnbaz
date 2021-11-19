import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import { Job } from 'bull';
import { PrismaService } from 'nestjs-prisma';
import { timeout } from '../utils/timeout';
import { GITHUB_QUEUE, MINIMUM_STARS } from './constants';
import { IDiscoverJobPayload } from './interfaces/job-queue';
import {
  IPaginatedRepositories,
  IRepositoryItem,
} from './interfaces/repository-search-response';

@Processor(GITHUB_QUEUE)
export class DiscoveryProcessor {
  constructor(private readonly prisma: PrismaService) {}
  logger = new Logger('DiscoveryProcessor-GitHub');

  @Process('discover')
  async discoverOwners(job: Job<IDiscoverJobPayload>) {
    this.logger.log('Starting the discovery for owners...');
    const term = job.data.term;
    if (!term) return;

    this.logger.log(`Looking for the term "${term}"...`);
    let page = 1;
    const repos: IRepositoryItem[] = [];

    let finished = false;
    while (!finished) {
      try {
        const response = await axios.get<
          unknown,
          { data: IPaginatedRepositories }
        >('https://api.github.com/search/repositories', {
          params: {
            q: term,
            per_page: 100,
            page,
            sort: 'stars',
          },
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        });

        page++;

        repos.push(...response.data.items);

        if (
          repos.length >= response.data.total_count || // Last page
          repos[repos.length - 1]?.stargazers_count < MINIMUM_STARS // Low-star repos
        ) {
          finished = true;
        }
        this.logger.log(
          `Finished a page of repositories for term "${term}"...`
        );
      } catch (e) {
        if (
          e.response?.status === 403 &&
          e.response?.data.message.includes('rate limit')
        ) {
          this.logger.warn(
            'Rate limited. will wait for a bit and try again...'
          );
          await timeout(10000);
        } else if (
          e.response?.status === 422 &&
          e.response?.data.message.includes('first 1000 search results')
        ) {
          // GitHub's limitation for pagination
          this.logger.warn(
            `Can't do more than 1000 pages. finishing the discovery for "${term}".`
          );
          finished = true;
        }
      }
    }

    this.logger.log(
      `Now populating the ${repos.length} discovered maintainers for term "${term}" to the database`
    );

    for (const { owner, ...repo } of repos) {
      if (repo.stargazers_count < MINIMUM_STARS) {
        this.logger.warn(
          `repo ${repo.full_name} with ${repo.stargazers_count} stars disqualified.`
        );
        break;
      }

      await this.prisma.owner.upsert({
        where: {
          platform_platformId: { platformId: owner.id, platform: 'GitHub' },
        },
        create: {
          platformId: owner.id,
          platform: 'GitHub',
          gravatarId: owner.gravatar_id,
          login: owner.login,
          type: owner.type,
          nodeId: owner.node_id,
          siteAdmin: owner.site_admin,
        },
        update: {
          platformId: owner.id,
          platform: 'GitHub',
          gravatarId: owner.gravatar_id,
          login: owner.login,
          type: owner.type,
          nodeId: owner.node_id,
          siteAdmin: owner.site_admin,
        },
      });
      this.logger.warn(
        `Discovered (probably) Iranian maintainer: ${owner.login}`
      );
    }
  }
}
