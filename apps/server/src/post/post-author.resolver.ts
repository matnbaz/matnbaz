import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Owner } from '../models/owner.model';
import { PostAuthor } from '../models/post-author.model';

@Resolver(() => PostAuthor)
export class PostAuthorResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => Owner)
  owner(@Parent() { ownerId }: P.PostAuthor) {
    return this.prisma.owner.findUnique({ where: { id: ownerId } });
  }
}
