import { onError } from '@apollo/client/link/error';
import history from '@commercetools-frontend/browser-history';
import {
  STATUS_CODES,
  LOGOUT_REASONS,
} from '@commercetools-frontend/constants';
import type { TApolloContext } from '../utils/apollo-context';
import {
  forwardTokenRetryHeader,
  getDoesGraphQLTargetSupportTokenRetry,
  getSkipTokenRetry,
  isHttpError,
  isGraphQLError,
} from './utils';

// Checks response from GraphQL in order to scan 401 errors and redirect the
// user to the login page resetting the store and showing the proper message
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (
      networkError &&
      isHttpError(networkError) &&
      networkError.statusCode === STATUS_CODES.UNAUTHORIZED
    ) {
      history.push(`/logout?reason=${LOGOUT_REASONS.UNAUTHORIZED}`);
      return;
    }

    // In case of graphql errors, we want to retry unauthenticated requests by
    // forcing our API to fetch a new token, using the `X-Force-Token` header.
    // https://www.apollographql.com/docs/link/links/error/#retrying-failed-requests
    // We need to do this as the `token-retry-link` only works for network errors.
    // https://www.apollographql.com/docs/link/links/retry/
    if (graphQLErrors && isGraphQLError(graphQLErrors)) {
      const context = operation.getContext() as TApolloContext;

      for (const err of graphQLErrors) {
        const isNonAuthenticatedViaExtensionCode =
          err?.extensions?.code === 'UNAUTHENTICATED';
        /**
         * NOTE:
         *   Not not all GraphQL APIs expose an `extensions` field in
         *   each error. For those we have to use the `message`
         *   property until they introduced support for the `extensions`
         *   field.
         */
        const isNonAuthenticatedViaCode = err?.message === 'invalid_token';

        if (
          (isNonAuthenticatedViaExtensionCode || isNonAuthenticatedViaCode) &&
          getDoesGraphQLTargetSupportTokenRetry(context) &&
          !getSkipTokenRetry(context)
        ) {
          operation.setContext(({ headers }: TApolloContext) => ({
            headers: forwardTokenRetryHeader(headers),
          }));
          // retry the request, returning the new observable
          return forward(operation);
        }
      }
    }

    return;
  }
);

export default errorLink;
