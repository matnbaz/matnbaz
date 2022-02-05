import { persianNumbers } from '../persian-numbers';

/**
 * Note that this is just a tiny utility, intended for the use case of Matnbaz.
 * The function would need a lot of improvements if it was going to be in a public package.
 */
export const localize = (text: string | number, locale: string) => {
  if (locale === 'fa') return persianNumbers(text);
  return text;
};
