import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
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
}
