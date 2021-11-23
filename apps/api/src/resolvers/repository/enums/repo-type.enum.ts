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
      description: 'Only returns the archived repositories.',
    },
    TEMPLATE: {
      description: 'Only returns the template repositories.',
    },
  },
});
