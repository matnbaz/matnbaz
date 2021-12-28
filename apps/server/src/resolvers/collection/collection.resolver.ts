import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CacheControl } from '@exonest/graphql-cache-control';
import { PaginationArgs } from '@exonest/graphql-connections';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Collection } from '../../models/collection.model';
import { CollectionConnection } from '../../models/connections/collection.connection';
import { RepositoryConnection } from '../../models/connections/repository.connection';
import { paginationComplexity } from '../../plugins/pagination-complexity';
import { CollectionIdArgs } from './args/collection-id.args';
import { CollectionSlugArgs } from './args/collection-slug.args';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => CollectionConnection)
  collections(@Args() pagination: PaginationArgs) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.collection.findMany({
          orderBy: { Collects: { _count: 'asc' } },
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

  @CacheControl({ maxAge: 1800 })
  @ResolveField(() => RepositoryConnection, {
    complexity: paginationComplexity,
  })
  repositories(
    @Args() pagination: PaginationArgs,
    @Parent() { id }: P.Collection
  ) {
    return findManyCursorConnection(
      async (args) =>
        (
          await this.prisma.collect.findMany({
            where: { Collection: { id } },
            include: { Repository: true },
            ...args,
          })
        ).map((collect) => collect.Repository),
      () => this.prisma.collect.count({ where: { Collection: { id } } }),
      pagination
    );
  }
}
