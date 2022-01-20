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
import { PrismaService } from 'nestjs-prisma';
import { createDateObject } from '../date/utils';
import { RepositorySelectionConnection } from '../models/connections/repository-selection.connection';
import { DateObject } from '../models/date.model';
import { RepositorySelection } from '../models/repository-selection.model';
import { Repository } from '../models/repository.model';

@Resolver(() => RepositorySelection)
export class RepositorySelectionResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => RepositorySelectionConnection)
  selections(@Args() pagination: PaginationArgs) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.repositorySelection.findMany({
          orderBy: { featuredAt: 'desc' },
          where: { featuredAt: { not: null } },
          ...args,
        }),
      () =>
        this.prisma.repositorySelection.count({
          where: { featuredAt: { not: null } },
        }),
      pagination
    );
  }

  @Query(() => RepositorySelection, { nullable: true })
  selection(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.repositorySelection.findUnique({ where: { id } });
  }

  @ResolveField(() => [Repository])
  repositories(@Parent() { id }: P.RepositorySelection) {
    return this.prisma.repositorySelection
      .findUnique({ where: { id } })
      .Repositories();
  }

  @ResolveField(() => DateObject)
  createdAt(@Parent() { createdAt }: P.RepositorySelection) {
    return createDateObject(createdAt);
  }

  @ResolveField(() => DateObject)
  featuredAt(@Parent() { featuredAt }: P.RepositorySelection) {
    return createDateObject(featuredAt);
  }
}
