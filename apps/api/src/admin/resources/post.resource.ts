import { NotFoundError, ValidationError } from 'adminjs';
import { MAIN_PROCESSES } from '../../queue';
import { Resource } from './resource-type';

export const postResource: Resource = ({
  dmmf,
  prisma,
  queues: { main: mainQueue },
}) => ({
  resource: {
    model: dmmf.modelMap.Post,
    client: prisma,
  },
  options: {
    properties: {
      content: { type: 'textarea' },
    },
    listProperties: ['title', 'slug', 'summary', 'publishedAt'],
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
            await mainQueue.add(MAIN_PROCESSES.PUBLISH_POST, {
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
              message: 'Successfully published.',
              type: 'success',
            },
          };
        },
      },

      parseReadme: {
        name: 'parseReadme',
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
            await mainQueue.add(MAIN_PROCESSES.PARSE_POST_README, {
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
              message: 'Job added to the queue.',
              type: 'success',
            },
          };
        },
      },
    },
  },
});
