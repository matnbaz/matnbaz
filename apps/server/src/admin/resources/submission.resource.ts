import { NotFoundError, ValidationError } from 'adminjs';
import { Resource } from './resource-type';

export const submissionResource: Resource = ({
  dmmf,
  prisma,
  githubQueue,
}) => ({
  resource: {
    model: dmmf.modelMap.Submission,
    client: prisma,
  },
  options: {
    actions: {
      add: {
        name: 'add',
        isVisible: true,
        actionType: 'record',
        icon: 'Add',
        component: false,
        variant: 'success',
        handler: async (request, response, data) => {
          const { record, resource, currentAdmin, h } = data;
          if (!request.params.recordId || !record) {
            throw new NotFoundError(
              ['You have to pass "recordId" to add owner'].join('\n'),
              'Action#handler'
            );
          }
          try {
            const submission = await prisma.submission.findUnique({
              where: { id: request.params.recordId },
            });
            if (submission) {
              githubQueue.add('add-owner', { username: submission.username });
              await resource.delete(request.params.recordId);
            }
          } catch (error) {
            if (error instanceof ValidationError && error.baseError) {
              return {
                record: record.toJSON(currentAdmin),
                notice: {
                  message: error.baseError.message,
                  type: 'error',
                },
              };
            }
            throw error;
          }
          return {
            record: record.toJSON(currentAdmin),
            redirectUrl: h.resourceUrl({
              resourceId: resource._decorated?.id() || resource.id(),
            }),
            notice: {
              message: 'Successfully added the job to queue.',
              type: 'success',
            },
          };
        },
      },
    },
  },
});
