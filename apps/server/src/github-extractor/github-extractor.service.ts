import { MINIMUM_STARS, slugifyLanguage } from '@matnbaz/common';
import { Injectable, Logger } from '@nestjs/common';
import { PlatformType, Prisma } from '@prisma/client';
import { subDays, subHours } from 'date-fns-jalali';
import { OctokitService } from 'nestjs-octokit';
import { PrismaService } from 'nestjs-prisma';
import * as emoji from 'node-emoji';
import { GithubReadmeExtractorService } from './github-readme-extractor.service';

const EXTRACTION_QUERY = `
query ($id: ID!) {
  node(id: $id) {
    __typename
    ... on User {
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
      followers(first: 0) {
        totalCount
      }
      following(first: 0) {
        totalCount
      }
      databaseId
    }
    ... on Organization {
      databaseId
    }
    ... on RepositoryOwner {
      id
      login
      repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}, ownerAffiliations: OWNER) {
        edges {
          node {
            id
            databaseId
            name
            isArchived
            description
            homepageUrl
            openGraphImageUrl
            stargazerCount
            forkCount
            diskUsage
            isTemplate
            isDisabled
            isFork
            pushedAt
            createdAt
            updatedAt
            repositoryTopics(first: 100) {
              nodes {
                topic {
                  name
                }
              }
            }
            defaultBranchRef {
              name
            }
            issues(first: 0, states: OPEN) {
              totalCount
            }
            watchers(first: 0) {
              totalCount
            }
            primaryLanguage {
              name
              id
              color
            }
            licenseInfo {
              name
              spdxId
              id
              key
            }
          }
        }
      }
    }
  }
}
`;
@Injectable()
export class GithubExtractorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService,
    private readonly readmeExtractor: GithubReadmeExtractorService
  ) {}
  private logger = new Logger(GithubExtractorService.name);

  async fullExtract() {
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
        select: { id: true, login: true, nodeId: true },
        cursor: lastOwnerId && { id: lastOwnerId },
        take: 100,
      })) {
        await this.extract(owner);
        completedCount++;
        lastOwnerId = owner.id;
      }
    }

    clearInterval(interval);
    this.logger.log(
      `finished extraction of ${completedCount}/${ownersCount} owners.`
    );
  }

  private async extract(ownerIdInfo: { nodeId?: string; login: string }) {
    let nodeId = ownerIdInfo.nodeId;

    if (!nodeId) {
      nodeId = await this.getNodeIdFromLogin(ownerIdInfo.login);
    }

    return Promise.race([
      new Promise<void>((resolve) => {
        this.octokit
          .graphql<any>(EXTRACTION_QUERY, {
            id: nodeId,
            request: { timeout: 5000 },
          })
          .then((response) => {
            if (!response.node) {
              this.logger.warn(
                `Owner with login ${ownerIdInfo.login} not found.`
              );
              // TODO: refetch owner based on their platform ID here.
              return resolve();
            }
            const owner = response.node;
            const repos = owner.repositories.edges;

            return this.populateOwner(owner)
              .then((ownerFromDb) => {
                return Promise.all(
                  repos.map(
                    ({ node: repo }) =>
                      new Promise<void>((_resolve) => {
                        // Disqualified (low stars)
                        if (repo.stargazerCount < MINIMUM_STARS)
                          return _resolve();

                        // Disqualified (description too long)
                        if (repo.description && repo.description.length > 512)
                          return _resolve();

                        this.populateRepo(repo, ownerFromDb.id)
                          .then((repoInDb) => {
                            if (repoInDb)
                              this.readmeExtractor
                                .extractReadme(repoInDb.id)
                                .finally(() => _resolve());
                          })
                          .catch((e) => _resolve());
                      })
                  )
                )
                  .then(() => resolve())
                  .catch((e) => resolve());
              })
              .catch((e) => {
                this.logger.error(
                  `Error occurred while extracting populating owner ${ownerIdInfo.login}. ${e.message}`
                );
                resolve();
              });
          })
          .catch((e) => {
            this.logger.error(
              `Error occurred while extracting repos for ${ownerIdInfo.login}. ${e.message}`
            );
            resolve();
          });
      }),
      new Promise<void>((resolve) => {
        // `extracting ${owner.login}'s repos taking too long. skipping...`
        setTimeout(() => resolve(), 20000);
      }),
    ]);
  }

  async populateRepo(repo, ownerId: string) {
    const ownerFromDb = await this.prisma.owner.findUnique({
      where: {
        id: ownerId,
      },
    });

    const repoData: Prisma.XOR<
      Prisma.RepositoryCreateInput,
      Prisma.RepositoryUncheckedCreateInput
    > = {
      latestExtractionAt: new Date(),
      blockedAt: ownerFromDb.blockedAt ? new Date() : undefined,
      platformId: repo.databaseId.toString(),
      platform: 'GitHub',
      archived: repo.isArchived,
      createdAt: repo.createdAt,
      defaultBranch: repo.defaultBranchRef.name,
      description: emoji.emojify(repo.description),
      disabled: repo.isDisabled,
      forksCount: repo.forkCount,
      homePage: repo.homepageUrl,
      openGraphImageUrl: repo.openGraphImageUrl,
      isFork: repo.isFork,
      isTemplate: repo.isTemplate,
      name: repo.name,
      openIssuesCount: repo.issues.totalCount,
      pushedAt: repo.pushedAt,
      size: repo.diskUsage,
      stargazersCount: repo.stargazerCount,
      updatedAt: repo.updatedAt,
      watchersCount: repo.watchers.totalCount,
      weeklyTrendIndicator: await this.calculateOwnerTrendIndicator(
        repo.databaseId.toString(),
        repo.stargazerCount,
        'weekly'
      ),
      monthlyTrendIndicator: await this.calculateOwnerTrendIndicator(
        repo.databaseId.toString(),
        repo.stargazerCount,
        'monthly'
      ),
      yearlyTrendIndicator: await this.calculateOwnerTrendIndicator(
        repo.databaseId.toString(),
        repo.stargazerCount,
        'yearly'
      ),
      Topics: {
        connectOrCreate: repo.repositoryTopics.nodes.map(
          ({ topic: { name } }) => ({
            where: { name },
            create: { name },
          })
        ),
      },
      Language: repo.primaryLanguage
        ? {
            connectOrCreate: {
              where: {
                slug: slugifyLanguage(repo.primaryLanguage.name.toLowerCase()),
              },
              create: {
                slug: slugifyLanguage(repo.primaryLanguage.name.toLowerCase()),
                name: repo.primaryLanguage.name,
              },
            },
          }
        : undefined,
      License: repo.licenseInfo
        ? {
            connectOrCreate: {
              where: {
                key: repo.licenseInfo.key,
              },
              create: {
                key: repo.licenseInfo.key,
                name: repo.licenseInfo.name,
                spdxId: repo.licenseInfo.spdxId,
              },
            },
          }
        : undefined,
      Owner: {
        connect: {
          id: ownerFromDb.id,
        },
      },
    };

    const repoInDb = await this.prisma.repository.upsert({
      where: {
        platform_platformId: {
          platformId: repo.databaseId.toString(),
          platform: 'GitHub',
        },
      },
      create: repoData,
      update: repoData,
    });

    // Saving statistics
    await this.prisma.repositoryStatistic.create({
      data: {
        forksCount: repo.forkCount,
        openIssuesCount: repo.issues.totalCount,
        size: repo.diskUsage,
        stargazersCount: repo.stargazerCount,
        watchersCount: repo.watchers.totalCount,
        Repository: { connect: { id: repoInDb.id } },
      },
    });

    return repoInDb;
  }

  async populateOwner({
    id, // nodeId
    login,
    databaseId,
    contributionsCollection,
    followers,
    __typename,
  }: {
    id: string;
    login: string;
    databaseId: number;
    contributionsCollection?: {
      contributionCalendar: {
        totalContributions: number;
      };
    };
    followers?: { totalCount: number };
    __typename: 'Organization' | 'User';
  }) {
    const owner = await this.prisma.owner.upsert({
      where: {
        platform_platformId: {
          platform: 'GitHub',
          platformId: databaseId.toString(),
        },
      },
      create: {
        nodeId: id,
        login,
        platform: 'GitHub',
        platformId: databaseId.toString(),
        type: __typename,
        latestExtractionAt: new Date(),
      },
      update: {
        nodeId: id,
        login,
        platform: 'GitHub',
        platformId: databaseId.toString(),
        type: __typename,
        latestExtractionAt: new Date(),
      },
    });

    // Saving statistics
    if (__typename === 'User')
      await this.prisma.ownerStatistic.create({
        data: {
          Owner: {
            connect: {
              platform_platformId: {
                platform: 'GitHub',
                platformId: databaseId.toString(),
              },
            },
          },
          contributionsCount:
            contributionsCollection.contributionCalendar.totalContributions,
          followersCount: followers.totalCount,
        },
      });

    return owner;
  }

  private async calculateOwnerTrendIndicator(
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

  private async getNodeIdFromLogin(login: string): Promise<string> {
    const response = await this.octokit.rest.users.getByUsername({
      username: login,
      request: { timeout: 5000 },
    });

    if (typeof response.data?.node_id !== 'string')
      throw Error(`Could not resolve the node id for user ${login}`);

    return response.data.node_id;
  }
}
