import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OwnerType } from './enums/owner-type.enum';
import { PlatformType } from './enums/platform-type.enum';
import { Node } from './node.model';

@ObjectType({ implements: [Node] })
export class Owner {
  @Field(() => PlatformType)
  platform: PlatformType;

  @Field(() => ID)
  platformId: string;

  login: string;
  gravatarId: string;

  @Field(() => OwnerType)
  type: OwnerType;

  siteAdmin: boolean;
}
