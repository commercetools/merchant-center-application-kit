import fetch from 'unfetch';
import createHistory from 'history/createBrowserHistory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import {
  LOGOUT_REASONS,
  STATUS_CODES,
  STORAGE_KEYS as CORE_STORAGE_KEYS,
} from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';

const history = createHistory();

const httpLink = createHttpLink({
  uri: `${window.app.protocol}://${window.app.host}/graphql`,
  // manual polyfill for fetch to support older browsers like IE11
  // for some reason that I wasn't able to figure out just importing
  // isomorphic fetch didn't make Apollo use the global fetch :(
  // they recommend using unfetch and passing it explicitly like we are doing
  // here. https://www.apollographql.com/docs/link/links/http.html#fetch
  fetch,
});
const isKnownTarget = target => ['mc', 'ctp', 'dashboard'].includes(target);
// Use a middleware to update the request headers with the correct params.
const headerMiddlewareLink = new ApolloLink((operation, forward) => {
  const target = operation.variables.target;
  if (!isKnownTarget)
    throw new Error(
      `GraphQL target "${target}" is missing or is not supported`
    );
  const token = storage.get(CORE_STORAGE_KEYS.TOKEN);
  const projectKey = storage.get(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
  // NOTE: keep header names with capital letters to avoid possible conflicts
  // or problems with nginx.
  operation.setContext({
    headers: {
      Accept: 'application/json',
      Authorization: token,
      'X-Project-Key': projectKey,
      'X-Graphql-Target': target,
    },
  });
  return forward(operation);
});

// Checks response from GraphQL in order to scan 401 errors and redirect the
// user to the login page reseting the store and showing the proper message
const errorLink = onError(({ networkError }) => {
  const token = storage.get(CORE_STORAGE_KEYS.TOKEN);
  if (
    networkError &&
    networkError.statusCode === STATUS_CODES.UNAUTHORIZED &&
    token
  )
    history.push(`/logout?reason=${LOGOUT_REASONS.UNAUTHORIZED}`);
});
const link = ApolloLink.from([headerMiddlewareLink, errorLink, httpLink]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id,
  }),
});

export default client;
