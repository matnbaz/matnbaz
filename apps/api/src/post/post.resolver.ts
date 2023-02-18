import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '../utils/pagination';
import { limitWords } from 'common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { createDateObject } from '../date/utils';
import { PostConnection } from '../models/connections/post.connections';
import { DateObject } from '../models/date.model';
import { PostTag } from '../models/post-tag.model';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { paginationComplexity } from '../plugins/pagination-complexity';
import { PostFilterArgs } from './args/post-filter.args';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => PostConnection, {
    complexity: paginationComplexity,
  })
  posts(@Args() pagination: PaginationArgs, @Args() { tags }: PostFilterArgs) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.post.findMany({
          where: {
            publishedAt: { not: null },
            AND:
              tags && tags.length > 0
                ? tags.map((tag) => ({
                    Tags: { some: { name: tag } },
                  }))
                : undefined,
          },

          orderBy: { publishedAt: 'desc' },
          ...args,
        }),
      () =>
        this.prisma.post.count({
          where: { publishedAt: { not: null } },
          orderBy: { publishedAt: 'desc' },
        }),
      pagination
    );
  }

  @Query(() => Post, { nullable: true })
  postBySlug(@Args('slug') slug: string) {
    return this.prisma.post.findUnique({
      where: {
        slug,
      },
    });
  }

  @ResolveField(() => User)
  async author(@Parent() { id }: P.Post) {
    return (
      await this.prisma.post.findUnique({
        where: { id },
        select: { id: true, User: true },
      })
    ).User;
  }

  @ResolveField(() => [PostTag])
  async tags(@Parent() { id }: P.Post) {
    return this.prisma.post.findUnique({ where: { id } }).Tags();
  }

  @ResolveField(() => String, { nullable: true })
  summaryLimited(@Parent() { summary }: P.Post) {
    return summary ? limitWords(summary, 256) : null;
  }

  @ResolveField(() => DateObject)
  createdAt(@Parent() { createdAt }: P.Post) {
    return createDateObject(createdAt);
  }

  @ResolveField(() => DateObject)
  updatedAt(@Parent() { updatedAt }: P.Post) {
    return createDateObject(updatedAt);
  }

  @ResolveField(() => DateObject, { nullable: true })
  publishedAt(@Parent() { publishedAt }: P.Post) {
    return publishedAt ? createDateObject(publishedAt) : null;
  }
}
