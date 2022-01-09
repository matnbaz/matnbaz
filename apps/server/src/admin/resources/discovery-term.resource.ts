import { GITHUB_PROCESSES } from '../../queue';
import { Resource } from './resource-type';

export const discoveryTermResource: Resource = ({
  dmmf,
  prisma,
  queues: { github: githubQueue },
}) => ({
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
            githubQueue.add(GITHUB_PROCESSES.DISCOVER_OWNERS_REPO_TERMS);
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
            await githubQueue.add(GITHUB_PROCESSES.EXTRACT_REPOS);
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
