import { registerEnumType } from '@nestjs/graphql';

export enum OwnerType {
  User = 'User',
  Organization = 'Organization',
}

registerEnumType(OwnerType, {
  name: 'OwnerType',
  description: 'A repository owner could any of these types.',
  valuesMap: {
    Organization: {
      description: 'Owner is an organization.',
    },
    User: {
      description: 'Owner is a user.',
    },
  },
});
