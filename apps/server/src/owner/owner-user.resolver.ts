import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '@exonest/graphql-connections';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OwnerUserConnection } from '../models/connections/owner.connection';
import { OwnerUser } from '../models/owner.model';

@Resolver(() => OwnerUser)
export class OwnerUserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => OwnerUserConnection)
  async organizations(
    @Args() pagination: PaginationArgs,
    @Parent() { id }: P.Owner
  ) {
    return findManyCursorConnection(
      async (args) =>
        (
          await this.prisma.owner
            .findUnique({ where: { id } })
            .Organizations({ include: { Organization: true }, ...args })
        ).map((membership) => membership.Organization),
      async () =>
        (await this.prisma.owner.findUnique({ where: { id } }).Organizations())
          .length,
      pagination
    );
  }
}
