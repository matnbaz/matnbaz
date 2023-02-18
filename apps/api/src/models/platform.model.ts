import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Platform {
  @Field(() => String)
  name: string;
}
