import { Field, ObjectType } from '@nestjs/graphql';
import { OwnerType } from './enums/owner-type.enum';
import { PlatformType } from './enums/platform-type.enum';

@ObjectType()
export class Owner {
  id: string;
  @Field(() => PlatformType)
  platform: PlatformType;
  platformId: number;
  login: string;
  nodeId: string;
  gravatarId: string;
  @Field(() => OwnerType)
  type: OwnerType;
  siteAdmin: boolean;
  extractedAt: Date;
  recordUpdatedAt: Date;
}
