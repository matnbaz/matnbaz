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
import { PrismaService } from 'nestjs-prisma';
import { PlatformArgs } from '../models/args/platform.args';
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
  ownerByPlatform(@Args() { id, platform }: PlatformArgs) {
    return this.prisma.owner.findUnique({
      where: { platform_platformId: { platform, platformId: id } },
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

  @ResolveField(() => Int)
  async repositoriesCount(@Parent() { id }: P.Owner) {
    return (
      await this.prisma.owner
        .findUnique({ where: { id } })
        .Repositories({ select: { id: true } })
    ).length;
  }
}
