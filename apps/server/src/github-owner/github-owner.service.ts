import { Injectable, Logger } from '@nestjs/common';
import { OwnerType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { GithubService } from '../github/github.service';
import { OctokitService } from '../octokit/octokit.service';
import { OwnerReason } from '../owner/constants';
import { MINIMUM_STARS } from '../repo-requirements';

@Injectable()
export class GithubOwnerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService,
    private readonly githubService: GithubService
  ) {}
  private logger = new Logger(GithubOwnerService.name);

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
      if (repo.stargazers_count < MINIMUM_STARS) {
        // Disqualified
        continue;
      }
      this.githubService.populateOwner(owner, OwnerReason.PERSIAN_REPOSITORY);
    }
  }

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
}
