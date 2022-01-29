import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { PostTag } from '../models/post-tag.model';

@Resolver(() => PostTag)
export class PostTagResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => PostTag, { nullable: true })
  tag(@Args('name') name: string) {
    return this.prisma.postTag.findFirst({
      where: { name: { mode: 'insensitive', equals: name } },
    });
  }
}
