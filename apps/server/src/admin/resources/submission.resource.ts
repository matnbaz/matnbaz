import { NotFoundError, ValidationError } from 'adminjs';
import { GITHUB_PROCESSES } from '../../queue';
import { Resource } from './resource-type';

export const submissionResource: Resource = ({
  dmmf,
  prisma,
  queues: { github: githubQueue },
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
              githubQueue.add(GITHUB_PROCESSES.ADD_OWNER, {
                username: submission.username,
              });
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

      bulkAdd: {
        name: 'bulkAdd',
        isVisible: true,
        actionType: 'bulk',
        icon: 'Add',
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
            records.map(async (record) => {
              const submission = await prisma.submission.findUnique({
                where: { id: record.id() },
              });

              if (submission) {
                githubQueue.add(GITHUB_PROCESSES.ADD_OWNER, {
                  username: submission.username,
                });
                await resource.delete(record.id());
              }

              return record;
            })
          );

          return {
            records: records.map((record) =>
              record.toJSON(context.currentAdmin)
            ),
            notice: {
              message: `Successfully added ${records.length} actions to the queue.`,
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
