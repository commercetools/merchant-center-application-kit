import type {
  ApplicationWindow,
  TGraphQLTargets,
} from '@commercetools-frontend/constants';
import { ApolloLink } from '@apollo/client';
import omitEmpty from 'omit-empty-es';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type { TApolloContext, THeaders } from '../utils/apollo-context';
import { SUPPORTED_HEADERS } from '../constants';
import {
  getCorrelationId,
  selectProjectKeyFromUrl,
  selectTeamIdFromLocalStorage,
  selectUserId,
} from '../utils';
import * as oidcStorage from '../utils/oidc-storage';

declare let window: ApplicationWindow;

type ApolloContextAfterResponse = TApolloContext & {
  response?: Response;
  restResponses?: Response[];
};
type QueryVariables = {
  /**
   * @deprecated: Use `{ context: { target } }`
   */
  target?: TGraphQLTargets;
  /**
   * @deprecated: Use `{ context: { projectKey } }`
   */
  projectKey?: string;
  /**
   * @deprecated: Use `{ context: { teamId } }`
   */
  teamId?: string;
  /**
   * @deprecated: Use `{ context: { featureFlag } }`
   */
  featureFlag?: string;
};

const isKnownGraphQlTarget = (target?: TGraphQLTargets) =>
  target ? Object.values(GRAPHQL_TARGETS).includes(target) : false;

const getAppliedForwardToHeaders = (
  apolloContext: TApolloContext
): THeaders => {
  if (apolloContext.forwardToConfig) {
    return {
      ...Object.entries(apolloContext.forwardToConfig.headers ?? {}).reduce(
        (customForwardHeaders, [headerName, headerValue]) => ({
          ...customForwardHeaders,
          // Prefix headers so that the MC API can allow and forward them.
          [`x-forward-header-${headerName}`]: headerValue,
        }),
        {}
      ),
      [SUPPORTED_HEADERS.ACCEPT_VERSION]: apolloContext.forwardToConfig.version,
      [SUPPORTED_HEADERS.X_FORWARD_TO]: apolloContext.forwardToConfig.uri,
      [SUPPORTED_HEADERS.X_FORWARD_TO_AUDIENCE_POLICY]:
        apolloContext.forwardToConfig.audiencePolicy,
    };
  }

  return {};
};

const extractSessionTokenFromResponse = (
  context: ApolloContextAfterResponse
): string | null => {
  const refreshedSessionToken = context.response?.headers?.get(
    'x-refreshed-session-token'
  );
  if (refreshedSessionToken) {
    return refreshedSessionToken ?? null;
  }

  const restResponseWithRefreshTokenHeader = context.restResponses?.find(
    (response) => response.headers?.has('x-refreshed-session-token')
  );
  if (restResponseWithRefreshTokenHeader) {
    return (
      restResponseWithRefreshTokenHeader.headers.get(
        'x-refreshed-session-token'
      ) ?? null
    );
  }

  return null;
};

/* eslint-disable import/prefer-default-export */
// Use a middleware to update the request headers with the correct params.
const headerLink = new ApolloLink((operation, forward) => {
  const apolloContext = operation.getContext() as TApolloContext;

  const variables = operation.variables as QueryVariables;

  const graphQlTarget = apolloContext.target || variables.target;
  if (
    !apolloContext.skipGraphQlTargetCheck &&
    !isKnownGraphQlTarget(graphQlTarget)
  )
    throw new Error(
      `GraphQL target "${graphQlTarget}" is missing (or is not supported) in operation "${operation.operationName}"`
    );

  /**
   * NOTE:
   *   The project key is read from the url in a project related application context.
   *   This holds for most applications like `application-categories`, `application-discounts` etc.
   *   However, the `application-account` does not run with the project key being part of the url.
   *   As a result we allow passing the project key as a variable on the operation allowing
   *   it to be the fallback.
   */
  const projectKey =
    apolloContext.projectKey ||
    variables.projectKey ||
    selectProjectKeyFromUrl();
  const teamId =
    apolloContext.teamId || variables.teamId || selectTeamIdFromLocalStorage();
  const userId = selectUserId();
  const featureFlag = apolloContext.featureFlag || variables.featureFlag;
  const sessionToken = oidcStorage.getSessionToken();

  operation.setContext({
    credentials: 'include',
    headers: omitEmpty<THeaders>({
      // Other headers that are allowed in the CORS rules of the MC API.
      ...apolloContext.headers,
      // Required headers
      [SUPPORTED_HEADERS.AUTHORIZATION]: sessionToken
        ? `Bearer ${sessionToken}`
        : undefined,
      [SUPPORTED_HEADERS.X_PROJECT_KEY]: projectKey,
      [SUPPORTED_HEADERS.X_CORRELATION_ID]: getCorrelationId({ userId }),
      [SUPPORTED_HEADERS.X_GRAPHQL_TARGET]: graphQlTarget,
      // For logging/debugging purposes
      [SUPPORTED_HEADERS.X_GRAPHQL_OPERATION_NAME]: operation.operationName,
      // Experimental features, use with caution.
      [SUPPORTED_HEADERS.X_TEAM_ID]: teamId,
      [SUPPORTED_HEADERS.X_APPLICATION_ID]: window.app.applicationId,
      [SUPPORTED_HEADERS.X_FEATURE_FLAG]: featureFlag,
      // Additional headers for the forward-to feature.
      ...getAppliedForwardToHeaders(apolloContext),
    }),
  });
  return forward(operation).map((response) => {
    const context = operation.getContext() as ApolloContextAfterResponse;

    const refreshedSessionToken = extractSessionTokenFromResponse(context);

    if (refreshedSessionToken) {
      oidcStorage.setActiveSession(refreshedSessionToken);
    }

    return response;
  });
});

export default headerLink;
