import { registerEnumType } from '@nestjs/graphql';

export enum Calendar {
  Persian = 'Persian',
  Georgian = 'Georgian',
}

registerEnumType(Calendar, {
  name: 'Calendar',
  description: 'The calendar type.',
  valuesMap: {
    Persian: {
      description: 'Persian / Jalali calendar.',
    },
    Georgian: {
      description: 'Georgian calendar.',
    },
  },
});
