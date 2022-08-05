import { type NormalizedCacheObject, ApolloClient } from '@apollo/client';

// Keep an in-memory reference to the apollo client that would be initialized
// by the application. This is useful to retrieve on runtime the reference
// to the apollo client in other static modules.
let cachedApolloClient: ApolloClient<NormalizedCacheObject>;
const setCachedApolloClient = (
  apolloClient: ApolloClient<NormalizedCacheObject>
): void => {
  cachedApolloClient = apolloClient;
};
const getCachedApolloClient = ():
  | ApolloClient<NormalizedCacheObject>
  | undefined => cachedApolloClient;

export { setCachedApolloClient, getCachedApolloClient };
