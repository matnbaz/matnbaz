import { NotFoundError, ValidationError } from 'adminjs';
import { MAIN_PROCESSES } from '../../queue';
import { Resource } from './resource-type';

export const repositorySelectionResource: Resource = ({
  dmmf,
  prisma,
  queues: { main: mainQueue },
}) => ({
  resource: {
    model: dmmf.modelMap.RepositorySelection,
    client: prisma,
  },
  options: {
    actions: {
      feature: {
        name: 'feature',
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
            await mainQueue.add(MAIN_PROCESSES.FEATURE_SELECTION, {
              id: request.params.recordId,
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
              message: 'Successfully added to featuring job.',
              type: 'success',
            },
          };
        },
      },
    },
  },
});
