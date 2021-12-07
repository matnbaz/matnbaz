import { DMMFClass } from '@prisma/client/runtime';
import { ResourceWithOptions } from 'adminjs';
import { PrismaService } from 'nestjs-prisma';

export interface ResourceContext {
  dmmf: DMMFClass;
  prisma: PrismaService;
}

export type Resource = (context: ResourceContext) => ResourceWithOptions;
