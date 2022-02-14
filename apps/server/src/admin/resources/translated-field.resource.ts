import { Resource } from './resource-type';

export const translatedFieldResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.TranslatedField,
    client: prisma,
  },
  options: {},
});
