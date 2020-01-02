import { onError } from 'apollo-link-error';
import {
  STATUS_CODES,
  LOGOUT_REASONS,
} from '@commercetools-frontend/constants';
import history from '@commercetools-frontend/browser-history';

// Checks response from GraphQL in order to scan 401 errors and redirect the
// user to the login page resetting the store and showing the proper message
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (networkError && networkError.statusCode === STATUS_CODES.UNAUTHORIZED) {
      history.push(`/logout?reason=${LOGOUT_REASONS.UNAUTHORIZED}`);
    }
    // In case of graphql errors, we want to retry unauthenticated requests by
    // forcing our API to fetch a new token, using the `X-Force-Token` header.
    // https://www.apollographql.com/docs/link/links/error/#retrying-failed-requests
    // We need to do this as the `token-retry-link` only works for network errors.
    // https://www.apollographql.com/docs/link/links/retry/
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
          operation.setContext(({ headers }) => ({
            headers: {
              ...headers,
              'X-Force-Token': true,
            },
          }));
          // retry the request, returning the new observable
          return forward(operation);
        }
      }
    }
  }
);

export default errorLink;
