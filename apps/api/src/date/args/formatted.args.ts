import { ArgsType, Field } from '@nestjs/graphql';
import { Locale } from '../../models/enums/locale.enum';
import { Calendar } from '../enums/calendar.enum';

@ArgsType()
export class FormattedArgs {
  @Field(() => String)
  format: string = 'd MMMM yyyy';

  @Field(() => Calendar)
  calendar?: Calendar = Calendar.Persian;

  @Field(() => Locale)
  locale?: Locale = Locale.Fa;
}
