import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { Repository } from '../models/repository.model';

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
}
