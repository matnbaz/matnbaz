import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GithubService } from '../github/github.service';
import { OctokitService } from '../octokit/octokit.service';
import { MINIMUM_STARS } from './constants';
import { GithubReadmeExtractorService } from './github-readme-extractor.service';
@Injectable()
export class GithubExtractorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService,
    private readonly readmeExtractor: GithubReadmeExtractorService,
    private readonly githubService: GithubService
  ) {}
  private logger = new Logger(GithubExtractorService.name);

  async extractAllOwners() {
    let lastOwnerId;
    const ownersCount = await this.prisma.owner.count({
      where: { platform: 'GitHub' },
    });
    let completedCount = 0;
    this.logger.log(`${ownersCount} owners found. Extracting now...`);

    setInterval(() => {
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
        this.extractRepos(owner);
        await new Promise((r) => setTimeout(r, 2000));
        completedCount++;
        lastOwnerId = owner.id;
      }
    }
  }

  private async extractRepos(owner: { login: string }) {
    try {
      const response = await this.octokit.rest.repos.listForUser({
        per_page: 100,
        username: owner.login,
        request: { timeout: 4000 },
      });

      const repos = response.data;

      for (const repo of repos) {
        // Disqualified (low stars)
        if (repo.stargazers_count < MINIMUM_STARS) continue;

        // Disqualified (description too long)
        if (repo.description && repo.description.length > 512) continue;

        const repoInDb = await this.githubService.populateRepo(repo);
        if (repoInDb) await this.readmeExtractor.extractReadme(repoInDb.id);
      }
    } catch (e) {
      this.logger.error(
        `Error occured while extracting repos for ${owner.login}. ${e.message}`
      );
    }
  }
}
