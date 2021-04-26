import type { NormalizedCacheObject } from '@apollo/client';
import type {
  ApplicationWindow,
  TGraphQLTargets,
} from '@commercetools-frontend/constants';
import type { TApolloContext } from '../utils/apollo-context';

import { ApolloClient, ApolloLink } from '@apollo/client';
import omitEmpty from 'omit-empty-es';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { SUPPORTED_HEADERS } from '../constants';
import {
  getCorrelationId,
  selectProjectKeyFromUrl,
  selectTeamIdFromLocalStorage,
  selectUserId,
} from '../utils';
import * as oidcStorage from '../utils/oidc-storage';

declare let window: ApplicationWindow;

type ApolloContextWithInMemoryCache = TApolloContext & {
  cache: ApolloClient<NormalizedCacheObject>;
};
type Headers = Record<string, string>;
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

/* eslint-disable import/prefer-default-export */
// Use a middleware to update the request headers with the correct params.
const headerLink = new ApolloLink((operation, forward) => {
  const apolloContext = operation.getContext() as ApolloContextWithInMemoryCache;

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
   *   The project key is read from the url in a project related appliation context.
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
    headers: omitEmpty<Headers>({
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
      [SUPPORTED_HEADERS.ACCEPT_VERSION]: apolloContext.forwardToConfig
        ? apolloContext.forwardToConfig.version
        : undefined,
      [SUPPORTED_HEADERS.X_FORWARD_TO]: apolloContext.forwardToConfig
        ? apolloContext.forwardToConfig.uri
        : undefined,
    }),
  });
  return forward(operation).map((response) => {
    const context = operation.getContext();

    const refreshedSessionToken = context.response?.headers?.get(
      'x-refreshed-session-token'
    );
    if (refreshedSessionToken) {
      oidcStorage.setActiveSession(refreshedSessionToken);
    }

    return response;
  });
});

export default headerLink;
