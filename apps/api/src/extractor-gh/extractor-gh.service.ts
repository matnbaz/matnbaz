import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';
import {
  IRepositoryItem,
  IRepositorySearchResponse,
} from './interfaces/repository-search-response';

const REPOSITORIES_SEARCH_URL = 'https://api.github.com/search/repositories';
@Injectable()
export class ExtractorGhService {
  constructor(private readonly prisma: PrismaService) {}

  async extractByRepoSearch() {
    let page = 1;
    const repos: IRepositoryItem[] = [];

    for (let finished = false; !finished; ) {
      const response = await axios.get<
        unknown,
        { data: IRepositorySearchResponse }
      >(REPOSITORIES_SEARCH_URL, {
        params: {
          q: 'iran-bank',
          per_page: 100,
          page,
        },
      });

      repos.push(...response.data.items);

      page++;
      if (repos.length >= response.data.total_count) {
        finished = true;
      }
    }

    for (const { topics, owner, license, ...repo } of repos) {
      const ownerInDb = await this.prisma.owner.upsert({
        where: {
          platform_platformId: { platformId: owner.id, platform: 'GitHub' },
        },
        create: {
          platformId: owner.id,
          platform: 'GitHub',
          gravatarId: owner.gravatar_id,
          login: owner.login,
          type: owner.type,
          nodeId: owner.node_id,
          siteAdmin: owner.site_admin,
        },
        update: {
          platformId: owner.id,
          platform: 'GitHub',
          gravatarId: owner.gravatar_id,
          login: owner.login,
          type: owner.type,
          nodeId: owner.node_id,
          siteAdmin: owner.site_admin,
        },
      });

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
        stargazerscount: repo.stargazers_count,
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

      const repositoryInDb = await this.prisma.repository.upsert({
        where: {
          platform_platformId: { platformId: repo.id, platform: 'GitHub' },
        },
        create: repoData,
        update: repoData,
      });
    }
  }

  async extractByOwner() {
    throw Error('Not implemented yet.');
  }
}
