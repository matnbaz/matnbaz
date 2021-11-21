import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from 'nestjs-prisma';
import { join } from 'path';
import { GithubDiscovererModule } from '../github-discoverer/github-discoverer.module';
import { GithubExtractorModule } from '../github-extractor/github-extractor.module';
import { LanguageModule } from '../resolvers/language/language.module';
import { LicenseModule } from '../resolvers/license/license.module';
import { OctokitModule } from '../octokit/octokit.module';
import { OwnerModule } from '../resolvers/owner/owner.module';
import { RepositoryModule } from '../resolvers/repository/repository.module';
import { TopicModule } from '../resolvers/topic/topic.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          // log: ['query'],
        },
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      sortSchema: true,
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
    // GraphQL:
    RepositoryModule,
    TopicModule,
    OwnerModule,
    LanguageModule,
    LicenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
