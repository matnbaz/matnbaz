import { NotFoundError, ValidationError } from 'adminjs';
import { MAIN_PROCESSES } from '../../queue';
import { Resource } from './resource-type';

export const repositoryResource: Resource = ({
  dmmf,
  prisma,
  queues: { main: mainQueue, github: githubQueue },
}) => ({
  resource: {
    model: dmmf.modelMap.Repository,
    client: prisma,
  },
  options: {
    actions: {
      selection: {
        name: 'selection',
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
            await mainQueue.add(MAIN_PROCESSES.ADD_SPOTLIGHT, {
              repos: [request.params.recordId],
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
              message: 'Successfully added to selection job.',
              type: 'success',
            },
          };
        },
      },

      bulkSelection: {
        name: 'bulkSelection',
        isVisible: true,
        actionType: 'bulk',
        icon: 'Checkmark',
        showInDrawer: true,
        component: false,
        variant: 'success',
        handler: async (request, response, context) => {
          const { records, resource, h } = context;
          if (!records || !records.length) {
            throw new NotFoundError(
              'no records were selected.',
              'Action#handler'
            );
          }

          await mainQueue.add(MAIN_PROCESSES.ADD_SPOTLIGHT, {
            repos: records.map((rec) => rec.id()),
          });

          return {
            records: records.map((record) =>
              record.toJSON(context.currentAdmin)
            ),
            notice: {
              message: `Successfully added ${records.length} records to selection job.`,
              type: 'success',
            },
            redirectUrl: h.resourceUrl({
              resourceId: resource._decorated?.id() || resource.id(),
            }),
          };
        },
      },

      block: {
        name: 'block',
        isVisible: true,
        actionType: 'record',
        icon: 'Error',
        component: false,
        variant: 'danger',
        handler: async (request, response, data) => {
          const { record, resource, currentAdmin, h } = data;
          if (!request.params.recordId || !record) {
            throw new NotFoundError(
              ['You have to pass "recordId" to Block Action'].join('\n'),
              'Action#handler'
            );
          }
          try {
            await resource.update(request.params.recordId, {
              blockedAt: new Date(),
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
              message: 'Successfully blocked.',
              type: 'success',
            },
          };
        },
      },

      unblock: {
        name: 'unblock',
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
              blockedAt: null,
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
              message: 'Successfully unblocked.',
              type: 'success',
            },
          };
        },
      },

      bulkBlock: {
        name: 'bulkBlock',
        isVisible: true,
        actionType: 'bulk',
        icon: 'Error',
        showInDrawer: true,
        component: false,
        variant: 'danger',
        handler: async (request, response, context) => {
          const { records, resource, h } = context;
          if (!records || !records.length) {
            throw new NotFoundError(
              'no records were selected.',
              'Action#handler'
            );
          }
          await Promise.all(
            records.map((record) =>
              resource.update(record.id(), { blockedAt: new Date() })
            )
          );
          return {
            records: records.map((record) =>
              record.toJSON(context.currentAdmin)
            ),
            notice: {
              message: `Successfully blocked ${records.length} records.`,
              type: 'success',
            },
            redirectUrl: h.resourceUrl({
              resourceId: resource._decorated?.id() || resource.id(),
            }),
          };
        },
      },

      bulkUnblock: {
        name: 'bulkUnblock',
        isVisible: true,
        actionType: 'bulk',
        icon: 'Checkmark',
        showInDrawer: true,
        component: false,
        variant: 'success',
        handler: async (request, response, context) => {
          const { records, resource, h } = context;
          if (!records || !records.length) {
            throw new NotFoundError(
              'no records were selected.',
              'Action#handler'
            );
          }

          await Promise.all(
            records.map((record) =>
              resource.update(record.id(), { blockedAt: null })
            )
          );
          return {
            records: records.map((record) =>
              record.toJSON(context.currentAdmin)
            ),
            notice: {
              message: `Successfully unblocked ${records.length} records.`,
              type: 'success',
            },
            redirectUrl: h.resourceUrl({
              resourceId: resource._decorated?.id() || resource.id(),
            }),
          };
        },
      },
    },
  },
});
