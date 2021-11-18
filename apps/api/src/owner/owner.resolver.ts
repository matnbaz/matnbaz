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

  @Query(() => Owner, { nullable: true })
  owner(@Args('id') id: string) {
    return this.prisma.owner.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => Owner, { nullable: true })
  ownerGithub(@Args('id') id: number) {
    return this.prisma.owner.findUnique({
      where: { platform_platformId: { platform: 'GitHub', platformId: id } },
    });
  }

  @Query(() => Owner, { nullable: true })
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
      ({ ...args }) =>
        this.prisma.repository.findMany({
          where: { ownerId: id },
          ...args,
        }),
      () => this.prisma.repository.count({ where: { ownerId: id } }),
      pagination
    );
  }
}
