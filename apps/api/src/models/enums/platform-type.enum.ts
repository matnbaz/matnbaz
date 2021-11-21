import { registerEnumType } from '@nestjs/graphql';

export enum PlatformType {
  GitHub = 'GitHub',
  GitLab = 'GitLab',
  Bitbucket = 'Bitbucket',
}

registerEnumType(PlatformType, {
  name: 'PlatformType',
  description: 'A repository owner could any of these types.',
  valuesMap: {
    GitHub: {
      description: 'https://github.com',
    },
    GitLab: {
      description: 'https://gitlab.com',
    },
    Bitbucket: {
      description: 'https://bitbucket.com',
    },
  },
});
