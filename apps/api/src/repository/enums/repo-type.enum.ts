import { registerEnumType } from '@nestjs/graphql';

export enum RepoType {
  ALL = 'ALL',
  SOURCE = 'SOURCE',
  FORK = 'FORK',
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
    FORK: {
      description: 'Only returns the forked repositoroes.',
    },
    SOURCE: {
      description: 'Only returns the source repositoroes.',
    },
    TEMPLATE: {
      description: 'Only returns the template repositoroes.',
    },
  },
});
