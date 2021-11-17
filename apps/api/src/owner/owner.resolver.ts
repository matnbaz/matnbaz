import { PaginationArgs } from '@exonest/graphql-connections';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import * as P from '@prisma/client';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { RepositoryConnection } from '../models/connections/repository.connection';
import { Owner } from '../models/owner.model';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Owner)
  owner(@Args('id') id: number) {
    return this.prisma.owner.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => Owner)
  ownerByLogin(@Args('login') login: string) {
    return this.prisma.owner.findUnique({
      where: {
        login,
      },
    });
  }

  @ResolveField(() => RepositoryConnection)
  repositories(@Args() pagination: PaginationArgs, @Parent() { id }: P.Owner) {
    return findManyCursorConnection(
      ({ cursor, ...args }) =>
        this.prisma.repository.findMany({
          where: { ownerId: id },
          cursor: { nodeId: cursor.id },
          ...args,
        }),
      () => this.prisma.repository.count({ where: { ownerId: id } }),
      pagination
    );
  }
}
