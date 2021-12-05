import { slugifyLanguage } from '@iranfoss/common';
import { Injectable, Logger } from '@nestjs/common';
import { Owner, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OctokitService } from '../octokit/octokit.service';
import { MINIMUM_STARS } from './constants';
import * as emoji from 'node-emoji';
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
      where: { platform: 'GitHub' },
    });

    this.logger.log(`${owners.length} owners found.`);
    for (const owner of owners) await this.extractRepos(owner);
  }

  private async extractRepos(owner: Owner) {
    this.logger.log(`Now extracting ${owner.login}'s repositories...'`);
    const response = await this.octokit.rest.repos.listForUser({
      per_page: 100,
      username: owner.login,
    });

    const repos = response.data;

    for (const repo of repos) {
      const repoInDb = await this.populateRepo(repo);
      if (repoInDb) await this.readmeExtractor.extractReadme(repoInDb.id);
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
      this.logger.warn(
        `repo ${repo.full_name} with ${repo.stargazers_count} stars was disqualified due to low stars.`
      );
      return;
    }
    if (repo.description && repo.description.length > 256) {
      this.logger.warn(
        `repo ${repo.full_name} with ${repo.stargazers_count} stars was disqualified due to long description.`
      );
      return;
    }

    const blockedRepo = await this.prisma.blockedRepository.findUnique({
      where: {
        platform_platformId: {
          platform: 'GitHub',
          platformId: repo.id.toString(),
        },
      },
    });

    if (blockedRepo) {
      this.prisma.repository.delete({
        where: {
          platform_platformId: {
            platform: 'GitHub',
            platformId: repo.id.toString(),
          },
        },
      });
      this.logger.log(
        `Repository, "${repo.name}" with ID of ${repo.id} was not added because it is blocked.`
      );
      return;
    }

    const blockedOwner = await this.prisma.blockedOwner.findUnique({
      where: {
        platform_platformId: {
          platform: 'GitHub',
          platformId: owner.id.toString(),
        },
      },
    });

    if (blockedOwner) {
      this.prisma.repository.delete({
        where: {
          platform_platformId: {
            platform: 'GitHub',
            platformId: repo.id.toString(),
          },
        },
      });

      this.prisma.owner.delete({
        where: {
          platform_platformId: {
            platform: 'GitHub',
            platformId: owner.id.toString(),
          },
        },
      });
      this.logger.log(
        `Repository, "${repo.name}" with ID of ${repo.id} was not added because the owner is blocked.`
      );
      return;
    }

    const repoData: Prisma.XOR<
      Prisma.RepositoryCreateInput,
      Prisma.RepositoryUncheckedCreateInput
    > = {
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

    this.logger.log(
      `repo ${repo.full_name} with ${repo.stargazers_count} stars was qualified and populated.`
    );

    return repoInDb;
  }
}
