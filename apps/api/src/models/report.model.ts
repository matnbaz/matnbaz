import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Report {
  @Field(() => ID)
  id: string;

  reason: string;
}
