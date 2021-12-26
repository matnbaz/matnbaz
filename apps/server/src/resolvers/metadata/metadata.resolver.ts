import { CacheControl } from '@exonest/graphql-cache-control';
import { Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { Metadata } from '../../models/metadata.model';

@Resolver(() => Metadata)
export class MetadataResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Metadata)
  @CacheControl({ maxAge: 180 })
  metadata() {
    return {};
  }

  @ResolveField(() => Int)
  totalReposCount() {
    return this.prisma.repository.count({
      where: {
        blockedAt: null,
      },
    });
  }

  @ResolveField(() => Int)
  totalOwnersCount() {
    return this.prisma.owner.count({
      where: {
        blockedAt: null,
      },
    });
  }
}
