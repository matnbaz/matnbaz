import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from 'nestjs-prisma';
import { join } from 'path';
import { OperatorGhModule } from '../operator-gh/operator-gh.module';
import { OwnerModule } from '../owner/owner.module';
import { RepositoryModule } from '../repository/repository.module';
import { TopicModule } from '../topic/topic.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      sortSchema: true,
    }),
    ScheduleModule.forRoot(),
    OperatorGhModule,
    // GraphQL:
    RepositoryModule,
    TopicModule,
    OwnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
