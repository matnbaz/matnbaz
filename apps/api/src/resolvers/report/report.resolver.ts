import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import * as P from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { DateObject } from '../../models/date.model';
import { Report } from '../../models/report.model';
import { createDateObject } from '../date/utils';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => DateObject)
  recordUpdatedAt(@Parent() { createdAt }: P.Report) {
    return createDateObject(createdAt);
  }
}
