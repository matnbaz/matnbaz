import * as P from '@prisma/client';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(P.OwnerType, {
  name: 'OwnerType',
  description: 'A repository owner could any of these types.',
  valuesMap: {
    Organization: {
      description: 'Owner is an organization.',
    },
    User: {
      description: 'Owner is a user.',
    },
  },
});

@ObjectType()
export class Owner implements P.Owner {
  id: number;
  login: string;
  nodeId: string;
  gravatarId: string;
  @Field(() => P.OwnerType)
  type: P.OwnerType;
  siteAdmin: boolean;
}
