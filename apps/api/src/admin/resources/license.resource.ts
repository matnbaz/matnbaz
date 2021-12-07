import { Resource } from './resource-type';

export const licenseResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.License,
    client: prisma,
  },
  options: {},
});
