import { Resource } from './resource-type';

export const collectResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.Collect,
    client: prisma,
  },
  options: {
    // TODO: Blacklisting action
  },
});
