import { Prisma, Owner } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';
import {
  IRepositoryItem,
  IPaginatedRepositories,
} from './interfaces/repository-search-response';
import { timeout } from '../utils/timeout';

const MINIMUM_STARS = 3;
@Injectable()
export class OperatorGhService {
  constructor(private readonly prisma: PrismaService) {}

  async discoverOwners(term: string) {
    let page = 1;
    const repos: IRepositoryItem[] = [];

    let finished = false;
    while (!finished) {
      try {
        const response = await axios.get<
          unknown,
          { data: IPaginatedRepositories }
        >('https://api.github.com/search/repositories', {
          params: {
            q: term,
            per_page: 100,
            page,
            sort: 'stars',
          },
        });

        page++;

        if (
          repos.length >= response.data.total_count || // Last page
          repos.length >= 1000 || // GitHub's limitation
          repos[repos.length].stargazers_count < MINIMUM_STARS // Low-star repos
        ) {
          finished = true;
        }
      } catch (e) {
        // Rate limited. will wait for a bit and try again...
        await timeout(10000);
      }
    }

    for (const { owner, stargazers_count } of repos) {
      if (stargazers_count < MINIMUM_STARS) break;

      await this.prisma.owner.upsert({
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
      // Discovered (probably) Iranian maintainer: ${owner.login}
    }
  }

  async extractReposFromOwners() {
    const owners = await this.prisma.owner.findMany({
      where: {
        platform: 'GitHub',
      },
    });

    for (const owner of owners) {
      await this.extractReposFromOwner(owner);
    }
  }

  private async extractReposFromOwner(owner: Owner) {
    const response = await axios.get<unknown, { data: IPaginatedRepositories }>(
      `https://api.github.com/users/${owner.platformId}/repositories`,
      {
        params: {
          per_page: 100,
          sort: 'stars',
        },
      }
    );

    const repos = response.data.items;

    for (const { owner, topics, license, ...repo } of repos) {
      if (repo.stargazers_count < MINIMUM_STARS) break;

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

      await this.prisma.repository.upsert({
        where: {
          platform_platformId: { platformId: repo.id, platform: 'GitHub' },
        },
        create: repoData,
        update: repoData,
      });

      // Extracted/updated (probably) Iranian repository: ${repo.full_name}
    }
  }
}
