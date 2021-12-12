import { registerEnumType } from '@nestjs/graphql';

export enum TemplateStatusType {
  ALL = 'ALL',
  TEMPLATE = 'TEMPLATE',
  NOT_TEMPLATE = 'NOT_TEMPLATE',
}

registerEnumType(TemplateStatusType, {
  name: 'TemplateStatusType',
  description: 'The repo type used in filters.',
  valuesMap: {
    ALL: {
      description: "Doesn't apply any filter to the query.",
    },
    TEMPLATE: {
      description: 'Only returns the template repositories.',
    },
    NOT_TEMPLATE: {
      description: 'Only returns the non-template repositories.',
    },
  },
});
