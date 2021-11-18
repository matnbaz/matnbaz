import { PlatformType } from '@prisma/client';
import { registerEnumType } from '@nestjs/graphql';

export const registerPlatformTypeEnum = () =>
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
