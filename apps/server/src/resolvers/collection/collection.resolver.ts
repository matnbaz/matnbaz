import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CacheControl } from '@exonest/graphql-cache-control';
import { PaginationArgs } from '@exonest/graphql-connections';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Collection } from '../../models/collection.model';
import { Color } from '../../models/color.model';
import { CollectionConnection } from '../../models/connections/collection.connection';
import { RepositoryConnection } from '../../models/connections/repository.connection';
import { paginationComplexity } from '../../plugins/pagination-complexity';
import { createColorObject } from '../color/utils';
import { CollectionIdArgs } from './args/collection-id.args';
import { CollectionSlugArgs } from './args/collection-slug.args';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(private readonly prisma: PrismaService) {}

  @CacheControl({ maxAge: 1800 })
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

  @CacheControl({ inheritMaxAge: true })
  @ResolveField(() => RepositoryConnection, {
    complexity: paginationComplexity,
  })
  repositories(
    @Args() pagination: PaginationArgs,
    @Parent() { id }: P.Collection
  ) {
    const collectionQuery = this.prisma.collection.findUnique({
      where: { id },
      select: { id: true },
    });

    return findManyCursorConnection(
      async (args) =>
        (
          await collectionQuery.Collects({
            orderBy: { Repository: { stargazersCount: 'desc' } },
            include: { Repository: true },
            ...args,
          })
        ).map((item) => item.Repository),
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

  @ResolveField(() => Color, {nullable:true})
  color(@Parent() { color }: P.Collection) {
    return color ? createColorObject(color) : null;
  }
}
