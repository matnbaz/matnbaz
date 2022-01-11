import { slugifyLanguage } from '@matnbaz/common';
import { Injectable, Logger } from '@nestjs/common';
import { PlatformType, Prisma } from '@prisma/client';
import { subDays, subHours } from 'date-fns-jalali';
import { PrismaService } from 'nestjs-prisma';
import * as emoji from 'node-emoji';
import { OctokitService } from '../octokit/octokit.service';
import { MINIMUM_STARS } from '../repo-requirements';
import { GithubReadmeExtractorService } from './github-readme-extractor.service';
@Injectable()
export class GithubExtractorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService,
    private readonly readmeExtractor: GithubReadmeExtractorService
  ) {}
  private logger = new Logger(GithubExtractorService.name);

  async extractEveryonesRepos() {
    let lastOwnerId;
    const ownersCount = await this.prisma.owner.count({
      where: {
        platform: 'GitHub',
        blockedAt: null,
        OR: [
          {
            latestExtractionAt: { lt: subHours(new Date(), 12) },
          },
          {
            latestExtractionAt: null,
          },
        ],
      },
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
          OR: [
            {
              latestExtractionAt: { lt: subHours(new Date(), 12) },
            },
            {
              latestExtractionAt: null,
            },
          ],
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

                    this.populateRepo(repo)
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

  async populateRepo({
    owner,
    topics,
    license,
    ...repo
  }: Awaited<
    ReturnType<OctokitService['rest']['repos']['listForUser']>
  >['data'][0]) {
    const ownerFromDb = await this.prisma.owner.findUnique({
      where: {
        platform_platformId: {
          platform: 'GitHub',
          platformId: owner.id.toString(),
        },
      },
    });

    const repoData: Prisma.XOR<
      Prisma.RepositoryCreateInput,
      Prisma.RepositoryUncheckedCreateInput
    > = {
      latestExtractionAt: new Date(),
      blockedAt: ownerFromDb.blockedAt ? new Date() : undefined,
      platformId: repo.id.toString(),
      platform: 'GitHub',
      allowForking: repo.allow_forking,
      archived: repo.archived,
      createdAt: repo.created_at,
      defaultBranch: repo.default_branch,
      description: emoji.emojify(repo.description),
      disabled: repo.disabled,
      forksCount: repo.forks_count,
      hasIssues: repo.has_issues,
      hasPages: repo.has_pages,
      hasProjects: repo.has_projects,
      hasWiki: repo.has_wiki,
      homePage: repo.homepage,
      isFork: repo.fork,
      isTemplate: repo.is_template,
      name: repo.name,
      openIssuesCount: repo.open_issues_count,
      pushedAt: repo.pushed_at,
      size: repo.size,
      stargazersCount: repo.stargazers_count,
      updatedAt: repo.updated_at,
      watchersCount: repo.watchers_count,
      mirrorUrl: repo.mirror_url,
      weeklyTrendIndicator: await this.calculateTrendIndicator(
        repo.id.toString(),
        repo.stargazers_count,
        'weekly'
      ),
      monthlyTrendIndicator: await this.calculateTrendIndicator(
        repo.id.toString(),
        repo.stargazers_count,
        'monthly'
      ),
      yearlyTrendIndicator: await this.calculateTrendIndicator(
        repo.id.toString(),
        repo.stargazers_count,
        'yearly'
      ),
      Topics: {
        connectOrCreate: topics.map((topicName) => ({
          where: { name: topicName },
          create: { name: topicName },
        })),
      },
      Language: repo.language
        ? {
            connectOrCreate: {
              where: {
                slug: slugifyLanguage(repo.language.toLowerCase()),
              },
              create: {
                slug: slugifyLanguage(repo.language.toLowerCase()),
                name: repo.language,
              },
            },
          }
        : undefined,
      License: license
        ? {
            connectOrCreate: {
              where: {
                key: license.key,
              },
              create: {
                key: license.key,
                name: license.name,
                spdxId: license.spdx_id,
              },
            },
          }
        : undefined,
      Owner: {
        connect: {
          platform_platformId: {
            platform: 'GitHub',
            platformId: owner.id.toString(),
          },
        },
      },
    };

    const repoInDb = await this.prisma.repository.upsert({
      where: {
        platform_platformId: {
          platformId: repo.id.toString(),
          platform: 'GitHub',
        },
      },
      create: repoData,
      update: repoData,
    });

    await this.prisma.repositoryStatistic.create({
      data: {
        forksCount: repo.forks_count,
        openIssuesCount: repo.open_issues_count,
        size: repo.size,
        stargazersCount: repo.stargazers_count,
        watchersCount: repo.watchers_count,
        Repository: { connect: { id: repoInDb.id } },
      },
    });

    return repoInDb;
  }

  private async calculateTrendIndicator(
    platformId: string,
    currentStargazersCount: number,
    interval: 'yearly' | 'monthly' | 'weekly'
  ) {
    const statistics = await this.prisma.repositoryStatistic.findMany({
      where: {
        Repository: {
          platform: PlatformType.GitHub,
          platformId,
        },
        createdAt: {
          gte: subDays(
            new Date(),
            interval === 'weekly'
              ? 7
              : interval === 'monthly'
              ? 30
              : interval === 'yearly'
              ? 365
              : 1
          ),
          lte: new Date(),
        },
      },
      select: { stargazersCount: true },
      orderBy: { createdAt: 'asc' },
    });

    const respectiveStatStarCount =
      statistics.length > 0
        ? statistics[0].stargazersCount
        : currentStargazersCount;

    return currentStargazersCount - respectiveStatStarCount;
  }
}
