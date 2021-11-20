import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '@exonest/graphql-connections';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as P from '@prisma/client';
import * as GithubColors from 'github-colors';
import { PrismaService } from 'nestjs-prisma';
import { RepositoryConnection } from '../models/connections/repository.connection';
import { ScriptDirection } from '../models/enums/script-direction.enum';
import { Language } from '../models/language.model';
import { Owner } from '../models/owner.model';
import { Repository } from '../models/repository.model';
import { Topic } from '../models/topic.model';
import { LanguageArgs } from './args/language.args';
import { RepoOrderArgs } from './args/repo-order.args';
import { RepoSearchArgs } from './args/repo-search.args';

@Resolver(() => Repository)
export class RepositoryResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Repository, { nullable: true })
  repositoryById(@Args('id') id: string) {
    return this.prisma.repository.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => Repository, { nullable: true })
  repositoryGithub(@Args('id') id: number) {
    return this.prisma.repository.findFirst({
      where: {
        platform: 'GitHub',
        platformId: id,
      },
    });
  }

  @Query(() => RepositoryConnection)
  repositories(
    @Args() pagination: PaginationArgs,
    @Args() { language }: LanguageArgs,
    @Args() { searchTerm }: RepoSearchArgs,
    @Args() { order }: RepoOrderArgs
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.repository.findMany({
          where: {
            language,
            name: { in: searchTerm || undefined },
          },
          orderBy: {
            CREATED_ASC: { createdAt: 'asc' as const },
            CREATED_DESC: { createdAt: 'desc' as const },
            PUSHED_ASC: { pushedAt: 'asc' as const },
            PUSHED_DESC: { pushedAt: 'desc' as const },
            STARS_DESC: { stargazersCount: 'desc' as const },
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
      case 'BitBucket':
        throw Error('BitBucket support is not yet implemented');
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
  language(@Parent() { language }: P.Repository) {
    if (!language) return null;
    const languageInfo = GithubColors.get(language);
    return {
      name: language,
      color: languageInfo?.color || null,
    };
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
  limitedDescription(@Parent() { description }: P.Repository) {
    if (!description) return null;

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
}
