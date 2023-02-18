import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserError {
  @Field(() => String)
  message: string;
  @Field(() => [String])
  path?: string[];
}
