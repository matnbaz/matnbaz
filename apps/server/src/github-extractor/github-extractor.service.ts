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
        restrictedContributionsCount
      }
      followers(first: 0) {
        totalCount
      }
      following(first: 0) {
        totalCount
      }
      repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
        totalCount
      }
      pullRequests(first: 1) {
        totalCount
      }
      openIssues: issues(states: OPEN) {
        totalCount
      }
      closedIssues: issues(states: CLOSED) {
        totalCount
      }
      databaseId
      name
      twitterUsername
      websiteUrl
      company
      location
      bio
    }
    ... on Organization {
      databaseId
      name
      twitterUsername
      websiteUrl
      description
      membersWithRole(first: 100) {
        edges {
          node {
            databaseId
          }
        }
      }
    }
    ... on RepositoryOwner {
      id
      login
      repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}, ownerAffiliations: OWNER) {
        totalCount
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
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                  id
                  color
                }
              }
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

  async fullExtract(forceAll = false) {
    let lastOwnerId;
    const ownersCount = await this.prisma.owner.count({
      where: {
        platform: 'GitHub',
        blockedAt: null,
        OR: !forceAll
          ? [
              {
                latestExtractionAt: { lt: subHours(new Date(), 12) },
              },
              {
                latestExtractionAt: null,
              },
            ]
          : undefined,
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
          OR: !forceAll
            ? [
                {
                  latestExtractionAt: { lt: subHours(new Date(), 12) },
                },
                {
                  latestExtractionAt: null,
                },
              ]
            : undefined,
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
            request: { timeout: 20000 },
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
                  .then(() =>
                    this.updateOwnerLanguages(owner.id)
                      .then(() => resolve())
                      .catch(() => resolve())
                  )
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

    // Language data
    await this.prisma.repositoryLanguage.deleteMany({
      where: { Repository: { Owner: { id: repoInDb.id } } },
    });

    for (const { size, node } of repo.languages.edges) {
      await this.prisma.repositoryLanguage.create({
        data: {
          size: size,
          Repository: { connect: { id: repoInDb.id } },
          Language: {
            connectOrCreate: {
              where: { slug: slugifyLanguage(node.name) },
              create: { slug: slugifyLanguage(node.name), name: node.name },
            },
          },
        },
      });
    }

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

  async populateOwner(ownerFromGql: OwnerToPopulate) {
    const {
      id, // nodeId
      name,
      login,
      databaseId,
      contributionsCollection,
      closedIssues,
      openIssues,
      pullRequests,
      repositories,
      repositoriesContributedTo,
      followers,
      twitterUsername,
      websiteUrl,
      company,
      location,
      __typename,
    } = ownerFromGql;
    const repositoriesCount = repositories?.totalCount;
    const repositoriesContributedToCount =
      repositoriesContributedTo?.totalCount;

    let closedIssuesCount = null;
    let openIssuesCount = null;
    let pullRequestsCount = null;
    let totalStarsCount = null;
    let followersCount = null;
    let contributionsCount = null;
    let publicContributionsCount = null;
    let about = null;
    if (__typename === 'User') {
      about = ownerFromGql.bio;
      closedIssuesCount = closedIssues?.totalCount;
      openIssuesCount = openIssues?.totalCount;
      pullRequestsCount = pullRequests?.totalCount;
      totalStarsCount = repositories?.edges.reduce(
        (prev, repo) => prev + repo.node.stargazerCount,
        0
      );
      followersCount = followers?.totalCount;
      contributionsCount =
        contributionsCollection?.contributionCalendar?.totalContributions;
      publicContributionsCount =
        contributionsCount -
        contributionsCollection.restrictedContributionsCount;
    } else if (__typename === 'Organization') {
      about = ownerFromGql.description;
    }

    const data: Parameters<PrismaService['owner']['upsert']>['0']['create'] = {
      nodeId: id,
      name,
      login,
      platform: 'GitHub',
      platformId: databaseId.toString(),
      twitterUsername,
      company,
      location,
      websiteUrl,
      type: __typename,
      latestExtractionAt: new Date(),
      contributionsCount,
      publicContributionsCount,
      followersCount,
      closedIssuesCount,
      openIssuesCount,
      pullRequestsCount,
      repositoriesContributedToCount,
      repositoriesCount,
      totalStarsCount,
      about,
    };

    const owner = await this.prisma.owner.upsert({
      where: {
        platform_platformId: {
          platform: 'GitHub',
          platformId: databaseId.toString(),
        },
      },
      create: data,
      update: data,
    });

    if (__typename === 'User') {
      // Saving statistics
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
          contributionsCount,
          publicContributionsCount,
          followersCount,
          closedIssuesCount,
          openIssuesCount,
          pullRequestsCount,
          repositoriesContributedToCount,
          repositoriesCount,
          totalStarsCount,
        },
      });
    }

    if (__typename === 'Organization') {
      await this.prisma.organizationMembership.deleteMany({
        where: { Organization: { id: owner.id } },
      });

      for (const member of ownerFromGql.membersWithRole.edges) {
        const memberFromDb = await this.prisma.owner.findUnique({
          where: {
            platform_platformId: {
              platform: 'GitHub',
              platformId: member.node.databaseId.toString(),
            },
          },
        });
        if (memberFromDb) {
          await this.prisma.organizationMembership.create({
            data: {
              Organization: {
                connect: { id: owner.id },
              },
              Member: {
                connect: {
                  platform_platformId: {
                    platform: 'GitHub',
                    platformId: member.node.databaseId.toString(),
                  },
                },
              },
            },
          });
        }
      }
    }

    return owner;
  }

  async updateOwnerLanguages(ownerId: string) {
    // Language data
    await this.prisma.ownerLanguage.deleteMany({
      where: { Owner: { id: ownerId } },
    });

    const repos = await this.prisma.repository.findMany({
      where: { Owner: { id: ownerId }, isFork: false },
      select: { name: true, Languages: { include: { Language: true } } },
    });

    const languages: Record<string, { name: string; size: number }> = {};

    for (const repo of repos) {
      for (const lang of repo.Languages) {
        if (typeof languages[lang.Language.slug] === 'undefined') {
          languages[lang.Language.slug] = {
            size: 0,
            name: lang.Language.name,
          };
          languages[lang.Language.slug].size += lang.size;
        }
      }
    }

    for (const langSlug of Object.keys(languages)) {
      await this.prisma.ownerLanguage.create({
        data: {
          Owner: { connect: { id: ownerId } },
          size: languages[langSlug].size,
          Language: {
            connectOrCreate: {
              where: { slug: langSlug },
              create: {
                slug: slugifyLanguage(langSlug),
                name: languages[langSlug].name,
              },
            },
          },
        },
      });
    }
  }

  private async calculateOwnerTrendIndicator(
    platformId: string,
    currentStarCount: number,
    interval: 'yearly' | 'monthly' | 'weekly'
  ) {
    // Get oldest statistic in the time scope
    const statistic = await this.prisma.repositoryStatistic.findFirst({
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

    const oldStarCount = statistic
      ? statistic.stargazersCount
      : currentStarCount;

    const MIN_STARS_THRESHOLD = 20;

    const increase =
      Math.max(currentStarCount, MIN_STARS_THRESHOLD) -
      Math.max(oldStarCount, MIN_STARS_THRESHOLD);

    const indicator =
      (increase / Math.max(oldStarCount, MIN_STARS_THRESHOLD)) * 100;

    return Math.floor(indicator * 1000) / 1000;
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

  async updateOwnerRanks() {
    const byTotalStarsRank = await this.prisma.owner.findMany({
      orderBy: { totalStarsCount: 'desc' },
      select: { id: true, login: true },
    });

    const byContributionsRank = await this.prisma.owner.findMany({
      orderBy: { contributionsCount: 'desc' },
      select: { id: true, login: true },
    });

    const byPublicContributionsRank = await this.prisma.owner.findMany({
      orderBy: { publicContributionsCount: 'desc' },
      select: { id: true, login: true },
    });

    const byRepositoriesContributedToRank = await this.prisma.owner.findMany({
      orderBy: { repositoriesContributedToCount: 'desc' },
      select: { id: true, login: true },
    });

    for (const { id } of byTotalStarsRank) {
      const totalStarsRank =
        byTotalStarsRank.findIndex((owner) => owner.id === id) + 1;
      const contributionsRank =
        byContributionsRank.findIndex((owner) => owner.id === id) + 1;
      const publicContributionsRank =
        byPublicContributionsRank.findIndex((owner) => owner.id === id) + 1;
      const repositoriesContributedToRank =
        byRepositoriesContributedToRank.findIndex((owner) => owner.id === id) +
        1;

      await this.prisma.owner.update({
        where: { id },
        data: {
          totalStarsRank,
          contributionsRank,
          publicContributionsRank,
          repositoriesContributedToRank,
        },
      });
    }
  }
}

interface OwnerToPopulate {
  /**
   * nodeId
   */
  id: string;
  name?: string;
  login: string;
  databaseId: number;
  contributionsCollection?: {
    contributionCalendar: {
      totalContributions: number;
    };
    restrictedContributionsCount: number;
  };
  repositoriesContributedTo?: {
    totalCount: number;
  };
  pullRequests: {
    totalCount: number;
  };
  openIssues: {
    totalCount: number;
  };
  closedIssues: {
    totalCount: number;
  };
  repositories: {
    totalCount: number;
    edges: {
      node: {
        stargazerCount: number;
      };
    }[];
  };
  twitterUsername?: string;
  websiteUrl?: string;
  company?: string;
  location?: string;
  followers?: { totalCount: number };
  bio?: string;
  description?: string;
  membersWithRole: { edges: { node: { databaseId: number } }[] };
  __typename: 'Organization' | 'User';
}
