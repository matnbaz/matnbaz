import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Topic {
  id: string;
  name: string;
  createdAt: Date;
}
