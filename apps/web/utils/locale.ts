import { Locale } from '../lib/graphql-types';

export const localeToEnum = (locale: string) =>
  (locale[0].toUpperCase() + locale.slice(1)) as Locale;
