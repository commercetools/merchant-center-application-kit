import ApolloClient from 'apollo-client';
import { version as apolloVersion } from 'apollo-client/version';
import { ApolloLink } from 'apollo-link';
import apolloLogger from 'apollo-link-logger';
import { createHttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  IdGetterObj,
} from 'apollo-cache-inmemory';
import { ApplicationWindow } from '@commercetools-frontend/constants';
import createHttpUserAgent from '@commercetools/http-user-agent';
import { errorLink, headerLink, tokenRetryLink } from './apollo-links';
import { getMcApiUrl } from './utils';
import { isLoggerEnabled } from './utils/logger';
import version from './version';

declare let window: ApplicationWindow;

type CustomIdGetterObj = IdGetterObj & {
  key?: string;
};

const userAgent = createHttpUserAgent({
  name: 'apollo-client',
  version: apolloVersion,
  libraryName: [window.app.applicationName, 'application-shell'].join('/'),
  libraryVersion: version,
  contactUrl: 'https://git.io/fjuyC', // points to the appkit repo issues
  contactEmail: 'mc@commercetools.com',
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
const link = ApolloLink.from([
  headerLink,
  errorLink,
  // Avoid logging queries in test environment
  ...(isLoggerEnabled() ? [apolloLogger] : []),
  tokenRetryLink,
  httpLink,
]);

/**
 * Note:
 *
 * Apollo supports two types of fragment matchers at the time of this writing. One
 * for heuristic matching, another for introspection based matching.
 *
 * The heuristic matcher is the default and attempts to deduct the needed information
 * for efficiently caching entities from the query itself. It however warns as soon
 * as abtract types are used (union and interface). It recommends using the introspection
 * based matcher.
 *
 * The introspection based matcher takes the GraphQL schema as input to more accurately
 * be able to make assumption for caching when looking at a query. The schema is usally
 * queried at build time and injected into the matcher.
 * We can not provide it the schema for mainly two reasons:
 *
 * 1. The CTP schema needs auth and during build not valid auth token is present
 * 2. The schema is different per customer as parts of it are generated
 *
 * Another solution would be to extend the introspection matcher and inject the schema
 * at runtime of the application. However, when passing empty types to the matcher
 * we currently do not loose any of the abilities we use it provides as it only disables
 * caching for union and interface types (https://github.com/apollographql/apollo-client/blob/0166da079da4a9f88eecc7c976ac9d34225f5bf8/packages/apollo-cache-inmemory/src/fragmentMatcher.ts#L150).
 * The InMemoryCache itself uses the matcher to determine if caching is intended (https://github.com/apollographql/apollo-client/blob/0166da079da4a9f88eecc7c976ac9d34225f5bf8/packages/apollo-cache-inmemory/src/writeToStore.ts#L242-L266).
 */
const introspectionQueryResultData = {
  __schema: {
    types: [],
  },
};
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

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
      fragmentMatcher,
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
