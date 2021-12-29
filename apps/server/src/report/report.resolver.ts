import { NotFoundException } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { createDateObject } from '../date/utils';
import { DateObject } from '../models/date.model';
import { ReportableType } from '../models/enums/reportable-type.enum';
import { Report } from '../models/report.model';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => Report)
  async report(
    @Args('subject', { type: () => ReportableType })
    reportableType: ReportableType,
    @Args('id', { type: () => ID }) id: string,
    @Args('reason') reason: string
  ) {
    const reportablePrismaTypeMap = {
      [ReportableType.Owner]: 'owner' as const,
      [ReportableType.Repository]: 'repository' as const,
    };

    const reportable = await this.prisma[
      reportablePrismaTypeMap[reportableType as string]
    ].findUnique({ where: { id } });
    if (!reportable) throw new NotFoundException();

    return this.prisma.report.create({
      data: {
        reason,
        reportableId: reportable.id,
        reportableType: reportableType,
      },
    });
  }

  @ResolveField(() => DateObject)
  recordUpdatedAt(@Parent() { createdAt }: P.Report) {
    return createDateObject(createdAt);
  }
}
