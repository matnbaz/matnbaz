import { ArgsType, Field } from '@nestjs/graphql';
import { Locale } from '../enums/locale.enum';

@ArgsType()
export class LocaleArgs {
  @Field(() => Locale)
  locale?: Locale = Locale.Fa;
}
