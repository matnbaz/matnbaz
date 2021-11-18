import { Field, ObjectType } from '@nestjs/graphql';
import * as P from '@prisma/client';
import { registerPlatformTypeEnum } from './enums/platform-type.enum';
import { Language } from './language.model';

registerPlatformTypeEnum();
@ObjectType()
export class Repository {
  id: string;
  platformId: number;
  nodeId: string;
  homePage?: string;
  size: number;
  stargazerscount: number;
  watchersCount: number;
  forksCount: number;
  openIssuesCount: number;
  score: number;
  hasIssues: boolean;
  hasProjects: boolean;
  hasWiki: boolean;
  hasPages: boolean;
  mirrorUrl?: string;
  archived: boolean;
  disabled: boolean;
  allowForking: boolean;
  isTemplate: boolean;
  defaultBranch: string;
  createdAt: Date;
  updatedAt: Date;
  pushedAt: Date;
  extractedAt: Date;
  recordUpdatedAt: Date;
  name: string;
  description?: string;
  isFork: boolean;
  ownerId: string;
  licenseId: string;
  @Field(() => P.PlatformType)
  platform: P.PlatformType;
}
