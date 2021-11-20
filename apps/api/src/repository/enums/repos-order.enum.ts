import { registerEnumType } from '@nestjs/graphql';

export enum ReposOrder {
  CREATED_ASC = 'CREATED_ASC',
  CREATED_DESC = 'CREATED_DESC',
  PUSHED_ASC = 'PUSHED_ASC',
  PUSHED_DESC = 'PUSHED_DESC',
  STARS_DESC = 'STARS_DESC',
}

registerEnumType(ReposOrder, {
  name: 'ReposOrder',
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
  },
});
