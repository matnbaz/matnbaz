import { registerEnumType } from '@nestjs/graphql';

export enum Locale {
  Fa = 'Fa',
  En = 'En',
}

registerEnumType(Locale, {
  name: 'Locale',
  description: 'A locale used for internationalization.',
  valuesMap: {
    Fa: {
      description: 'Farsi/Persian (The default language)',
    },
    En: {
      description: 'English',
    },
  },
});
