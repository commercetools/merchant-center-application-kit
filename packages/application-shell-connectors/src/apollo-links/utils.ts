import type { ServerError, ServerParseError } from '@apollo/client';
import type { ErrorResponse } from '@apollo/client/link/error';
import type { GraphQLError } from 'graphql';
import {
  GRAPHQL_TARGETS,
  SUPPORTED_HEADERS,
} from '@commercetools-frontend/constants';
import type { TApolloContext } from '../utils/apollo-context';

type TTokenRetryGraphQlTarget =
  | typeof GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM
  | typeof GRAPHQL_TARGETS.SETTINGS_SERVICE
  | typeof GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND
  | typeof GRAPHQL_TARGETS.ADMINISTRATION_SERVICE;

const getSkipTokenRetry = (context: TApolloContext): boolean => {
  const skipTokenRetry = Boolean(context.skipTokenRetry);

  return skipTokenRetry;
};

const forwardTokenRetryHeader = (
  headers: TApolloContext['headers']
): TApolloContext['headers'] => ({
  ...headers,
  [SUPPORTED_HEADERS.X_TOKEN_RETRY]: 'true',
});

// This link retries requests to the CTP API that have been rejected
// because of an invalid/expired oauth token.
// To do so, we resend the request with the header "X-Force-Token: true"
// so that the MC BE can issue a new token.
// NOTE: the retry is not meant to work for the MC access token.
const getDoesGraphQLTargetSupportTokenRetry = (
  context: TApolloContext
): boolean => {
  const graphQLTarget = (context.headers?.[
    SUPPORTED_HEADERS.X_GRAPHQL_TARGET
  ] || context.headers?.[SUPPORTED_HEADERS.X_GRAPHQL_TARGET.toLowerCase()]) as
    | TTokenRetryGraphQlTarget
    | undefined;

  return Boolean(
    graphQLTarget &&
      [
        GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        GRAPHQL_TARGETS.ADMINISTRATION_SERVICE,
        GRAPHQL_TARGETS.SETTINGS_SERVICE,
        GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
      ].includes(graphQLTarget)
  );
};

const isHttpError = (
  error: ErrorResponse['networkError']
): error is ServerError | ServerParseError =>
  (error as ServerError).statusCode !== undefined ||
  (error as ServerParseError).statusCode !== undefined;

const isGraphQLError = (
  error: ErrorResponse['graphQLErrors']
): error is GraphQLError[] =>
  Array.isArray(error) &&
  error.some(
    (err) =>
      (err as GraphQLError).message !== undefined ||
      (err as GraphQLError).extensions !== undefined
  );

export {
  getSkipTokenRetry,
  forwardTokenRetryHeader,
  getDoesGraphQLTargetSupportTokenRetry,
  isHttpError,
  isGraphQLError,
};
