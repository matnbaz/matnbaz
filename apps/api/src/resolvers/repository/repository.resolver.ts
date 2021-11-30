import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '@exonest/graphql-connections';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as P from '@prisma/client';
import { marked } from 'marked';
import { PrismaService } from 'nestjs-prisma';
import * as emoji from 'node-emoji';
import { PlatformByIdArgs } from '../../models/args/platform-by-id.args';
import { RepositoryConnection } from '../../models/connections/repository.connection';
import { DateObject } from '../../models/date.model';
import { ScriptDirection } from '../../models/enums/script-direction.enum';
import { Language } from '../../models/language.model';
import { License } from '../../models/license.model';
import { Owner } from '../../models/owner.model';
import { Repository } from '../../models/repository.model';
import { Topic } from '../../models/topic.model';
import { paginationComplexity } from '../../plugins/pagination-complexity';
import { createDateObject } from '../date/utils';
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
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  @Query(() => Repository, { nullable: true })
  repositoryById(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.repository.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => Repository, { nullable: true })
  repositoryByPlatformId(@Args() { id, platform }: PlatformByIdArgs) {
    return this.prisma.repository.findFirst({
      where: {
        platform,
        platformId: id,
      },
    });
  }

  @Query(() => Repository, { nullable: true })
  repositoryByPlatform(@Args() { owner, repo, platform }: PlatformArgs) {
    console.log(owner, repo, platform);
    return this.prisma.repository.findFirst({
      where: {
        platform,
        name: { mode: 'insensitive', equals: repo },
        Owner: { login: { mode: 'insensitive', equals: owner } },
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
      forkStatus: sourceStatus,
      archiveStatus,
      templateStatus,
    }: RepoFilterArgs,
    @Args() { searchTerm }: RepoSearchArgs,
    @Args() { order }: RepoOrderArgs
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.repository.findMany({
          where: {
            isFork: {
              [ForkStatusType.FORK]: true,
              [ForkStatusType.SOURCE]: false,
            }[sourceStatus],
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
                    name: { contains: searchTerm, mode: 'insensitive' },
                  },
                  {
                    Owner: {
                      login: {
                        contains: searchTerm,
                        mode: 'insensitive',
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
          }[order],
          ...args,
        }),
      () => this.prisma.repository.count(),
      pagination
    );
  }

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
        return `https://github.com/${owner.login}/${name}`;
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

  @ResolveField(() => Language, { nullable: true })
  language(@Parent() { languageId }: P.Repository) {
    if (!languageId) return null;
    return this.prisma.language.findUnique({ where: { id: languageId } });
  }

  @ResolveField(() => License, { nullable: true })
  license(@Parent() { licenseId }: P.Repository) {
    if (!licenseId) return null;
    return this.prisma.license.findUnique({ where: { id: licenseId } });
  }

  @ResolveField(() => RepositoryConnection, {
    complexity: paginationComplexity,
  })
  relatedRepos(
    @Parent() { id, name }: P.Repository,
    @Args() pagination: PaginationArgs
  ) {
    // Will *probably* change this in future
    return findManyCursorConnection(
      (args) =>
        this.prisma.repository.findMany({
          where: { name: { contains: name }, id: { not: id } },
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
    // We check if the first 5 characters include any persian words
    if (!description || description.length < 5) return ScriptDirection.LTR;
    return description
      .slice(0, 4)
      .match(/[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F]/g)
      ? ScriptDirection.RTL
      : ScriptDirection.LTR;
  }

  @ResolveField(() => String, { nullable: true })
  readmeHtml(@Parent() { readme }: P.Repository) {
    if (!readme) return readme;
    return marked.parse(emoji.emojify(readme));
  }

  @ResolveField(() => String, { nullable: true })
  descriptionLimited(@Parent() { description }: P.Repository) {
    if (!description) return description;

    const maxLength = 256;

    // return the original description if the length is less than max length
    if (description.length <= maxLength) return description;

    // trim the string to the maximum length
    let trimmedString = description.substr(0, maxLength);

    // re-trim if we are in the middle of a word so it wo-...
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
    );

    return trimmedString.length > 0 ? trimmedString + '...' : null;
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
}
