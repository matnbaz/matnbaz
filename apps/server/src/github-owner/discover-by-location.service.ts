import { Injectable, Logger } from '@nestjs/common';
import { OctokitService } from '../octokit/octokit.service';
import { OwnerReason } from '../owner/constants';
import { GithubOwnerService } from './github-owner.service';

@Injectable()
export class GithubDiscoverByLocationService {
  constructor(
    private readonly githubOwnerService: GithubOwnerService,
    private readonly octokit: OctokitService
  ) {}
  logger = new Logger(GithubDiscoverByLocationService.name);

  /**
   * Gets as much as it can
   */
  async getIranianOwnersVoraciously() {
    await this.getIranianOwners('followers', 'desc');
    await this.getIranianOwners('repositories', 'desc');
    await this.getIranianOwners('joined', 'asc');
    await this.getIranianOwners('joined', 'desc');
  }

  async getIranianOwners(
    sort: 'repositories' | 'joined' | 'followers' = 'followers',
    order: 'asc' | 'desc' = 'desc'
  ) {
    const users: Awaited<
      ReturnType<OctokitService['rest']['search']['users']>
    >['data']['items'] = [];
    let page = 1;
    let finished = false;

    while (!finished) {
      const response = await this.octokit.rest.search.users({
        q: 'location:iran type:user',
        sort,
        order,
        per_page: 100,
        page,
        request: { timeout: 10000 },
      });

      page++;

      users.push(...response.data.items);

      if (
        users.length >= response.data.total_count || // Last page
        users.length >= 1000 // Can't query more - GitHub has a limit of 10 pages
      ) {
        finished = true;
      }
      this.logger.log(`Finished a page of users.`);
    }

    for (const user of users)
      await this.githubOwnerService.populateOwner(
        user,
        OwnerReason.GITHUB_LOCATION
      );
    this.logger.log(
      `Finished population for ${users.length} users based on ${sort} (${order})`
    );
  }
}
