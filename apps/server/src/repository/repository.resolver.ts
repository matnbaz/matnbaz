import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CacheControl } from '@exonest/graphql-cache-control';
import { PaginationArgs } from '@exonest/graphql-connections';
import { guessDirection, limitWords, MINIMUM_STARS } from '@matnbaz/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { createDateObject } from '../date/utils';
import { MarkdownService } from '../markdown/markdown.service';
import { PlatformByIdArgs } from '../models/args/platform-by-id.args';
import { RepositoryConnection } from '../models/connections/repository.connection';
import { DateObject } from '../models/date.model';
import { ScriptDirection } from '../models/enums/script-direction.enum';
import { Language } from '../models/language.model';
import { License } from '../models/license.model';
import { Owner } from '../models/owner.model';
import { RepositoryLanguage } from '../models/repository-language.model';
import { Repository } from '../models/repository.model';
import { Topic } from '../models/topic.model';
import { paginationComplexity } from '../plugins/pagination-complexity';
import { ReportableResolver } from '../report/reportable.resolver';
import { PlatformArgs } from './args/platform.args';
import { RepoFilterArgs } from './args/repo-filter.args';
import { RepoOrderArgs } from './args/repo-order.args';
import { RepoSearchArgs } from './args/repo-search.args';
import { ArchiveStatusType } from './enums/archive-status-type.enum';
import { ForkStatusType } from './enums/fork-status-type.enum';
import { RepoOrder } from './enums/repos-order.enum';
import { TemplateStatusType } from './enums/template-status-type.enum';

@Resolver(() => Repository)
export class RepositoryResolver extends ReportableResolver(Repository) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly markdownService: MarkdownService
  ) {
    super();
  }

  @CacheControl({ maxAge: 180 })
  @Query(() => Repository, { nullable: true })
  repositoryById(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.repository.findUnique({
      where: {
        id,
      },
    });
  }

  @CacheControl({ maxAge: 180 })
  @Query(() => Repository, { nullable: true })
  repositoryByPlatformId(@Args() { id, platform }: PlatformByIdArgs) {
    return this.prisma.repository.findFirst({
      where: {
        blockedAt: null,
        stargazersCount: { gte: MINIMUM_STARS },
        platform,
        platformId: id,
      },
    });
  }

  @CacheControl({ maxAge: 180 })
  @Query(() => Repository, { nullable: true })
  repositoryByPlatform(@Args() { owner, repo, platform }: PlatformArgs) {
    return this.prisma.repository.findFirst({
      where: {
        blockedAt: null,
        platform,
        name: { mode: P.Prisma.QueryMode.insensitive, equals: repo },
        Owner: {
          login: { mode: P.Prisma.QueryMode.insensitive, equals: owner },
        },
      },
    });
  }

  @Query(() => RepositoryConnection, { complexity: paginationComplexity })
  repositories(
    @Args() pagination: PaginationArgs,
    @Args()
    {
      languages,
      licenses,
      forkStatus,
      archiveStatus,
      templateStatus,
    }: RepoFilterArgs,
    @Args() { searchTerm }: RepoSearchArgs,
    @Args() { order }: RepoOrderArgs
  ) {
    order = order || RepoOrder.TRENDING_WEEKLY;

    return findManyCursorConnection(
      (args) =>
        this.prisma.repository.findMany({
          where: {
            blockedAt: null,
            stargazersCount: { gte: MINIMUM_STARS },
            isFork: {
              [ForkStatusType.FORK]: true,
              [ForkStatusType.SOURCE]: false,
            }[forkStatus],
            archived: {
              [ArchiveStatusType.ARCHIVED]: true,
              [ArchiveStatusType.NOT_ARCHIVED]: false,
            }[archiveStatus],
            isTemplate: {
              [TemplateStatusType.TEMPLATE]: true,
              [TemplateStatusType.NOT_TEMPLATE]: false,
            }[templateStatus],
            Language:
              languages && languages.length > 0
                ? {
                    OR: languages.map((language) => ({
                      slug: language.toLowerCase(),
                    })),
                  }
                : undefined,
            License:
              licenses && licenses.length > 0
                ? {
                    OR: licenses.map((license) => ({
                      key: license.toLowerCase(),
                    })),
                  }
                : undefined,
            OR: searchTerm
              ? [
                  {
                    name: {
                      contains: searchTerm,
                      mode: P.Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    Owner: {
                      login: {
                        contains: searchTerm,
                        mode: P.Prisma.QueryMode.insensitive,
                      },
                    },
                  },
                ]
              : undefined,
          },
          orderBy: {
            [RepoOrder.CREATED_ASC]: { createdAt: 'asc' as const },
            [RepoOrder.CREATED_DESC]: { createdAt: 'desc' as const },
            [RepoOrder.PUSHED_ASC]: { pushedAt: 'asc' as const },
            [RepoOrder.PUSHED_DESC]: { pushedAt: 'desc' as const },
            [RepoOrder.STARS_DESC]: { stargazersCount: 'desc' as const },
            [RepoOrder.TRENDING_WEEKLY]: {
              weeklyTrendIndicator: 'desc' as const,
            },
            [RepoOrder.TRENDING_MONTHLY]: {
              monthlyTrendIndicator: 'desc' as const,
            },
            [RepoOrder.TRENDING_YEARLY]: {
              yearlyTrendIndicator: 'desc' as const,
            },
          }[order],
          ...args,
        }),
      () => this.prisma.repository.count(),
      pagination
    );
  }

  @CacheControl({ inheritMaxAge: true })
  @ResolveField(() => Owner, { nullable: true })
  owner(@Parent() { id }: P.Repository) {
    return this.prisma.repository
      .findUnique({
        where: { id },
        select: { id: true },
      })
      .Owner();
  }

  @ResolveField(() => String)
  async fullName(@Parent() { id, name }: P.Repository) {
    const owner = await this.prisma.repository
      .findUnique({
        where: { id },
        select: { id: true },
      })
      .Owner();

    return `${owner.login}/${name}`;
  }

  @ResolveField(() => String, { nullable: true })
  async platformUrl(@Parent() { id, name, platform }: P.Repository) {
    const owner = await this.prisma.repository
      .findUnique({
        where: { id },
        select: { id: true },
      })
      .Owner();

    switch (platform) {
      case 'GitHub':
        return `https://github.com/${owner.login}/${name}/`;
      case 'GitLab':
        throw Error('GitLab support is not yet implemented');
      case 'Bitbucket':
        throw Error('Bitbucket support is not yet implemented');
      default:
        return null;
    }
  }

  @ResolveField(() => [Topic])
  topics(@Parent() { id }: P.Repository) {
    return this.prisma.repository
      .findUnique({
        where: { id },
        select: { id: true },
      })
      .Topics();
  }

  @CacheControl({ inheritMaxAge: true })
  @ResolveField(() => Language, {
    nullable: true,
    deprecationReason: 'use `primaryLanguage` instead.',
  })
  language(@Parent() { languageId }: P.Repository) {
    if (!languageId) return null;
    return this.prisma.language.findUnique({ where: { id: languageId } });
  }

  @CacheControl({ inheritMaxAge: true })
  @ResolveField(() => Language, { nullable: true })
  primaryLanguage(@Parent() { languageId }: P.Repository) {
    if (!languageId) return null;
    return this.prisma.language.findUnique({ where: { id: languageId } });
  }

  @ResolveField(() => [RepositoryLanguage], {
    description: `Repository's most used languages sorted by usage`,
  })
  async languages(
    @Parent() { id }: P.Repository
  ): Promise<RepositoryLanguage[]> {
    const repoLanguages = await this.prisma.repository
      .findUnique({ where: { id } })
      .Languages({ include: { Language: true } });

    const sumSize = repoLanguages.reduce(
      (previous, current) => previous + current.size,
      0
    );
    return repoLanguages.map(({ Language: language, size }) => ({
      percentage: (size / sumSize) * 100,
      size,
      language,
    }));
  }

  @CacheControl({ inheritMaxAge: true })
  @ResolveField(() => License, { nullable: true })
  license(@Parent() { licenseId }: P.Repository) {
    if (!licenseId) return null;
    return this.prisma.license.findUnique({ where: { id: licenseId } });
  }

  @CacheControl({ inheritMaxAge: true })
  @ResolveField(() => RepositoryConnection, {
    complexity: paginationComplexity,
  })
  async relatedRepos(
    @Parent() repo: P.Repository,
    @Args() pagination: PaginationArgs
  ) {
    const { id, name } = repo;
    const topics = await this.prisma.repository
      .findUnique({ where: { id } })
      .Topics();
    const owner = await this.owner(repo);

    return findManyCursorConnection(
      (args) =>
        this.prisma.repository.findMany({
          orderBy: { pushedAt: 'desc' },
          where: {
            blockedAt: null,
            stargazersCount: { gte: MINIMUM_STARS },
            id: { not: id },
            OR: [
              {
                Topics: {
                  some: { name: { in: topics.map(({ name }) => name) } },
                },
              },
              { name: { contains: name.split('-')[0] } },
              { Owner: { id: owner.id } },
            ],
          },
          ...args,
        }),
      () =>
        this.prisma.repository.count({
          where: { name: { contains: name }, id: { not: id } },
        }),
      pagination
    );
  }

  @ResolveField(() => ScriptDirection)
  descriptionDirection(
    @Parent() { description }: P.Repository
  ): ScriptDirection {
    if (!description || description.length < 5) return ScriptDirection.LTR;
    return guessDirection(description.slice(0, 4)) as ScriptDirection;
  }

  @ResolveField(() => String, { nullable: true })
  descriptionLimited(@Parent() { description }: P.Repository) {
    return description ? limitWords(description, 256) : null;
  }

  @ResolveField(() => String, { nullable: true })
  async readmeHtml(@Parent() repo: P.Repository) {
    const { readme, readmeHtml, defaultBranch, name } = repo;
    if (!readme) return null;
    if (readmeHtml) return readmeHtml;

    const [owner] = (await this.fullName(repo)).split('/');
    // Backward Compatibility
    return this.markdownService.parseForGithub(
      readme,
      owner,
      name,
      defaultBranch
    );
  }

  @ResolveField(() => DateObject)
  createdAt(@Parent() { createdAt }: P.Repository) {
    return createDateObject(createdAt);
  }

  @ResolveField(() => DateObject)
  pushedAt(@Parent() { pushedAt }: P.Repository) {
    return createDateObject(pushedAt);
  }

  @ResolveField(() => DateObject)
  updatedAt(@Parent() { updatedAt }: P.Repository) {
    return createDateObject(updatedAt);
  }

  @ResolveField(() => Boolean)
  isNew(@Parent() { createdAt }: P.Repository) {
    return +createdAt > +new Date() - 432000000; // 5 Days
  }
}
