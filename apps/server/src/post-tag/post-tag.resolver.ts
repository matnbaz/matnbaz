import { Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { PostTag } from '../models/post-tag.model';

@Resolver(() => PostTag)
export class PostTagResolver {
  constructor(private readonly prisma: PrismaService) {}
}
