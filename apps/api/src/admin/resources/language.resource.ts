import { Resource } from './resource-type';

export const languageResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.Language,
    client: prisma,
  },
  options: {},
});
