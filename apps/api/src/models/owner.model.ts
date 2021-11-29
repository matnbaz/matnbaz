import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OwnerType } from './enums/owner-type.enum';
import { PlatformType } from './enums/platform-type.enum';

@ObjectType()
export class Owner {
  id: string;
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
