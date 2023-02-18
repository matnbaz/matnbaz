import { registerEnumType } from '@nestjs/graphql';

export enum ReportableType {
  Owner = 'Owner',
  Repository = 'Repository',
}

registerEnumType(ReportableType, {
  name: 'ReportableType',
  description: 'A reportable could any of these types.',
  valuesMap: {
    Owner: {
      description: 'Reportable is an owner.',
    },
    Repository: {
      description: 'Reportable is a repository.',
    },
  },
});
