import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '@exonest/graphql-connections';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as P from '@prisma/client';
import * as GithubColors from 'github-colors';
import { PrismaService } from 'nestjs-prisma';
import { LanguageConnection } from '../models/connections/language.connection';
import { RepositoryConnection } from '../models/connections/repository.connection';
import { Language } from '../models/language.model';
import { LanguageIdArgs } from './args/language-id.args';
import { LanguageOrderArgs } from './args/language-order.args';
import { LanguageSlugArgs } from './args/language-slug.args';
import { LanguageOrder } from './enums/language-order.enum';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => LanguageConnection)
  async languages(
    @Args() pagination: PaginationArgs,
    @Args() { order }: LanguageOrderArgs
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.language.findMany({
          orderBy: {
            [LanguageOrder.REPOSITORIES_DESC]: {
              Repositories: { _count: 'desc' as const },
            },
          }[order],
          ...args,
        }),
      () => this.prisma.language.count(),
      pagination
    );
  }

  @Query(() => Language, { nullable: true })
  async language(@Args() { slug }: LanguageSlugArgs) {
    return this.prisma.language.findUnique({ where: { slug } });
  }

  async languageById(@Args() { id }: LanguageIdArgs) {
    return this.prisma.language.findUnique({ where: { id } });
  }

  @ResolveField(() => String, { nullable: true })
  color(@Parent() { name }: P.Language) {
    return GithubColors.get(name)?.color;
  }

  @ResolveField(() => RepositoryConnection)
  async repositories(
    @Parent() { id }: P.Language,
    @Args() pagination: PaginationArgs
  ) {
    const languagePromise = this.prisma.language.findUnique({ where: { id } });

    return findManyCursorConnection(
      (args) => languagePromise.Repositories(args),
      async () =>
        (await languagePromise.Repositories({ select: { id: true } })).length,
      pagination
    );
  }

  @ResolveField(() => Int)
  async repositoriesCount(@Parent() { id }: P.Language) {
    return (
      await this.prisma.language
        .findUnique({ where: { id } })
        .Repositories({ select: { id: true } })
    ).length;
  }
}
