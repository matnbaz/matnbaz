import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class LanguageIdArgs {
  @Field(() => ID)
  id: string;
}
