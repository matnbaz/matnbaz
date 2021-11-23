import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ApolloServerPluginCacheControl } from 'apollo-server-core/dist/plugin/cacheControl';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { PrismaModule } from 'nestjs-prisma';
import { join } from 'path';
import { GithubDiscovererModule } from '../github-discoverer/github-discoverer.module';
import { GithubExtractorModule } from '../github-extractor/github-extractor.module';
import { OctokitModule } from '../octokit/octokit.module';
import { ComplexityPlugin } from '../plugins/complexity.plugin';
import { ResolverModule } from '../resolvers/resolver.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: ['query'],
        },
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      sortSchema: true,
      plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 10 }),
        responseCachePlugin(),
      ],
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    OctokitModule,
    GithubDiscovererModule,
    GithubExtractorModule,
    ResolverModule,
  ],
  controllers: [AppController],
  providers: [AppService, ComplexityPlugin],
})
export class AppModule {}
