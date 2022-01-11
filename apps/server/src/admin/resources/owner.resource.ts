import { NotFoundError, ValidationError } from 'adminjs';
import { GITHUB_PROCESSES } from '../../queue';
import { Resource } from './resource-type';

export const ownerResource: Resource = ({
  dmmf,
  prisma,
  queues: { github: githubQueue },
}) => ({
  resource: {
    model: dmmf.modelMap.Owner,
    client: prisma,
  },
  options: {
    actions: {
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
            await prisma.repository.updateMany({
              where: { Owner: { id: request.params.recordId } },
              data: { blockedAt: new Date() },
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
          for (const record of records) {
            await resource.update(record.id(), { blockedAt: new Date() });
            await prisma.repository.updateMany({
              where: { Owner: { id: record.id() } },
              data: { blockedAt: new Date() },
            });
          }

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

      'discover-all': {
        name: 'discover-all',
        isVisible: true,
        actionType: 'record',
        icon: 'Checkmark',
        component: false,
        variant: 'success',
        handler: async (request, response, data) => {
          try {
            await githubQueue.add(GITHUB_PROCESSES.DISCOVER);
          } catch (error) {
            console.error(error);
          }
          return {
            notice: {
              message: 'Added to the queue.',
              type: 'success',
            },
          };
        },
      },

      'extract-all': {
        name: 'extract-all',
        isVisible: true,
        actionType: 'record',
        icon: 'Checkmark',
        component: false,
        variant: 'success',
        handler: async (request, response, data) => {
          try {
            await githubQueue.add(GITHUB_PROCESSES.EXTRACT);
          } catch (error) {
            console.error(error);
          }
          return {
            notice: {
              message: 'Added to the queue.',
              type: 'success',
            },
          };
        },
      },
    },
  },
});
