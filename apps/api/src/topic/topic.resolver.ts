import { PaginationArgs } from '@exonest/graphql-connections';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { RepositoryConnection } from '../models/connections/repository.connection';
import { Topic } from '../models/topic.model';

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Topic)
  topicById(@Args('id') id: number) {
    return this.prisma.topic.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => Topic)
  topic(@Args('name') name: string) {
    return this.prisma.topic.findUnique({
      where: {
        name,
      },
    });
  }

  @ResolveField(() => RepositoryConnection)
  repositories(@Args() pagination: PaginationArgs, @Parent() topic: P.Topic) {
    throw Error('Not implemented yet.');
  }

  @ResolveField(() => Int)
  async repositoriesCount(@Parent() { id }: P.Topic) {
    return (
      await this.prisma.topic
        .findUnique({
          where: { id },
          select: { id: true },
        })
        .Repositories()
    ).length;
  }
}
