import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class LanguageSlugArgs {
  slug: string;
}
