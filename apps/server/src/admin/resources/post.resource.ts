import { Resource } from './resource-type';

export const postResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.Post,
    client: prisma,
  },
  options: {
    // TODO: Extraction action
  },
});
