import { ArgsType, Field } from '@nestjs/graphql';
import { Locale } from '../enums/locale.enum';

@ArgsType()
export class LocaleArgs {
  @Field(() => Locale, { nullable: true })
  locale?: Locale = Locale.Fa;
}
