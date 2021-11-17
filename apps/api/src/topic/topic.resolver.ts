import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { Topic } from '../models/topic.model';

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Topic)
  topic(@Args('id') id: number) {
    return this.prisma.topic.findUnique({
      where: {
        id,
      },
    });
  }
}
