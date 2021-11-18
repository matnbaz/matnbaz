import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
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

  @Query(() => Topic, { nullable: true })
  topicById(@Args('id') id: string) {
    return this.prisma.topic.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => Topic, { nullable: true })
  topic(@Args('name') name: string) {
    return this.prisma.topic.findUnique({
      where: {
        name,
      },
    });
  }

  @ResolveField(() => RepositoryConnection)
  repositories(@Args() pagination: PaginationArgs, @Parent() { id }: P.Topic) {
    return findManyCursorConnection(
      ({ cursor, ...args }) =>
        this.prisma.repository.findMany({
          where: { Topics: { every: { id } } },
          cursor: { nodeId: cursor.id },
          ...args,
        }),
      () =>
        this.prisma.repository.count({ where: { Topics: { every: { id } } } }),
      pagination
    );
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
