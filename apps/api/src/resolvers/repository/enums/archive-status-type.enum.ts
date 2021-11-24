import { registerEnumType } from '@nestjs/graphql';

export enum ArchiveStatusType {
  ALL = 'ALL',
  ARCHIVED = 'ARCHIVED',
  NOT_ARCHIVED = 'NOT_ARCHIVED',
}

registerEnumType(ArchiveStatusType, {
  name: 'ArchiveStatusType',
  description: 'The repo type used in filters.',
  valuesMap: {
    ALL: {
      description: "Doesn't apply any filter to the query.",
    },
    ARCHIVED: {
      description: 'Only returns the archived repositories.',
    },
    NOT_ARCHIVED: {
      description: 'Only returns the non-archived repositories.',
    },
  },
});
