import { ArgsType, Field } from '@nestjs/graphql';
import { Locale } from '../../models/enums/locale.enum';
import { Calendar } from '../enums/calendar.enum';

@ArgsType()
export class DifferenceArgs {
  @Field(() => Calendar, { nullable: true })
  calendar?: Calendar = Calendar.Persian;

  @Field(() => Locale, { nullable: true })
  locale?: Locale = Locale.Fa;
}
