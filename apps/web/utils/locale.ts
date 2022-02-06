import { Calendar, Locale } from '../lib/graphql-types';

export const localeToEnum = (locale: string) =>
  (locale[0].toUpperCase() + locale.slice(1)) as Locale;

export const calendarFromLocale = (locale: string) =>
  locale === 'fa' ? Calendar.Persian : Calendar.Georgian;
