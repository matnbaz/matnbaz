import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GithubService } from '../github/github.service';
import { OctokitService } from '../octokit/octokit.service';
import { MINIMUM_STARS } from '../repo-requirements';
import { GithubReadmeExtractorService } from './github-readme-extractor.service';
@Injectable()
export class GithubRepositoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService,
    private readonly readmeExtractor: GithubReadmeExtractorService,
    private readonly githubService: GithubService
  ) {}
  private logger = new Logger(GithubRepositoryService.name);

  async extractAndPopulateAllOwners() {
    let lastOwnerId;
    const ownersCount = await this.prisma.owner.count({
      where: { platform: 'GitHub' },
    });
    let completedCount = 0;
    this.logger.log(`${ownersCount} owners found. Extracting now...`);

    const interval = setInterval(() => {
      const completedPercentage =
        Math.floor((completedCount / ownersCount) * 10000) / 100;
      this.logger.log(
        `${completedCount}/${ownersCount} (~${completedPercentage}%)`
      );
    }, 60000);
    while (ownersCount > completedCount) {
      for (const owner of await this.prisma.owner.findMany({
        where: {
          platform: 'GitHub',
          blockedAt: null,
        },
        select: { id: true, login: true },
        cursor: lastOwnerId && { id: lastOwnerId },
        take: 100,
      })) {
        await this.extractRepos(owner);
        completedCount++;
        lastOwnerId = owner.id;
      }
    }

    clearInterval(interval);
  }

  private extractRepos(owner: { login: string }) {
    return Promise.race([
      new Promise<void>((resolve) => {
        this.octokit.rest.repos
          .listForUser({
            per_page: 100,
            username: owner.login,
            request: { timeout: 5000 },
          })
          .then((response) => {
            const repos = response.data;
            Promise.all(
              repos.map(
                (repo) =>
                  new Promise<void>((_resolve) => {
                    // Disqualified (low stars)
                    if (repo.stargazers_count < MINIMUM_STARS)
                      return _resolve();

                    // Disqualified (description too long)
                    if (repo.description && repo.description.length > 512)
                      return _resolve();

                    this.githubService
                      .populateRepo(repo)
                      .then((repoInDb) => {
                        if (repoInDb)
                          this.readmeExtractor
                            .extractReadme(repoInDb.id)
                            .finally(() => _resolve());
                      })
                      .catch(() => _resolve());
                  })
              )
            )
              .then(() => resolve())
              .catch((e) => {
                this.logger.error(
                  `Error occured while extracting repos for ${owner.login}. ${e.message}`
                );
                resolve();
              });
          });
      }),
      new Promise<void>((resolve) => {
        // `extracting ${owner.login}'s repos taking too long. skipping...`
        setTimeout(() => resolve(), 20000);
      }),
    ]);
  }
}
