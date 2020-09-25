import type { GraphQLError } from 'graphql';
import type { ErrorResponse } from 'apollo-link-error';
import type { ServerError, ServerParseError } from 'apollo-link-http-common';
import type { TApolloContext } from '../utils/apollo-context';

import { onError } from 'apollo-link-error';
import {
  STATUS_CODES,
  LOGOUT_REASONS,
} from '@commercetools-frontend/constants';
import history from '@commercetools-frontend/browser-history';
import { forwardTokenRetryHeader, getSkipTokenRetry } from './utils';

const isHttpError = (
  error: ErrorResponse['networkError']
): error is ServerError | ServerParseError =>
  (error as ServerError).statusCode !== undefined ||
  (error as ServerParseError).statusCode !== undefined;

const isGraphQLError = (
  error: ErrorResponse['graphQLErrors']
): error is GraphQLError[] =>
  Array.isArray(error) &&
  error.some((err) => (err as GraphQLError).extensions !== undefined);

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

    // In case of graphql errors, we wfant to retry unauthenticated requests by
    // forcing our API to fetch a new token, using the `X-Force-Token` header.
    // https://www.apollographql.com/docs/link/links/error/#retrying-failed-requests
    // We need to do this as the `token-retry-link` only works for network errors.
    // https://www.apollographql.com/docs/link/links/retry/
    if (graphQLErrors && isGraphQLError(graphQLErrors)) {
      const context = operation.getContext() as TApolloContext;

      for (const err of graphQLErrors) {
        if (
          err?.extensions?.code === 'UNAUTHENTICATED' &&
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
