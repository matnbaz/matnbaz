export const rtlLanguages = [
  'ar',
  'arc',
  'dv',
  'fa',
  'ha',
  'he',
  'khw',
  'ks',
  'ku',
  'ps',
  'ur',
  'yi',
];

export const getDirectionality = (locale: string) =>
  rtlLanguages.some(l => l === locale) ? 'rtl' : 'ltr';

export const setBodyDirection = (locale: string) => {
  if (typeof window === 'undefined')
    throw Error(
      'This utility is not intended to be used in a non-browser environment.'
    );

  document.documentElement.dir = getDirectionality(locale);
};
