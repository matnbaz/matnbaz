import { Resource } from './resource-type';

export const discoveryTermResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.DiscoveryTerm,
    client: prisma,
  },
  options: {},
});
