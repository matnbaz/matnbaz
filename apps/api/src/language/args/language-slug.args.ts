import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LanguageSlugArgs {
  @Field(() => String)
  slug: string;
}
