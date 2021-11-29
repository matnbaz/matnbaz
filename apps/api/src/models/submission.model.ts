import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Submission {
  @Field(() => ID)
  id: string;

  content: string;
}
