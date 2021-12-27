import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { PrismaService } from 'nestjs-prisma';
import { Metadata } from '../../models/metadata.model';

@Resolver(() => Metadata)
export class MetadataResolver {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  private CACHE_TTL = 21600; // 6 hours

  @Query(() => Metadata)
  metadata() {
    return {};
  }

  @ResolveField(() => Int)
  async totalReposCount() {
    const reposCount = await this.cacheManager.wrap(
      'totalReposCount',
      () => {
        return this.prisma.repository.count({
          where: {
            blockedAt: null,
          },
        });
      },
      { ttl: this.CACHE_TTL }
    );

    return reposCount;
  }

  @ResolveField(() => Int)
  async totalOwnersCount() {
    const ownersCount = await this.cacheManager.wrap(
      'totalOwnersCount',
      () => {
        return this.prisma.owner.count({
          where: {
            blockedAt: null,
          },
        });
      },
      { ttl: this.CACHE_TTL }
    );

    return ownersCount;
  }
}
