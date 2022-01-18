import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '@exonest/graphql-connections';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { createDateObject } from '../date/utils';
import { RepositorySpotlightConnection } from '../models/connections/repository-spotlight.connection';
import { DateObject } from '../models/date.model';
import { RepositorySpotlight } from '../models/repository-spotlight.model';
import { Repository } from '../models/repository.model';

@Resolver(() => RepositorySpotlight)
export class RepositorySpotlightResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => RepositorySpotlightConnection)
  spotlights(@Args() pagination: PaginationArgs) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.repositorySpotlight.findMany({
          orderBy: { spotlightedAt: 'desc' },
          where: { spotlightedAt: { not: null } },
          ...args,
        }),
      () =>
        this.prisma.repositorySpotlight.count({
          where: { spotlightedAt: { not: null } },
        }),
      pagination
    );
  }

  @ResolveField(() => Repository)
  repository(@Parent() { repositoryId }: P.RepositorySpotlight) {
    return this.prisma.repository.findUnique({ where: { id: repositoryId } });
  }

  @ResolveField(() => DateObject)
  createdAt(@Parent() { createdAt }: P.RepositorySpotlight) {
    return createDateObject(createdAt);
  }

  @ResolveField(() => DateObject)
  spotlightedAt(@Parent() { spotlightedAt }: P.RepositorySpotlight) {
    return createDateObject(spotlightedAt);
  }
}
