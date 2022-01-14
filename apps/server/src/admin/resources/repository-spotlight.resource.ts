import { Resource } from './resource-type';

export const repositorySpotlightResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.RepositorySpotlight,
    client: prisma,
  },
  options: {},
});
