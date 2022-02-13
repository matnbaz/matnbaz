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
import { OwnerConnection } from '../models/connections/owner.connection';
import { RepositoryConnection } from '../models/connections/repository.connection';
import { Owner } from '../models/owner.model';
import { paginationComplexity } from '../plugins/pagination-complexity';
import { ReportableResolver } from '../report/reportable.resolver';
import { OwnerFilterArgs } from './args/owner-filter.args';
import { OwnerOrderArgs } from './args/owner-order.args';
import { PlatformArgs } from './args/platform.args';
import { OwnerOrder } from './enums/owner-order.enum';

@Resolver(() => Owner)
export class OwnerResolver extends ReportableResolver(Owner) {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  @Query(() => OwnerConnection, {
    // complexity: paginationComplexity,
  })
  owners(
    @Args() pagination: PaginationArgs,
    @Args() { order }: OwnerOrderArgs,
    @Args() { type, withStatistics, platform }: OwnerFilterArgs
  ) {
    order = order || OwnerOrder.PUBLIC_CONTRIBUTIONS_DESC;

    return findManyCursorConnection(
      (args) =>
        this.prisma.owner.findMany({
          where: {
            blockedAt: null,
            type,
            platform,
            followersCount: withStatistics ? { not: null } : undefined,
          },
          orderBy: {
            [OwnerOrder.CONTRIBUTIONS_DESC]: {
              contributionsCount: 'desc' as const,
            },
            [OwnerOrder.PUBLIC_CONTRIBUTIONS_DESC]: {
              publicContributionsCount: 'desc' as const,
            },
            [OwnerOrder.FOLLOWERS_DESC]: { followersCount: 'desc' as const },
            [OwnerOrder.OPEN_ISSUES_COUNT_DESC]: {
              openIssuesCount: 'desc' as const,
            },
            [OwnerOrder.CLOSED_ISSUES_COUNT_DESC]: {
              closedIssuesCount: 'desc' as const,
            },
            [OwnerOrder.PULL_REQUESTS_COUNT_DESC]: {
              pullRequestsCount: 'desc' as const,
            },
            [OwnerOrder.REPOSITORIES_CONTRIBUTED_TO_COUNT_DESC]: {
              repositoriesContributedToCount: 'desc' as const,
            },
            [OwnerOrder.REPOSITORIES_COUNT_DESC]: {
              repositoriesCount: 'desc' as const,
            },
            [OwnerOrder.TOTAL_STARS_COUNT_DESC]: {
              totalStarsCount: 'desc' as const,
            },
          }[order],
          ...args,
        }),
      () =>
        this.prisma.owner.count({
          where: {
            blockedAt: null,
            type,
            platform,
            contributionsCount: withStatistics ? { not: null } : undefined,
            publicContributionsCount: withStatistics
              ? { not: null }
              : undefined,
            followersCount: withStatistics ? { not: null } : undefined,
            openIssuesCount: withStatistics ? { not: null } : undefined,
            closedIssuesCount: withStatistics ? { not: null } : undefined,
            pullRequestsCount: withStatistics ? { not: null } : undefined,
            repositoriesContributedToCount: withStatistics
              ? { not: null }
              : undefined,
            repositoriesCount: withStatistics ? { not: null } : undefined,
            totalStarsCount: withStatistics ? { not: null } : undefined,
          },
        }),
      pagination
    );
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
