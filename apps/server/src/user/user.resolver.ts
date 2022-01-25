import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '@exonest/graphql-connections';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PostConnection } from '../models/connections/post.connections';
import { RepositoryConnection } from '../models/connections/repository.connection';
import { User } from '../models/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => RepositoryConnection)
  async repositories(
    @Parent() { id }: P.User,
    @Args() pagination: PaginationArgs
  ) {
    const owners = await this.prisma.owner.findMany({
      where: { User: { id } },
      select: { id: true },
    });

    const ownerIds = owners.map((owner) => owner.id);

    return findManyCursorConnection(
      (args) =>
        this.prisma.repository.findMany({
          where: { blockedAt: null, Owner: { id: { in: ownerIds } } },
          ...args,
        }),
      () =>
        this.prisma.repository.count({
          where: { blockedAt: null, Owner: { id: { in: ownerIds } } },
        }),
      pagination
    );
  }

  @ResolveField(() => PostConnection)
  async posts(@Parent() { id }: P.User, @Args() pagination: PaginationArgs) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.post.findMany({
          where: { publishedAt: { not: null }, User: { id } },

          ...args,
        }),
      () =>
        this.prisma.post.count({
          where: { publishedAt: { not: null }, User: { id } },
        }),
      pagination
    );
  }
}
