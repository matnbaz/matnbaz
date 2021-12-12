import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PlatformType } from './enums/platform-type.enum';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class Repository {
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
  name: string;
  description?: string;
  readme?: string;
  isFork: boolean;

  @Field(() => PlatformType)
  platform: PlatformType;
}
