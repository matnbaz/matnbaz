import { MonomediaModule } from '@matnbaz/monomedia';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttling } from '@octokit/plugin-throttling';
import { BaseRedisCache } from 'apollo-server-cache-redis';
import { ApolloServerPluginCacheControl } from 'apollo-server-core/dist/plugin/cacheControl';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import * as Redis from 'ioredis';
import { OctokitModule } from 'nestjs-octokit';
import { PrismaModule } from 'nestjs-prisma';
import { join } from 'path';
import { AdminModule } from '../admin/admin.module';
import { CollectModule } from '../collect/collect.module';
import { CollectionModule } from '../collection/collection.module';
import { ColorModule } from '../color/color.module';
import { DateModule } from '../date/date.module';
import { GithubDiscovererModule } from '../github-discoverer/github-discoverer.module';
import { GithubExtractorModule } from '../github-extractor/github-extractor.module';
import { HybridThrottlerGuard } from '../hybrid-throttler.guard';
import { LanguageModule } from '../language/language.module';
import { LicenseModule } from '../license/license.module';
import { MarkdownModule } from '../markdown/markdown.module';
import { MetadataModule } from '../metadata/metadata.module';
import { OwnerModule } from '../owner/owner.module';
import { ComplexityPlugin } from '../plugins/complexity.plugin';
import { PostTagModule } from '../post-tag/post-tag.module';
import { PostModule } from '../post/post.module';
import { ReportModule } from '../report/report.module';
import { RepositoryModule } from '../repository/repository.module';
import { SubmissionModule } from '../submission/submission.module';
import { TopicModule } from '../topic/topic.module';
import { UserModule } from '../user/user.module';
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
    OctokitModule.forRootAsync({
      isGlobal: true,
      useFactory: async () => ({
        plugins: [throttling],
        octokitOptions: {
          auth: process.env.GITHUB_TOKEN,
          throttle: {
            onRateLimit: (retryAfter, options, octokit) => {
              octokit.log.warn(
                `Request quota exhausted for request ${options.method} ${options.url}`
              );

              octokit.log.info(`Retrying after ${retryAfter} seconds!`);
              return true;
            },
            onAbuseLimit: (retryAfter, options, octokit) => {
              // does not retry, only logs a warning
              octokit.log.warn(
                `Abuse detected for request ${options.method} ${options.url}`
              );
            },
          },
        },
      }),
    }),
    MonomediaModule.forRoot({
      isGlobal: true,
      discord: {
        webhookUrl: process.env.DISCORD_WEBHOOK_URL,
        botImage:
          'https://raw.githubusercontent.com/matnbaz/graphics/main/social.jpg',
        botName: 'Matnbaz',
      },
      telegram: {
        channelUsername: process.env.TELEGRAM_CHANNEL_USERNAME,
        botToken: process.env.TELEGRAM_BOT_TOKEN,
      },
      twitter: {
        username: process.env.TWITTER_USERNAME,
        password: process.env.TWITTER_PASSWORD,
      },
      instagram: {
        username: process.env.INSTAGRAM_USERNAME,
        password: process.env.INSTAGRAM_PASSWORD,
      },
    }),
    MarkdownModule,
    GithubDiscovererModule,
    GithubExtractorModule,
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
    UserModule,
    PostModule,
    PostTagModule,
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
