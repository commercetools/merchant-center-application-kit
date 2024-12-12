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
import { getMcApiUrl } from './utils';
import { isLoggerEnabled } from './utils/logger';

type TApolloClientOptions = {
  cache?: InMemoryCacheConfig;
  restLink?: ApolloLink;
};

// Inspired by https://www.apollographql.com/docs/react/api/link/apollo-link-http#dynamic-uri
const customFetch: WindowOrWorkerGlobalScope['fetch'] = (uri, options) => {
  const searchParams = new URLSearchParams();
  // We attempt to read the GraphQL `operationName` to append it as a query parameter.
  // This is only useful for debugging purposes (network tab) and does not have any functional implication.
  if (options?.body)
    try {
      const parsed = JSON.parse(options.body as string);
      searchParams.set('op', parsed.operationName);
    } catch {
      // noop
    }

  return fetch(
    searchParams.size > 0 ? `${uri}?${searchParams.toString()}` : uri,
    options
  );
};

const createApolloLink = (options: TApolloClientOptions = {}) => {
  const httpLink = createHttpLink({
    uri: `${getMcApiUrl()}/graphql`,
    fetch: customFetch,
  });

  // The order of links is IMPORTANT!
  // In the request-phase they are executed top to bottom.
  // In the response/phase they are executed bottom to top.
  // The `httpLink` is terminating so it must be last, while `tokenRetryLink` and `errorLink`
  // wrap the links the their right.
  return from([
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
};

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
    // https://www.apollographql.com/docs/react/caching/cache-configuration/
    cache: new InMemoryCache({
      ...customCacheConfig,
      // https://www.apollographql.com/docs/react/caching/cache-configuration/#generating-unique-identifiers
      typePolicies: {
        // CTP types with `key` as identifier
        Project: {
          keyFields: ['key'],
          fields: {
            expiry: {
              merge: (existing, incoming, { mergeObjects }) =>
                mergeObjects(existing, incoming),
            },
            suspension: {
              merge: (existing, incoming, { mergeObjects }) =>
                mergeObjects(existing, incoming),
            },
          },
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
            navBarGroups: {
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
