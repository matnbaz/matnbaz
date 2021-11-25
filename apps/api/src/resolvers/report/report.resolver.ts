import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { PrismaService } from 'nestjs-prisma';
import { Report } from '../../models/report.model';

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
}
