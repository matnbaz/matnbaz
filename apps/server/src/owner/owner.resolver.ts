import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '@exonest/graphql-connections';
import {
  Args,
  ID,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PlatformByIdArgs } from '../models/args/platform-by-id.args';
import { RepositoryConnection } from '../models/connections/repository.connection';
import { Owner } from '../models/owner.model';
import { paginationComplexity } from '../plugins/pagination-complexity';
import { ReportableResolver } from '../report/reportable.resolver';
import { PlatformArgs } from './args/platform.args';

@Resolver(() => Owner)
export class OwnerResolver extends ReportableResolver(Owner) {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  @Query(() => Owner, { nullable: true })
  owner(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.owner.findFirst({
      where: {
        id,
        blockedAt: null,
      },
    });
  }

  @Query(() => Owner, { nullable: true })
  ownerByPlatformId(@Args() { id, platform }: PlatformByIdArgs) {
    return this.prisma.owner.findFirst({
      where: {
        platform,
        platformId: id,
        blockedAt: null,
      },
    });
  }

  @Query(() => Owner, { nullable: true })
  ownerByPlatform(@Args() { owner, platform }: PlatformArgs) {
    return this.prisma.owner.findFirst({
      where: {
        login: { equals: owner, mode: 'insensitive' },
        platform,
        blockedAt: null,
      },
    });
  }

  @ResolveField(() => RepositoryConnection, {
    complexity: paginationComplexity,
  })
  repositories(@Args() pagination: PaginationArgs, @Parent() { id }: P.Owner) {
    const ownerPromise = this.prisma.owner.findUnique({ where: { id } });

    return findManyCursorConnection(
      (args) =>
        ownerPromise.Repositories({ where: { blockedAt: null }, ...args }),
      async () =>
        (
          await ownerPromise.Repositories({
            where: { blockedAt: null },
            select: { id: true },
          })
        ).length,
      pagination
    );
  }

  @ResolveField(() => Int)
  async repositoriesCount(@Parent() { id }: P.Owner) {
    return (
      await this.prisma.owner
        .findUnique({ where: { id } })
        .Repositories({ where: { blockedAt: null }, select: { id: true } })
    ).length;
  }
}
