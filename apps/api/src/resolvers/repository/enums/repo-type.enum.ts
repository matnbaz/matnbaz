import { registerEnumType } from '@nestjs/graphql';

export enum RepoType {
  ARCHIVE = 'ARCHIVE',
  TEMPLATE = 'TEMPLATE',
}

registerEnumType(RepoType, {
  name: 'RepoType',
  description: 'The repo type used in filters.',
  valuesMap: {
    ARCHIVE: {
      description: 'Only returns the archived repositoroes.',
    },
    TEMPLATE: {
      description: 'Only returns the template repositoroes.',
    },
  },
});
