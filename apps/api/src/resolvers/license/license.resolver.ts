import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CacheControl } from '@exonest/graphql-cache-control';
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
import { LicenseConnection } from '../../models/connections/license.connection';
import { RepositoryConnection } from '../../models/connections/repository.connection';
import { License } from '../../models/license.model';
import { paginationComplexity } from '../../plugins/pagination-complexity';
import { LicenseOrderArgs } from './args/license-order.args';
import { LicenseOrder } from './enums/license-order.enum';

@Resolver(() => License)
export class LicenseResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => LicenseConnection, {
    // complexity: paginationComplexity,
  })
  @CacheControl({ maxAge: 180 })
  licenses(
    @Args() pagination: PaginationArgs,
    @Args() { order = LicenseOrder.REPOSITORIES_DESC }: LicenseOrderArgs
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.license.findMany({
          orderBy: {
            [LicenseOrder.REPOSITORIES_DESC]: {
              Repositories: { _count: 'desc' as const },
            },
          }[order],
          ...args,
        }),
      () => this.prisma.license.count(),
      pagination
    );
  }

  @ResolveField(() => RepositoryConnection, {
    complexity: paginationComplexity,
  })
  repositories(
    @Args() pagination: PaginationArgs,
    @Parent() { id }: P.License
  ) {
    const licensePromise = this.prisma.license.findUnique({ where: { id } });

    return findManyCursorConnection(
      (args) => licensePromise.Repositories(args),
      async () =>
        (await licensePromise.Repositories({ select: { id: true } })).length,
      pagination
    );
  }

  @ResolveField(() => Int)
  async repositoriesCount(@Parent() { id }: P.License) {
    return (
      await this.prisma.license
        .findUnique({ where: { id } })
        .Repositories({ select: { id: true } })
    ).length;
  }
}
