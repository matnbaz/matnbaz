import { Resource } from './resource-type';

export const postTagResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.PostTag,
    client: prisma,
  },
  options: {},
});
