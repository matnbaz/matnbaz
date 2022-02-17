import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '@exonest/graphql-connections';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OwnerUserConnection } from '../models/connections/owner.connection';
import { OwnerOrganization } from '../models/owner.model';

@Resolver(() => OwnerOrganization)
export class OwnerOrganizationResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => OwnerUserConnection)
  async members(@Args() pagination: PaginationArgs, @Parent() { id }: P.Owner) {
    return findManyCursorConnection(
      async (args) =>
        (
          await this.prisma.owner
            .findUnique({ where: { id } })
            .Members({ include: { Member: true }, ...args })
        ).map((membership) => membership.Member),
      async () =>
        (await this.prisma.owner.findUnique({ where: { id } }).Members())
          .length,
      pagination
    );
  }
}
