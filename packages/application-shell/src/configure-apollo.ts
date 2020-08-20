import type { ApplicationWindow } from '@commercetools-frontend/constants';

import {
  ApolloClient,
  from,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
// import * as apolloVersion from '@apollo/client/version';
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

const userAgent = createHttpUserAgent({
  name: 'apollo-client',
  // version: apolloVersion.version,
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

export const createApolloClient = () =>
  new ApolloClient({
    link,
    // https://www.apollographql.com/docs/react/caching/cache-configuration/
    cache: new InMemoryCache({
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
        BaseMenu: {
          keyFields: ['key'],
        },
        // Legacy custom applications
        NavbarMenu: {
          keyFields: ['key'],
        },
      },
    }),
  });

export default createApolloClient();
