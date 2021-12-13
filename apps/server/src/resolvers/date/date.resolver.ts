import { persianNumbers as persianNumbersFn } from '@matnbaz/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { format, formatDistanceToNow } from 'date-fns-jalali';
import { DateObject } from '../../models/date.model';
import { DifferenceArgs } from './args/difference.args';
import { FormattedArgs } from './args/formatted.args';

@Resolver(() => DateObject)
export class DateResolver {
  @ResolveField(() => String)
  formatted(
    @Args() { format: formatString, persianNumbers }: FormattedArgs,
    @Parent() { original }: DateObject
  ) {
    const formatted = format(original, formatString);
    return persianNumbers ? persianNumbersFn(formatted) : formatted;
  }

  @ResolveField(() => String)
  difference(
    @Args() { persianNumbers }: DifferenceArgs,
    @Parent() { original }: DateObject
  ) {
    const formatted = formatDistanceToNow(new Date(original), {
      addSuffix: true,
    });
    return persianNumbers ? persianNumbersFn(formatted) : formatted;
  }
}
