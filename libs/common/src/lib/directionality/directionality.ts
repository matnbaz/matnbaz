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
  rtlLanguages.includes(locale) ? 'rtl' : 'ltr';

export const setBodyDirection = (locale: string) => {
  if (typeof window === 'undefined')
    throw Error(
      'This utility is not intended to be used in a non-browser environment.'
    );

  document.body.dir = getDirectionality(locale);
};
