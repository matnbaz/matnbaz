import { Resource } from './resource-type';

export const discoveryTermResource: Resource = ({ dmmf, prisma, github }) => ({
  resource: {
    model: dmmf.modelMap.DiscoveryTerm,
    client: prisma,
  },
  options: {
    actions: {
      'discover-all': {
        name: 'discover-all',
        isVisible: true,
        actionType: 'record',
        icon: 'Checkmark',
        component: false,
        variant: 'success',
        handler: async (request, response, data) => {
          try {
            await github.discoverer.discover();
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
            await github.extractor.extract();
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
