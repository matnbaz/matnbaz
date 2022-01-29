import { registerEnumType } from '@nestjs/graphql';

export enum OwnerOrder {
  CONTRIBUTIONS_DESC = 'CONTRIBUTIONS_DESC',
  FOLLOWERS_DESC = 'FOLLOWERS_DESC',
  REPOSITORIES_COUNT_DESC = 'REPOSITORIES_COUNT_DESC',
}

registerEnumType(OwnerOrder, {
  name: 'OwnerOrder',
  description: 'You can order repositories with one of these options.',
  valuesMap: {
    CONTRIBUTIONS_DESC: {
      description: 'Order by contributions count in descending order.',
    },
    FOLLOWERS_DESC: {
      description: 'Order by followers count in descending order.',
    },
    REPOSITORIES_COUNT_DESC: {
      description: 'Order by repos count in descending order.',
    },
  },
});
