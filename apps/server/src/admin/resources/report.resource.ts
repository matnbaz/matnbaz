import { Resource } from './resource-type';

export const reportResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.Report,
    client: prisma,
  },
  options: {},
});
