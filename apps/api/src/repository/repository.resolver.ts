import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { Owner } from '../models/owner.model';
import { Repository } from '../models/repository.model';
import * as P from '@prisma/client';
import { Topic } from '../models/topic.model';

@Resolver(() => Repository)
export class RepositoryResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Repository)
  repository(@Args('id') id: number) {
    return this.prisma.repository.findUnique({
      where: {
        id,
      },
    });
  }

  @ResolveField(() => Owner)
  owner(@Parent() { id }: P.Repository) {
    return this.prisma.repository
      .findUnique({
        where: { id },
        select: { id: true },
      })
      .owner();
  }

  @ResolveField(() => [Topic])
  topics(@Parent() { id }: P.Repository) {
    return this.prisma.repository
      .findUnique({
        where: { id },
        select: { id: true },
      })
      .topics();
  }
}
