import { ApolloLink } from '@apollo/client';
import createHttpUserAgent from '@commercetools/http-user-agent';
import omitEmpty from 'omit-empty-es';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type {
  ApplicationWindow,
  TGraphQLTargets,
} from '@commercetools-frontend/constants';
import { SUPPORTED_HEADERS } from '../constants';
import {
  selectProjectKeyFromUrl,
  selectTeamIdFromLocalStorage,
} from '../utils';
import type { TApolloContext } from '../utils/apollo-context';
import { createHttpClientOptions, type THeaders } from '../utils/http-client';
import * as oidcStorage from '../utils/oidc-storage';
import version from '../version';

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

const userAgent = createHttpUserAgent({
  name: 'apollo-client',
  // version: apolloVersion,
  libraryName: [window.app.applicationName, 'application-shell'].join('/'),
  libraryVersion: version,
  contactUrl: 'https://git.io/fjuyC', // points to the appkit repo issues
  contactEmail: 'support@commercetools.com',
});

const isKnownGraphQlTarget = (target?: TGraphQLTargets) =>
  target ? Object.values(GRAPHQL_TARGETS).includes(target) : false;

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
  const featureFlag = apolloContext.featureFlag || variables.featureFlag;

  operation.setContext(
    createHttpClientOptions({
      userAgent,
      headers: omitEmpty<THeaders>({
        // Other headers that are allowed in the CORS rules of the MC API.
        ...apolloContext.headers,
        // Required headers for GraphQL API.
        [SUPPORTED_HEADERS.X_GRAPHQL_TARGET]: graphQlTarget,
        // For logging/debugging purposes.
        [SUPPORTED_HEADERS.X_GRAPHQL_OPERATION_NAME]: operation.operationName,
        // Experimental features, use with caution.
        [SUPPORTED_HEADERS.X_TEAM_ID]: teamId,
        [SUPPORTED_HEADERS.X_FEATURE_FLAG]: featureFlag,
      }),
      forwardToConfig: apolloContext.forwardToConfig,
      projectKey,
    })
  );
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
