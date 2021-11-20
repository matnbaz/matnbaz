import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class LanguageArgs {
  languages?: string[];
}
