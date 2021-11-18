import * as P from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';
import { registerOwnerTypeEnum } from './enums/owner-type.enum';

registerOwnerTypeEnum();

@ObjectType()
export class Owner implements P.Owner {
  id: string;
  @Field(() => P.PlatformType)
  platform: P.PlatformType;
  platformId: number;
  login: string;
  nodeId: string;
  gravatarId: string;
  @Field(() => P.OwnerType)
  type: P.OwnerType;
  siteAdmin: boolean;
  extractedAt: Date;
  recordUpdatedAt: Date;
}
