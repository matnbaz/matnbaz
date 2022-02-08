import { localize } from '@matnbaz/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import * as dateFns from 'date-fns';
import * as dateFnsJalali from 'date-fns-jalali';
import { DateObject } from '../models/date.model';
import { DifferenceArgs } from './args/difference.args';
import { FormattedArgs } from './args/formatted.args';
import { Calendar } from './enums/calendar.enum';

@Resolver(() => DateObject)
export class DateResolver {
  @ResolveField(() => String)
  formatted(
    @Args() { format: formatString, calendar, locale }: FormattedArgs,
    @Parent() { original }: DateObject
  ) {
    const formatted =
      calendar === Calendar.Persian
        ? dateFnsJalali.format(original, formatString)
        : dateFns.format(original, formatString);

    return localize(formatted, locale.toLowerCase());
  }

  @ResolveField(() => String)
  difference(
    @Args() { calendar, locale }: DifferenceArgs,
    @Parent() { original }: DateObject
  ) {
    const formatted =
      calendar === Calendar.Persian
        ? dateFnsJalali.formatDistanceToNow(new Date(original), {
            addSuffix: true,
          })
        : dateFns.formatDistanceToNow(new Date(original), {
            addSuffix: true,
          });

    return localize(formatted, locale.toLowerCase());
  }
}
