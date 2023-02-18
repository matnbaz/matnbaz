import { CacheModule as NestCacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    NestCacheModule.register({
      isGlobal: true,
      store: redisStore,
      // Store-specific configuration:
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      port: parseInt(process.env.REDIS_PORT),
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}
