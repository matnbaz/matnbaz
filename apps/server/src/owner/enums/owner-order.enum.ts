import { registerEnumType } from '@nestjs/graphql';

export enum OwnerOrder {
  CONTRIBUTIONS_DESC = 'CONTRIBUTIONS_DESC',
  PUBLIC_CONTRIBUTIONS_DESC = 'PUBLIC_CONTRIBUTIONS_DESC',
  FOLLOWERS_DESC = 'FOLLOWERS_DESC',
}

registerEnumType(OwnerOrder, {
  name: 'OwnerOrder',
  description: 'You can order repositories with one of these options.',
  valuesMap: {
    CONTRIBUTIONS_DESC: {
      description: 'Order by contributions count in descending order.',
    },
    PUBLIC_CONTRIBUTIONS_DESC: {
      description: 'Order by public contributions count in descending order.',
    },
    FOLLOWERS_DESC: {
      description: 'Order by followers count in descending order.',
    },
  },
});
