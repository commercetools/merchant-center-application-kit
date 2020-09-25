import type { TTokenRetryGraphQlTarget } from '@commercetools-frontend/constants';
import type { TApolloContext } from '../utils/apollo-context';

import { RetryLink } from 'apollo-link-retry';
import {
  STATUS_CODES,
  GRAPHQL_TARGETS,
  MC_API_SUPPORTED_HEADERS,
} from '@commercetools-frontend/constants';

// This link retries requests to the CTP API that have been rejected
// because of an invalid/expired oauth token.
// To do so, we resend the request with the header "X-Force-Token: true"
// so that the MC BE can issue a new token.
// NOTE: the retry is not meant to work for the MC access token.

export const getDoesGraphQLTargetSupportTokenRetry = (
  context: TApolloContext
): boolean => {
  const target = (context.headers?.[MC_API_SUPPORTED_HEADERS.GRAPHQL_TARGET] ||
    context.headers?.[
      MC_API_SUPPORTED_HEADERS.GRAPHQL_TARGET.toLowerCase()
    ]) as TTokenRetryGraphQlTarget;

  return [
    GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    GRAPHQL_TARGETS.ADMINISTRATION_SERVICE,
    GRAPHQL_TARGETS.SETTINGS_SERVICE,
    GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
  ].includes(target);
};
export const getSkipTokenRetry = (context: TApolloContext): boolean => {
  const skipTokenRetry = Boolean(context.skipTokenRetry);

  return skipTokenRetry;
};

const forwardTokenRetryHeader = (
  headers: TApolloContext['headers']
): TApolloContext['headers'] => ({
  ...headers,
  [MC_API_SUPPORTED_HEADERS.TOKEN_RETRY]: 'true',
});

const tokenRetryLink = new RetryLink({
  attempts: (count, operation, error) => {
    const context = operation.getContext() as TApolloContext;

    if (
      error?.statusCode === STATUS_CODES.UNAUTHORIZED &&
      count === 1 &&
      getDoesGraphQLTargetSupportTokenRetry(context) &&
      !getSkipTokenRetry(context)
    ) {
      operation.setContext(({ headers }: TApolloContext) => ({
        headers: forwardTokenRetryHeader(headers),
      }));

      return true;
    }

    return false;
  },
});

export default tokenRetryLink;
