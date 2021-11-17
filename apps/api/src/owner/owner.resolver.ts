import { PaginationArgs } from '@exonest/graphql-connections';
import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
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
  repositories(@Args() pagination: PaginationArgs) {
    throw Error('Not implemented yet.');
  }
}
