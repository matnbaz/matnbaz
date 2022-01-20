import { Resource } from './resource-type';

export const repositorySelectionResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.RepositorySelection,
    client: prisma,
  },
  options: {},
});
