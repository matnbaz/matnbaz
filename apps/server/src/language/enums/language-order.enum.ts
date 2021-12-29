import { registerEnumType } from '@nestjs/graphql';

export enum LanguageOrder {
  REPOSITORIES_DESC = 'REPOSITORIES_DESC',
}

registerEnumType(LanguageOrder, {
  name: 'LanguageOrder',
  description: 'You can order repositories with one of these options.',
  valuesMap: {
    REPOSITORIES_DESC: {
      description: 'Order by repositories count in descending direction.',
    },
  },
});
