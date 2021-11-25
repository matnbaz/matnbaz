import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '@exonest/graphql-connections';
import { humanlyReadableDate } from '@iranfoss/common';
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
import { PlatformByIdArgs } from '../../models/args/platform-by-id.args';
import { RepositoryConnection } from '../../models/connections/repository.connection';
import { Owner } from '../../models/owner.model';
import { paginationComplexity } from '../../plugins/pagination-complexity';
import { PlatformArgs } from './args/platform.args';

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
  ownerByPlatformId(@Args() { id, platform }: PlatformByIdArgs) {
    return this.prisma.owner.findUnique({
      where: { platform_platformId: { platform, platformId: id } },
    });
  }

  @Query(() => Owner, { nullable: true })
  ownerByPlatform(@Args() { owner, platform }: PlatformArgs) {
    return this.prisma.owner.findFirst({
      where: {
        login: owner,
        platform,
      },
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

  @ResolveField(() => RepositoryConnection, {
    complexity: paginationComplexity,
  })
  repositories(@Args() pagination: PaginationArgs, @Parent() { id }: P.Owner) {
    const ownerPromise = this.prisma.owner.findUnique({ where: { id } });

    return findManyCursorConnection(
      (args) => ownerPromise.Repositories(args),
      async () =>
        (await ownerPromise.Repositories({ select: { id: true } })).length,
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

  @ResolveField(() => String)
  extractedAtHumanlyReadable(@Parent() { extractedAt }: P.Owner) {
    return humanlyReadableDate(extractedAt);
  }

  @ResolveField(() => String)
  recordUpdatedAtHumanlyReadable(@Parent() { recordUpdatedAt }: P.Owner) {
    return humanlyReadableDate(recordUpdatedAt);
  }
}
