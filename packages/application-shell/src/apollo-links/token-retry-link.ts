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

export const getDoesGraphQLTargetSupportTokenRetry = (
  requestHeaders: ApolloContext['headers']
) => {
  const target = (requestHeaders['X-Graphql-Target'] ||
    requestHeaders['x-graphql-target']) as TokenRetryGraphQlTarget;
  return [
    GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    GRAPHQL_TARGETS.ADMINISTRATION_SERVICE,
  ].includes(target);
};

const tokenRetryLink = new RetryLink({
  attempts: (count, operation, error) => {
    const { headers: requestHeaders } = operation.getContext() as ApolloContext;
    if (
      error &&
      error.statusCode &&
      error.statusCode === STATUS_CODES.UNAUTHORIZED &&
      getDoesGraphQLTargetSupportTokenRetry(requestHeaders) &&
      count === 1
    ) {
      operation.setContext(({ headers }: ApolloContext) => ({
        headers: {
          ...headers,
          'X-Force-Token': true,
        },
      }));

      return true;
    }

    return false;
  },
});

export default tokenRetryLink;
