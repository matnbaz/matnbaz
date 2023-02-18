import { DMMFClass } from '@prisma/client/runtime';
import { ResourceWithOptions } from 'adminjs';
import { Queue } from 'bull';
import { PrismaService } from '../../persistence/prisma/prisma.service';
export interface ResourceContext {
  dmmf: DMMFClass;
  prisma: PrismaService;
  queues: {
    github: Queue;
    main: Queue;
  };
}

export type Resource = (context: ResourceContext) => ResourceWithOptions;
