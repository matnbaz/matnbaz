import { Resource } from './resource-type';

export const userResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.User,
    client: prisma,
  },
  options: {},
});
