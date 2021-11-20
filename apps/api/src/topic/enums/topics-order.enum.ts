import { registerEnumType } from '@nestjs/graphql';

export enum TopicOrder {
  REPOSITORIES_DESC = 'REPOSITORIES_DESC',
}

registerEnumType(TopicOrder, {
  name: 'TopicOrder',
  description: 'You can order repositories with one of these options.',
  valuesMap: {
    REPOSITORIES_DESC: {
      description: 'Order by repositories count in descending direction.',
    },
  },
});
