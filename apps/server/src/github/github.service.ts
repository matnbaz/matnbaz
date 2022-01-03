import { slugifyLanguage } from '@matnbaz/common';
import { Injectable, Logger } from '@nestjs/common';
import { OwnerType, PlatformType, Prisma } from '@prisma/client';
import { subDays } from 'date-fns-jalali';
import { PrismaService } from 'nestjs-prisma';
import * as emoji from 'node-emoji';
import { OctokitService } from '../octokit/octokit.service';
import { OwnerReason } from '../owner/constants';

@Injectable()
export class GithubService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService
  ) {}
  private logger = new Logger(GithubService.name);

  async addOwner(username: string) {
    const response = await this.octokit.rest.users.getByUsername({
      username,
      request: { timeout: 10000 },
    });

    this.populateOwner(
      response.data as Awaited<
        ReturnType<OctokitService['rest']['search']['repos']>
      >['data']['items'][0]['owner'],
      OwnerReason.SUBMISSION
    );
  }

  async populateOwner(
    owner: Awaited<
      ReturnType<OctokitService['rest']['search']['repos']>
    >['data']['items'][0]['owner'],
    reason: OwnerReason
  ) {
    try {
      await this.prisma.owner.upsert({
        where: {
          platform_platformId: {
            platformId: owner.id.toString(),
            platform: PlatformType.GitHub,
          },
        },
        create: {
          reason,
          platformId: owner.id.toString(),
          platform: PlatformType.GitHub,
          gravatarId: owner.gravatar_id,
          login: owner.login,
          type: owner.type as OwnerType,
          siteAdmin: owner.site_admin,
        },
        update: {
          reason: OwnerReason.PERSIAN_REPOSITORY,
          platformId: owner.id.toString(),
          platform: PlatformType.GitHub,
          gravatarId: owner.gravatar_id,
          login: owner.login,
          type: owner.type as OwnerType,
          siteAdmin: owner.site_admin,
        },
      });
    } catch (e) {
      this.logger.error(
        `Error while populating ${owner.login} with the ID of ${owner.id}: ${e.message}`
      );
    }
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

    return currentStargazersCount / respectiveStatStarCount;
  }
}
