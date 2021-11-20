import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Language {
  @Field(() => ID)
  id: string;

  name: string;
  slug: string;
  description?: string;
}
