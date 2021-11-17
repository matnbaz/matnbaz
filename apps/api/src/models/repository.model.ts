import * as P from '@prisma/client';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Repository implements P.Repository {
  id: number;
  homePage: string;
  size: number;
  stargazerscount: number;
  watchersCount: number;
  forksCount: number;
  openIssuesCount: number;
  language: string;
  hasIssues: boolean;
  hasProjects: boolean;
  hasWiki: boolean;
  hasPages: boolean;
  mirrorUrl: string;
  archived: boolean;
  disabled: boolean;
  license: string;
  allowForking: boolean;
  isTemplate: boolean;
  defaultBranch: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  pushedAt: Date;
  nodeId: string;
  name: string;
  description: string;
  isFork: boolean;
  ownerId: number;
}
