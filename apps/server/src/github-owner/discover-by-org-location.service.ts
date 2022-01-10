import { Injectable, Logger } from '@nestjs/common';
import { OctokitService } from '../octokit/octokit.service';
import { OwnerReason } from '../owner/constants';
import { GithubOwnerService } from './github-owner.service';

@Injectable()
export class GithubDiscoverByOrgLocationService {
  constructor(
    private readonly octokit: OctokitService,
    private readonly githubOwnerService: GithubOwnerService
  ) {}
  private logger = new Logger(GithubDiscoverByOrgLocationService.name);

  async discover() {
    let page = 1;
    const organizations: Awaited<
      ReturnType<OctokitService['rest']['search']['users']>
    >['data']['items'] = [];
    this.logger.log(
      `Starting the discovery process based on organization location`
    );

    let finished = false;
    while (!finished) {
      const response = await this.octokit.rest.search.users({
        q: `location:iran type:org`,
        per_page: 100,
        page,
        sort: 'repositories',
        request: { timeout: 10000 },
      });

      page++;

      organizations.push(...response.data.items);

      if (
        organizations.length >= response.data.total_count || // Last page
        organizations.length >= 1000 // Can't query more - GitHub has a limit of 10 pages
      ) {
        finished = true;
      }
      this.logger.log(`Finished a page organizations...`);
    }

    this.logger.log(
      `Now populating the ${organizations.length} discovered orgs in the database...`
    );

    for (const org of organizations)
      await this.githubOwnerService.populateOwner(
        org,
        OwnerReason.PERSIAN_REPOSITORY
      );

    this.logger.log(
      `All ${organizations.length} discovered orgs have been successfully populated in the database.`
    );
  }
}
