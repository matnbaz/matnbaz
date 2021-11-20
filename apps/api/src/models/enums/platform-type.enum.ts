import { registerEnumType } from '@nestjs/graphql';

export enum PlatformType {
  GitHub = 'GitHub',
  GitLab = 'GitLab',
  BitBucket = 'BitBucket',
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
    BitBucket: {
      description: 'https://bitbucket.com',
    },
  },
});
