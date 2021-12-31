import { slugifyLanguage } from '@matnbaz/common';
import { Injectable, Logger } from '@nestjs/common';
import { Owner, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import * as emoji from 'node-emoji';
import { OctokitService } from '../octokit/octokit.service';
import { MINIMUM_STARS } from './constants';
import { GithubReadmeExtractorService } from './github-readme-extractor.service';
@Injectable()
export class GithubExtractorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService,
    private readonly readmeExtractor: GithubReadmeExtractorService
  ) {}
  private logger = new Logger(GithubExtractorService.name);

  async extractAllOwners() {
    const owners = await this.prisma.owner.findMany({
      where: { platform: 'GitHub', blockedAt: null },
    });

    this.logger.log(`${owners.length} owners found. Extracting now...`);
    let i = 0;
    setInterval(
      () =>
        owners[i] &&
        this.logger.log(
          `${i}/${owners.length} (~${
            Math.floor((i / owners.length) * 10000) / 100
          }%) current target: ${owners[i].login}`
        ),
      60000
    );
    for (const owner of owners) {
      i++;
      await this.extractRepos(owner);
    }
  }

  private async extractRepos(owner: Owner) {
    try {
      const response = await this.octokit.rest.repos.listForUser({
        per_page: 100,
        username: owner.login,
      });

      const repos = response.data;

      for (const repo of repos) {
        const repoInDb = await this.populateRepo(repo);
        if (repoInDb) await this.readmeExtractor.extractReadme(repoInDb.id);
      }
    } catch (e) {
      this.logger.error(
        `Error occured while extracting repos for ${owner.login}. ${e.message}`
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
    if (repo.stargazers_count < MINIMUM_STARS) {
      // Disqualified
      return;
    }
    if (repo.description && repo.description.length > 512) {
      // Disqualified (description too long)
      return;
    }

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

    return repoInDb;
  }
}
