import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

export function createApolloClient() {
  return new ApolloClient({
    uri:
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      'http://localhost:3333/graphql',
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: relayStylePagination(),
            repositories: relayStylePagination(),
            owners: relayStylePagination(),
          },
        },
        PostTag: {
          fields: {
            posts: relayStylePagination(),
          },
        },
        Collection: {
          fields: {
            collects: relayStylePagination(),
          },
        },
        // can't do it for Owner since it's now an interface. gotta do one for each model that implements Owner.
        OwnerUser: {
          fields: {
            repositories: relayStylePagination(),
          },
        },
        OwnerOrganization: {
          fields: {
            repositories: relayStylePagination(),
          },
        },
      },
    }),
  });
}
