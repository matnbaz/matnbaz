import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { BaseRedisCache } from 'apollo-server-cache-redis';
import { ApolloServerPluginCacheControl } from 'apollo-server-core/dist/plugin/cacheControl';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import * as Redis from 'ioredis';
import { PrismaModule } from 'nestjs-prisma';
import { join } from 'path';
import { AdminModule } from '../admin/admin.module';
import { CollectModule } from '../collect/collect.module';
import { CollectionModule } from '../collection/collection.module';
import { ColorModule } from '../color/color.module';
import { DateModule } from '../date/date.module';
import { GithubLocationModule } from '../github-location/github-location.module';
import { GithubOwnerModule } from '../github-owner/github-owner.module';
import { GithubRepositoryModule } from '../github-repository/github-repository.module';
import { GithubModule } from '../github/github.module';
import { HybridThrottlerGuard } from '../hybrid-throttler.guard';
import { LanguageModule } from '../language/language.module';
import { LicenseModule } from '../license/license.module';
import { MetadataModule } from '../metadata/metadata.module';
import { OctokitModule } from '../octokit/octokit.module';
import { OwnerModule } from '../owner/owner.module';
import { ComplexityPlugin } from '../plugins/complexity.plugin';
import { ReportModule } from '../report/report.module';
import { RepositoryModule } from '../repository/repository.module';
import { SubmissionModule } from '../submission/submission.module';
import { TopicModule } from '../topic/topic.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          // log: process.env.NODE_ENV === 'development' ? ['query'] : [],
        },
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/server/src/schema.gql'),
      sortSchema: true,
      cache: new BaseRedisCache({
        client: new Redis(),
      }),
      plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 5 }),
        responseCachePlugin(),
      ],
      context: ({ req, res }) => ({ req, res }),
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV === 'development',
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    AdminModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    OctokitModule,
    GithubModule,
    GithubOwnerModule,
    GithubLocationModule,
    GithubRepositoryModule,
    LanguageModule,
    LicenseModule,
    OwnerModule,
    RepositoryModule,
    TopicModule,
    ReportModule,
    SubmissionModule,
    DateModule,
    ColorModule,
    MetadataModule,
    CollectionModule,
    CollectModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ComplexityPlugin,
    {
      provide: APP_GUARD,
      useClass: HybridThrottlerGuard,
    },
  ],
})
export class AppModule {}
