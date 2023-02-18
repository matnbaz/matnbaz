import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { Collect } from '../models/collect.model';
import { Collection } from '../models/collection.model';
import { Repository } from '../models/repository.model';
import { CollectIdArgs } from './args/collect-id.args';

@Resolver(() => Collect)
export class CollectResolver {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => Collect)
  collect(@Args() { id }: CollectIdArgs) {
    return this.prisma.collect.findUnique({ where: { id } });
  }

  @ResolveField(() => Collection)
  collection(@Parent() { collectionId }: P.Collect) {
    return this.prisma.collection.findUnique({ where: { id: collectionId } });
  }

  @ResolveField(() => Repository)
  async repository(@Parent() { id }: P.Collect) {
    return (
      await this.prisma.collect.findUnique({
        where: { id },
        include: { Repository: true },
      })
    ).Repository;
  }
}
