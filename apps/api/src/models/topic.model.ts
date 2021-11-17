import * as P from '@prisma/client';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Topic implements P.Topic {
  id: number;
  name: string;
}
