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
          try {
            mainQueue.add('collect');
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
