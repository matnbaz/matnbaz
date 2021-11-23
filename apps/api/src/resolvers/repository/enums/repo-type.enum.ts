import { registerEnumType } from '@nestjs/graphql';

export enum RepoType {
  ALL = 'ALL',
  ARCHIVE = 'ARCHIVE',
  TEMPLATE = 'TEMPLATE',
}

registerEnumType(RepoType, {
  name: 'RepoType',
  description: 'The repo type used in filters.',
  valuesMap: {
    ALL: {
      description: "Doesn't apply any filter to the query.",
    },
    ARCHIVE: {
      description: 'Only returns the archived repositoroes.',
    },
    TEMPLATE: {
      description: 'Only returns the template repositoroes.',
    },
  },
});
