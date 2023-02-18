import { MAIN_PROCESSES } from '../../queue';
import { Resource } from './resource-type';

export const collectionResource: Resource = ({
  dmmf,
  prisma,
  queues: { main: mainQueue },
}) => ({
  resource: {
    model: dmmf.modelMap.Collection,
    client: prisma,
  },
  options: {
    actions: {
      'collect-all': {
        name: 'collect-all',
        isVisible: true,
        actionType: 'record',
        icon: 'Checkmark',
        component: false,
        variant: 'success',
        handler: async (request, response, data) => {
          const { record, currentAdmin } = data;

          try {
            await mainQueue.add(MAIN_PROCESSES.COLLECT_COLLECTIONS);
          } catch (error) {
            console.error(error);
          }
          return {
            record: record.toJSON(currentAdmin),
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
