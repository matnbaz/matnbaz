import { registerEnumType } from '@nestjs/graphql';

export enum RepoOrder {
  CREATED_ASC = 'CREATED_ASC',
  CREATED_DESC = 'CREATED_DESC',
  PUSHED_ASC = 'PUSHED_ASC',
  PUSHED_DESC = 'PUSHED_DESC',
  STARS_DESC = 'STARS_DESC',
  TRENDING_WEEKLY = 'TRENDING_WEEKLY',
  TRENDING_MONTHLY = 'TRENDING_MONTHLY',
  TRENDING_YEARLY = 'TRENDING_YEARLY',
}

registerEnumType(RepoOrder, {
  name: 'RepoOrder',
  description: 'You can order repositories with one of these options.',
  valuesMap: {
    CREATED_ASC: {
      description: 'Order by creation date in ascending direction.',
    },
    CREATED_DESC: {
      description: 'Order by creation date in descending direction.',
    },
    PUSHED_ASC: {
      description: "Order by last push's date in ascending direction.",
    },
    PUSHED_DESC: {
      description: "Order by last push's date in descending direction.",
    },
    STARS_DESC: {
      description: 'Order by most stars in descending direction.',
    },
    TRENDING_WEEKLY: {
      description: 'Order by trendy-ness in weekly scope.',
    },
    TRENDING_MONTHLY: {
      description: 'Order by trendy-ness in monthly scope.',
    },
    TRENDING_YEARLY: {
      description: 'Order by trendy-ness in yearly scope.',
    },
  },
});
