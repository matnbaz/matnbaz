import { format } from 'date-fns-jalali';

export const humanlyReadableDate = (date: number | Date) => {
  return format(date, 'd MMMM yyyy');
};
