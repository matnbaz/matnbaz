import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { Owner } from '../models/owner.model';
import { Repository } from '../models/repository.model';
import * as P from '@prisma/client';
import { Topic } from '../models/topic.model';
import { RepositoryConnection } from '../models/connections/repository.connection';
import { PaginationArgs } from '@exonest/graphql-connections';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Language } from '../models/language.model';
import * as GithubColors from 'github-colors';

@Resolver(() => Repository)
export class RepositoryResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Repository, { nullable: true })
  repositoryById(@Args('id') id: string) {
    return this.prisma.repository.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => Repository, { nullable: true })
  repositoryGithub(@Args('id') id: number) {
    return this.prisma.repository.findFirst({
      where: {
        platform: 'GitHub',
        platformId: id,
      },
    });
  }

  @Query(() => RepositoryConnection)
  repositories(@Args() pagination: PaginationArgs) {
    return findManyCursorConnection(
      (args) => this.prisma.repository.findMany({ ...args }),
      () => this.prisma.repository.count(),
      pagination
    );
  }

  @ResolveField(() => Owner, { nullable: true })
  owner(@Parent() { id }: P.Repository) {
    return this.prisma.repository
      .findUnique({
        where: { id },
        select: { id: true },
      })
      .Owner();
  }

  @ResolveField(() => String)
  async fullName(@Parent() { id, name }: P.Repository) {
    const owner = await this.prisma.repository
      .findUnique({
        where: { id },
        select: { id: true },
      })
      .Owner();

    return `${owner.login}/${name}`;
  }

  @ResolveField(() => [Topic])
  topics(@Parent() { id }: P.Repository) {
    return this.prisma.repository
      .findUnique({
        where: { id },
        select: { id: true },
      })
      .Topics();
  }

  @ResolveField(() => Language, { nullable: true })
  language(@Parent() { language }: P.Repository) {
    if (!language) return null;
    const languageInfo = GithubColors.get(language);
    return {
      name: language,
      color: languageInfo?.color || null,
    };
  }
}
