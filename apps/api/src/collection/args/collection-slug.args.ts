import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CollectionSlugArgs {
  @Field(() => String)
  slug: string;
}
