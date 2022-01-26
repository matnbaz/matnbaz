import { NotFoundError, ValidationError } from 'adminjs';
import { Resource } from './resource-type';

export const postResource: Resource = ({ dmmf, prisma }) => ({
  resource: {
    model: dmmf.modelMap.Post,
    client: prisma,
  },
  options: {
    actions: {
      publish: {
        name: 'publish',
        isVisible: true,
        actionType: 'record',
        icon: 'Checkmark',
        component: false,
        variant: 'success',
        handler: async (request, response, data) => {
          const { record, resource, currentAdmin, h } = data;
          if (!request.params.recordId || !record) {
            throw new NotFoundError(
              ['You have to pass "recordId" to Unblock Action'].join('\n'),
              'Action#handler'
            );
          }
          try {
            await resource.update(request.params.recordId, {
              publishedAt: new Date(),
            });
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
              message: 'Successfully published.',
              type: 'success',
            },
          };
        },
      },
    },
  },
});
