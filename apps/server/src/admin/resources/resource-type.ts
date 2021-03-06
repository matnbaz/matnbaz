import { DMMFClass } from '@prisma/client/runtime';
import { ResourceWithOptions } from 'adminjs';
import { Queue } from 'bull';
import { PrismaService } from 'nestjs-prisma';
export interface ResourceContext {
  dmmf: DMMFClass;
  prisma: PrismaService;
  queues: {
    github: Queue;
    main: Queue;
  };
}

export type Resource = (context: ResourceContext) => ResourceWithOptions;
