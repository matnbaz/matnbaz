import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PlatformType } from './enums/platform-type.enum';

@ObjectType()
export class Repository {
  id: string;

  @Field(() => ID)
  platformId: string;

  homePage?: string;

  @Field(() => Int)
  size: number;

  @Field(() => Int)
  stargazersCount: number;

  @Field(() => Int)
  watchersCount: number;

  @Field(() => Int)
  forksCount: number;

  @Field(() => Int)
  openIssuesCount: number;

  @Field(() => Int)
  score?: number;

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
  @Field(() => PlatformType)
  platform: PlatformType;
}
