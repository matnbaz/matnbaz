import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Owner, Prisma } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';
import { timeout } from '../utils/timeout';
import { GITHUB_QUEUE, MINIMUM_STARS } from './constants';
import { IRepositoryItem } from './interfaces/repository-search-response';

@Processor(GITHUB_QUEUE)
export class ExtractionProcessor {
  constructor(private readonly prisma: PrismaService) {}
  logger = new Logger('ExtractionProcessor-GitHub');

  @Process('extract')
  async extractReposFromOwners() {
    this.logger.log('Starting the extraction of repositories...');

    const owners = await this.prisma.owner.findMany({
      where: {
        platform: 'GitHub',
      },
    });

    this.logger.log(`${owners.length} owners found.`);

    for (const owner of owners) {
      this.logger.log(`Now extracting ${owner.login}'s repositories...'`);
      await this.extractReposFromOwner(owner);
    }
  }

  private async extractReposFromOwner(owner: Owner) {
    try {
      const response = await axios.get<unknown, { data: IRepositoryItem[] }>(
        `https://api.github.com/users/${owner.login}/repos`,
        {
          params: {
            per_page: 100,
            sort: 'stars',
          },
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      );

      const repos = response.data;

      for (const { owner, topics, license, ...repo } of repos) {
        if (repo.stargazers_count < MINIMUM_STARS) {
          this.logger.warn(
            `repo ${repo.full_name} with ${repo.stargazers_count} stars disqualified.`
          );
          break;
        }

        const repoData: Prisma.XOR<
          Prisma.RepositoryCreateInput,
          Prisma.RepositoryUncheckedCreateInput
        > = {
          platformId: repo.id,
          platform: 'GitHub',
          allowForking: repo.allow_forking,
          archived: repo.archived,
          createdAt: repo.created_at,
          defaultBranch: repo.default_branch,
          description: repo.description,
          disabled: repo.disabled,
          forksCount: repo.forks_count,
          hasIssues: repo.has_issues,
          hasPages: repo.has_pages,
          hasProjects: repo.has_projects,
          hasWiki: repo.has_wiki,
          homePage: repo.homepage,
          isFork: repo.fork,
          isTemplate: repo.is_template,
          language: repo.language,
          name: repo.name,
          nodeId: repo.node_id,
          openIssuesCount: repo.open_issues_count,
          pushedAt: repo.pushed_at,
          score: repo.score,
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
          License: license
            ? {
                connectOrCreate: {
                  where: {
                    key: license.key,
                  },
                  create: {
                    key: license.key,
                    name: license.name,
                    nodeId: license.node_id,
                    spdxId: license.spdx_id,
                  },
                },
              }
            : undefined,
          Owner: {
            connect: {
              platform_platformId: { platform: 'GitHub', platformId: owner.id },
            },
          },
        };

        await this.prisma.repository.upsert({
          where: {
            platform_platformId: { platformId: repo.id, platform: 'GitHub' },
          },
          create: repoData,
          update: repoData,
        });

        this.logger.log(
          `Extracted/updated (probably) Iranian repository: ${repo.full_name}`
        );
      }
    } catch (e) {
      if (
        e.response?.status === 403 &&
        e.response?.data.message.includes('rate limit')
      ) {
        this.logger.warn('Rate limited. will wait for a bit and try again...');
        await timeout(10000);
        await this.extractReposFromOwner(owner);
      } else {
        console.log(e);
        this.logger.warn(`Extraction failed for ${owner.login}`);
      }
    }
  }
}
