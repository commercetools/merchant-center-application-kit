import type { Operation } from 'apollo-link';

import { RetryLink } from 'apollo-link-retry';
import {
  STATUS_CODES,
  GRAPHQL_TARGETS,
} from '@commercetools-frontend/constants';

type TokenRetryGraphQlTarget =
  | typeof GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM
  | typeof GRAPHQL_TARGETS.ADMINISTRATION_SERVICE;

type ApolloContext = {
  headers: { [key: string]: string };
};

// This link retries requests to the CTP API that have been rejected
// because of an invalid/expired oauth token.
// To do so, we resend the request with the header "X-Force-Token: true"
// so that the MC BE can issue a new token.
// NOTE: the retry is not meant to work for the MC access token.

const TOKEN_RETRY_HEADER_NAME = 'X-Force-Token';

export const getDoesGraphQLTargetSupportTokenRetry = (
  requestHeaders: ApolloContext['headers']
): boolean => {
  const target = (requestHeaders['X-Graphql-Target'] ||
    requestHeaders['x-graphql-target']) as TokenRetryGraphQlTarget;

  return [
    GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    GRAPHQL_TARGETS.ADMINISTRATION_SERVICE,
    GRAPHQL_TARGETS.SETTINGS_SERVICE,
    GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
  ].includes(target);
};
export const getSkipTokenRetry = (
  variables: Operation['variables']
): boolean => {
  const skipTokenRetry = Boolean(variables.skipTokenRetry);

  return skipTokenRetry;
};

const forwardTokenRetryHeader = (
  headers: ApolloContext['headers']
): ApolloContext['headers'] => ({
  ...headers,
  [TOKEN_RETRY_HEADER_NAME]: 'true',
});

const tokenRetryLink = new RetryLink({
  attempts: (count, operation, error) => {
    const { headers: requestHeaders } = operation.getContext() as ApolloContext;

    if (
      error?.statusCode === STATUS_CODES.UNAUTHORIZED &&
      count === 1 &&
      getDoesGraphQLTargetSupportTokenRetry(requestHeaders) &&
      !getSkipTokenRetry(operation.variables)
    ) {
      operation.setContext(({ headers }: ApolloContext) => ({
        headers: forwardTokenRetryHeader(headers),
      }));

      return true;
    }

    return false;
  },
});

export default tokenRetryLink;
