import { registerEnumType } from '@nestjs/graphql';

export enum OwnerOrder {
  CONTRIBUTIONS_DESC = 'CONTRIBUTIONS_DESC',
  PUBLIC_CONTRIBUTIONS_DESC = 'PUBLIC_CONTRIBUTIONS_DESC',
  FOLLOWERS_DESC = 'FOLLOWERS_DESC',
  PULL_REQUESTS_COUNT_DESC = 'PULL_REQUESTS_COUNT_DESC',
  OPEN_ISSUES_COUNT_DESC = 'OPEN_ISSUES_COUNT_DESC',
  CLOSED_ISSUES_COUNT_DESC = 'CLOSED_ISSUES_COUNT_DESC',
  REPOSITORIES_CONTRIBUTED_TO_COUNT_DESC = 'REPOSITORIES_CONTRIBUTED_TO_COUNT_DESC',
  REPOSITORIES_COUNT_DESC = 'REPOSITORIES_COUNT_DESC',
  TOTAL_STARS_COUNT_DESC = 'TOTAL_STARS_COUNT_DESC',
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
    TOTAL_STARS_COUNT_DESC: {
      description:
        'Order by the total number of received stars in descending order.',
    },
    REPOSITORIES_COUNT_DESC: {
      description: 'Order by the number of repos count in descending order.',
    },
    PULL_REQUESTS_COUNT_DESC: {
      description:
        'Order by the number of pull requests in descending order. (applicable only for users)',
    },
    OPEN_ISSUES_COUNT_DESC: {
      description:
        'Order by the number of open issues in descending order. (applicable only for users)',
    },
    CLOSED_ISSUES_COUNT_DESC: {
      description:
        'Order by the number of closed issues in descending order. (applicable only for users)',
    },
    REPOSITORIES_CONTRIBUTED_TO_COUNT_DESC: {
      description:
        'Order by the number of repos the user contributed to in descending order. (applicable only for users)',
    },
  },
});
