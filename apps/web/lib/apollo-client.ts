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
            selections: relayStylePagination(),
            repositories: relayStylePagination(),
          },
        },
        Collection: {
          fields: {
            collects: relayStylePagination(),
          },
        },
        Owner: {
          fields: {
            repositories: relayStylePagination(),
          },
        },
      },
    }),
  });
}
