import {
  type NormalizedCacheObject,
  type InMemoryCacheConfig,
  type FieldMergeFunction,
  type Reference,
  ApolloClient,
  from,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
import {
  errorLink,
  headerLink,
  tokenRetryLink,
  loggerLink,
} from './apollo-links';
import { mockResolvers } from './apollo-mock-resolvers';
import { getMcApiUrl } from './utils';
import { isLoggerEnabled } from './utils/logger';

type TApolloClientOptions = {
  cache?: InMemoryCacheConfig;
  restLink?: ApolloLink;
};

const httpLink = createHttpLink({
  uri: `${getMcApiUrl()}/graphql`,
  fetch,
});

const createApolloLink = (options: TApolloClientOptions = {}) =>
  // The order of links is IMPORTANT!
  // In the request-phase they are executed top to bottom.
  // In the response/phase they are executed bottom to top.
  // The `httpLink` is terminating so it must be last, while `tokenRetryLink` and `errorLink`
  // wrap the links the their right.
  from([
    headerLink,
    // See https://www.apollographql.com/docs/react/api/link/apollo-link-rest/#link-order
    // State & context links should happen before (to the left of) `restLink`.
    ...(options.restLink ? [options.restLink] : []),
    // Must be before `tokenRetryLink`.
    errorLink,
    // Avoid logging queries in test environment
    ...(isLoggerEnabled() ? [loggerLink] : []),
    // Must be after `errorLink`.
    tokenRetryLink,
    // Must be last.
    httpLink,
  ]);

// This custom merge function allows to merge two arrays of objects.
// The incoming list is what we need to update to, but we still need
// to ensure that existing cache elements are not removed but updated.
// This is usually the case when elements get removed.
const mergeArraysObjects: FieldMergeFunction = (
  existing: Reference[] = [],
  incoming: Reference[],
  { mergeObjects }
) => {
  return incoming.reduce<Reference[]>((mergedElements, elem) => {
    const existingElem = existing.find((el) => el.__ref === elem.__ref);
    if (existingElem) {
      const updatedElem = mergeObjects<Reference>(existingElem, elem);
      if (updatedElem) {
        return [...mergedElements, updatedElem];
      }
    }
    return [...mergedElements, elem];
  }, []);
};

const createApolloClient = (
  options: TApolloClientOptions = {}
): ApolloClient<NormalizedCacheObject> => {
  const customCacheConfig = options?.cache ?? {};
  return new ApolloClient({
    link: createApolloLink(options),
    // TODO: Temporary while developing the custom views feature since we don't have backend data yet
    resolvers: mockResolvers,
    // https://www.apollographql.com/docs/react/caching/cache-configuration/
    cache: new InMemoryCache({
      ...customCacheConfig,
      // https://www.apollographql.com/docs/react/caching/cache-configuration/#generating-unique-identifiers
      typePolicies: {
        // CTP types with `key` as identifier
        Project: {
          keyFields: ['key'],
        },
        Store: {
          keyFields: ['key'],
        },
        // Internal apps menu links representations
        ApplicationsMenu: {
          fields: {
            appBar: {
              merge: mergeArraysObjects,
            },
            navBar: {
              merge: mergeArraysObjects,
            },
          },
        },
        ...(customCacheConfig.typePolicies ?? {}),
      },
    }),
  });
};

export default createApolloClient;
