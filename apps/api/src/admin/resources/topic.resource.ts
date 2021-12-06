import { Resource } from './resource-type';

export const topicResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.Topic,
    client: prisma,
  },
  options: {},
});
