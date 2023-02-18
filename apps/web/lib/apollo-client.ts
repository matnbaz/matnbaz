import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const isSsr = typeof window === "undefined";
const uri = isSsr
  ? process.env.SSR_GRAPHQL_ENDPOINT ?? process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
  : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export function createApolloClient() {
  return new ApolloClient({
    uri: uri ?? "http://localhost:3001/graphql",
    ssrMode: isSsr,
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
