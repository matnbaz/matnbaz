import { Resource } from './resource-type';

export const submissionResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.Submission,
    client: prisma,
  },
  options: {},
});
