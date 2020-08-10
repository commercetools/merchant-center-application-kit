import type { IdGetterObj } from '@apollo/client/cache';
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

type CustomIdGetterObj = IdGetterObj & {
  key?: string;
};

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

const typeNamesWithoutIdAsIdentifier = [
  'Project',
  'BaseMenu',
  'NavbarMenu',
  'Store',
];

const referenceTypes = ['Reference', 'ChannelReferenceIdentifier'];

export const createApolloClient = () =>
  new ApolloClient({
    link,
    cache: new InMemoryCache({
      // https://www.apollographql.com/docs/react/data/fragments/#defining-possibletypes-manually
      // possibleTypes: [],
      dataIdFromObject: (result) => {
        const customResult = result as CustomIdGetterObj;
        if (
          !customResult.id &&
          customResult.key &&
          customResult.__typename &&
          typeNamesWithoutIdAsIdentifier.includes(customResult.__typename)
        )
          return `${customResult.__typename}:${customResult.key}`;
        // Generally all id's are unique across the platform, so we don't need to
        // include the type name in the cache key.
        // However, a reference has the shape { typeId, id } where the id is the
        // id of the referenced entity. If we didn't prefix ids of References
        // they would clash with the referenced resource.
        if (
          customResult.__typename &&
          referenceTypes.includes(customResult.__typename)
        )
          return `${customResult.__typename}:${customResult.id}`;

        return customResult.id;
      },
    }),
  });

export default createApolloClient();
