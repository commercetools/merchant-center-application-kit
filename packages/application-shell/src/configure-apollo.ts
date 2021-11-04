import type {
  NormalizedCacheObject,
  InMemoryCacheConfig,
  FieldMergeFunction,
  Reference,
} from '@apollo/client';
import type { ApplicationWindow } from '@commercetools-frontend/constants';

import {
  ApolloClient,
  from,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
// import { version as apolloVersion } from '@apollo/client/version';
import createHttpUserAgent from '@commercetools/http-user-agent';
import {
  errorLink,
  headerLink,
  tokenRetryLink,
  loggerLink,
} from './apollo-links';
import { getMcApiUrl } from './utils';
import { isLoggerEnabled } from './utils/logger';
import version from './version';

declare let window: ApplicationWindow;

type TApolloClientOptions = {
  cache?: InMemoryCacheConfig;
};

const userAgent = createHttpUserAgent({
  name: 'apollo-client',
  // version: apolloVersion,
  libraryName: [window.app.applicationName, 'application-shell'].join('/'),
  libraryVersion: version,
  contactUrl: 'https://git.io/fjuyC', // points to the appkit repo issues
  contactEmail: 'support@commercetools.com',
});

const httpLink = createHttpLink({
  uri: `${getMcApiUrl()}/graphql`,
  headers: {
    accept: 'application/json',
    'x-user-agent': userAgent,
  },
  fetch,
});

// order of links is relevant here
// in the request-phase they are executed top to bottom
// in the response/phase they are executed bottom to top
// `tokenRetryLink` needs to stay after `errorLink` in order to be executed before `errorLink` for responses
const link = from([
  headerLink,
  errorLink,
  // Avoid logging queries in test environment
  ...(isLoggerEnabled() ? [loggerLink] : []),
  tokenRetryLink,
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
    link,
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
