import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class License {
  @Field(() => ID)
  id: string;

  name: string;
  key: string;
  spdxId: string;
}
