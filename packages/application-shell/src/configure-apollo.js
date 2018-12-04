import fetch from 'unfetch';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import apolloLogger from 'apollo-link-logger';
import { createHttpLink } from 'apollo-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { errorLink, headerLink, tokenRetryLink } from './apollo-links';

const httpLink = createHttpLink({
  uri: `${window.app.mcApiUrl}/graphql`,
  credentials: 'include',
  headers: {
    accept: 'application/json',
  },
  // manual polyfill for fetch to support older browsers like IE11
  // for some reason that I wasn't able to figure out just importing
  // isomorphic fetch didn't make Apollo use the global fetch :(
  // they recommend using unfetch and passing it explicitly like we are doing
  // here. https://www.apollographql.com/docs/link/links/http.html#fetch
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
  ...(process.env.NODE_ENV !== 'test' ? [apolloLogger] : []),
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

export const createApolloClient = () =>
  new ApolloClient({
    link,
    cache: new InMemoryCache({
      fragmentMatcher,
      dataIdFromObject: result => {
        if (result.__typename === 'Project') return result.key;
        // Generally all id's are unique accross the platform, so we don't need to
        // include the type name in the cache key.
        // However, a reference has the shape { typeId, id } where the id is the
        // id of the referenced entity. If we didn't prefix ids of References
        // they would clash with the referenced resource.
        if (result.__typename === 'Reference')
          return `${result.__typename}:${result.id}`;
        return result.id;
      },
    }),
  });

export default createApolloClient();
