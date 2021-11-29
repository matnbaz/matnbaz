import { NotFoundException } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { DateObject } from '../../models/date.model';
import { Report } from '../../models/report.model';
import { createDateObject } from '../date/utils';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Throttle(5)
  @Mutation(() => Report)
  async reportOwner(
    @Args('ownerId', { type: () => ID }) id: string,
    @Args('reason') reason: string
  ) {
    const owner = await this.prisma.owner.findUnique({ where: { id } });
    if (!owner) throw new NotFoundException();

    return this.prisma.report.create({
      data: {
        reason,
        owner: { connect: { id } },
      },
    });
  }

  @ResolveField(() => DateObject)
  recordUpdatedAt(@Parent() { createdAt }: P.Report) {
    return createDateObject(createdAt);
  }
}
