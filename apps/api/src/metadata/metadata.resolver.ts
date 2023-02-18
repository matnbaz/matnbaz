import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { Metadata } from '../models/metadata.model';

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

  @ResolveField(() => Int)
  async totalCollectionsCount() {
    const ownersCount = await this.cacheManager.wrap(
      'totalCollectionsCount',
      () => {
        return this.prisma.collection.count({
          where: {},
        });
      },
      { ttl: this.CACHE_TTL }
    );

    return ownersCount;
  }

  @ResolveField(() => Int)
  async totalTopicsCount() {
    const topicsCount = await this.cacheManager.wrap(
      'totalTopicsCount',
      () => {
        return this.prisma.topic.count();
      },
      { ttl: this.CACHE_TTL }
    );

    return topicsCount;
  }

  @ResolveField(() => Int)
  async totalLanguagesCount() {
    const languagesCount = await this.cacheManager.wrap(
      'totalLanguagesCount',
      () => {
        return this.prisma.language.count();
      },
      { ttl: this.CACHE_TTL }
    );

    return languagesCount;
  }
}
