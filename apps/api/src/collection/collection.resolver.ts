import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CacheControl } from '../utils/cache-control.decorator';
import { PaginationArgs } from '../utils/pagination';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { createColorObject } from '../color/utils';
import { LocaleArgs } from '../models/args/locale.args';
import { Collection } from '../models/collection.model';
import { Color } from '../models/color.model';
import { CollectConnection } from '../models/connections/collect.connection';
import { CollectionConnection } from '../models/connections/collection.connection';
import { paginationComplexity } from '../plugins/pagination-complexity';
import { CollectionIdArgs } from './args/collection-id.args';
import { CollectionSlugArgs } from './args/collection-slug.args';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(private readonly prisma: PrismaService) {}

  @CacheControl({ maxAge: 60 })
  @Query(() => CollectionConnection)
  collections(@Args() pagination: PaginationArgs) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.collection.findMany({
          orderBy: { Collects: { _count: 'desc' } },
          ...args,
        }),
      () => this.prisma.collection.count(),
      pagination
    );
  }

  @Query(() => Collection, { nullable: true })
  collection(@Args() { slug }: CollectionSlugArgs) {
    return this.prisma.collection.findUnique({ where: { slug } });
  }

  @Query(() => Collection, { nullable: true })
  collectionById(@Args() { id }: CollectionIdArgs) {
    return this.prisma.collection.findUnique({ where: { id } });
  }

  @ResolveField(() => String, { nullable: true })
  async description(
    @Args() { locale }: LocaleArgs,
    @Parent() { id }: P.Collection
  ) {
    const description = await this.prisma.collection
      .findUnique({ where: { id } })
      .Description();
    return description[locale.toLowerCase() || 'fa'];
  }

  @CacheControl({ inheritMaxAge: true })
  @ResolveField(() => CollectConnection, {
    complexity: paginationComplexity,
  })
  collects(@Args() pagination: PaginationArgs, @Parent() { id }: P.Collection) {
    const collectionQuery = this.prisma.collection.findUnique({
      where: { id },
      select: { id: true },
    });

    return findManyCursorConnection(
      async (args) =>
        collectionQuery.Collects({
          orderBy: { Repository: { stargazersCount: 'desc' } },
          ...args,
        }),
      async () =>
        (await collectionQuery.Collects({ select: { id: true } })).length,
      pagination
    );
  }

  @CacheControl({ inheritMaxAge: true })
  @ResolveField(() => Int)
  async repositoriesCount(@Parent() { id }: P.Collection) {
    return (
      await this.prisma.collection
        .findUnique({ where: { id } })
        .Collects({ select: { id: true } })
    ).length;
  }

  @ResolveField(() => Color, { nullable: true })
  color(@Parent() { color }: P.Collection) {
    return color ? createColorObject(color) : null;
  }
}
