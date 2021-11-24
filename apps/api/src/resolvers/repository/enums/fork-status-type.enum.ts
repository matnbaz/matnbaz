import { registerEnumType } from '@nestjs/graphql';

export enum ForkStatusType {
  ALL = 'ALL',
  SOURCE = 'SOURCE',
  FORK = 'FORK',
}

registerEnumType(ForkStatusType, {
  name: 'ForkStatusType',
  description: 'The repo type used in filters.',
  valuesMap: {
    ALL: {
      description: "Doesn't apply any filter to the query.",
    },
    FORK: {
      description: 'Only returns the forked repositories.',
    },
    SOURCE: {
      description: 'Only returns the source (not forked) repositories.',
    },
  },
});
