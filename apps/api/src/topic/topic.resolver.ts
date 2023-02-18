import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { CacheControl } from '../utils/cache-control.decorator';
import { PaginationArgs } from '../utils/pagination';
import {
  Args,
  ID,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { createDateObject } from '../date/utils';
import { RepositoryConnection } from '../models/connections/repository.connection';
import { TopicConnection } from '../models/connections/topic.connection';
import { DateObject } from '../models/date.model';
import { Topic } from '../models/topic.model';
import { paginationComplexity } from '../plugins/pagination-complexity';
import { TopicOrderArgs } from './args/topic-order.args';
import { TopicOrder } from './enums/topics-order.enum';

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Topic, { nullable: true })
  topicById(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.topic.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => TopicConnection, { complexity: paginationComplexity })
  @CacheControl({ maxAge: 180 })
  topics(
    @Args() pagination: PaginationArgs,
    @Args() { order }: TopicOrderArgs
  ) {
    order = order || TopicOrder.REPOSITORIES_DESC;

    return findManyCursorConnection(
      (args) =>
        this.prisma.topic.findMany({
          orderBy: {
            [TopicOrder.REPOSITORIES_DESC]: {
              Repositories: { _count: 'desc' as const },
            },
          }[order],
          ...args,
        }),
      () => this.prisma.topic.count(),
      pagination
    );
  }

  @Query(() => Topic, { nullable: true })
  topic(@Args('name') name: string) {
    return this.prisma.topic.findUnique({
      where: {
        name,
      },
    });
  }

  @ResolveField(() => RepositoryConnection, {
    complexity: paginationComplexity,
  })
  repositories(@Args() pagination: PaginationArgs, @Parent() { id }: P.Topic) {
    const topicPromise = this.prisma.topic.findUnique({ where: { id } });

    return findManyCursorConnection(
      (args) =>
        topicPromise.Repositories({ where: { blockedAt: null }, ...args }),
      async () =>
        (
          await topicPromise.Repositories({
            where: { blockedAt: null },
            select: { id: true },
          })
        ).length,
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
        .Repositories({ where: { blockedAt: null }, select: { id: true } })
    ).length;
  }

  @ResolveField(() => DateObject)
  createdAt(@Parent() { createdAt }: P.Topic) {
    return createDateObject(createdAt);
  }
}
