import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PlatformType } from './enums/platform-type.enum';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class Repository {
  @Field(() => ID)
  platformId: string;

  @Field(() => String, { nullable: true })
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

  @Field(() => Boolean)
  archived: boolean;

  @Field(() => Boolean)
  disabled: boolean;

  @Field(() => Boolean)
  isTemplate: boolean;

  @Field(() => String)
  defaultBranch: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  readme?: string;

  @Field(() => Boolean)
  isFork: boolean;

  @Field(() => String, { nullable: true })
  openGraphImageUrl?: string;

  @Field(() => PlatformType)
  platform: PlatformType;
}
