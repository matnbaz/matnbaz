import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { OwnerType } from './enums/owner-type.enum';
import { PlatformType } from './enums/platform-type.enum';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class Owner {
  @Field(() => PlatformType)
  platform: PlatformType;

  @Field(() => ID)
  platformId: string;

  name?: string;
  login: string;

  @Field(() => OwnerType)
  type: OwnerType;

  @Field(() => Int)
  contributionsCount?: number;

  @Field(() => Int)
  followersCount?: number;

  twitterUsername?: string;
  location?: string;
  company?: string;
  websiteUrl?: string;
}
