import { registerEnumType } from '@nestjs/graphql';

export enum LicenseOrder {
  REPOSITORIES_DESC = 'REPOSITORIES_DESC',
}

registerEnumType(LicenseOrder, {
  name: 'LicenseOrder',
  description: 'You can order repositories with one of these options.',
  valuesMap: {
    REPOSITORIES_DESC: {
      description: 'Order by repositories count in descending direction.',
    },
  },
});
