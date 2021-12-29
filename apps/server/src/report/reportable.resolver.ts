import { NotFoundException, Type } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ReportableType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Report } from '../models/report.model';

export function ReportableResolver<T extends Type<unknown>>(classRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class ReportableResolverHost {
    constructor(private readonly prisma: PrismaService) {}

    @Mutation(() => Report, {
      name: `report${classRef.name}`,
      deprecationReason: 'Use `report` for now',
    })
    async report(
      @Args('id', { type: () => ID }) id: string,
      @Args('reason') reason: string
    ) {
      if (!ReportableType[classRef.name]) throw Error();

      const reportablePrismaTypeMap = {
        [ReportableType.Owner]: 'owner' as const,
        [ReportableType.Repository]: 'repository' as const,
      };

      const reportable = await this.prisma[
        reportablePrismaTypeMap[classRef.name]
      ].findUnique({ where: { id } });
      if (!reportable) throw new NotFoundException();

      return this.prisma.report.create({
        data: {
          reason,
          reportableId: reportable.id,
          reportableType: classRef.name as ReportableType,
        },
      });
    }
  }
  return ReportableResolverHost;
}
