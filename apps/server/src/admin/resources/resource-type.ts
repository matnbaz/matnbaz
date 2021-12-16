import { DMMFClass } from '@prisma/client/runtime';
import { ResourceWithOptions } from 'adminjs';
import { PrismaService } from 'nestjs-prisma';
import { GithubDiscovererScheduler } from '../../github-discoverer/github-discoverer.scheduler';
import { GithubExtractorScheduler } from '../../github-extractor/github-extractor.scheduler';
export interface ResourceContext {
  dmmf: DMMFClass;
  prisma: PrismaService;
  github: {
    discoverer: GithubDiscovererScheduler;
    extractor: GithubExtractorScheduler;
  };
}

export type Resource = (context: ResourceContext) => ResourceWithOptions;
