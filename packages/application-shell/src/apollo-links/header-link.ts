import type { NormalizedCacheObject } from '@apollo/client';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
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

declare let window: ApplicationWindow;

type GraphQlTarget = typeof GRAPHQL_TARGETS[keyof typeof GRAPHQL_TARGETS];

type ApolloContextWithInMemoryCache = TApolloContext & {
  cache: ApolloClient<NormalizedCacheObject>;
};

type QueryVariables = {
  target: GraphQlTarget;
  projectKey?: string;
  teamId?: string;
  featureFlag?: string;
};

const isKnownGraphQlTarget = (target: GraphQlTarget) =>
  Object.values(GRAPHQL_TARGETS).includes(target);

/* eslint-disable import/prefer-default-export */
// Use a middleware to update the request headers with the correct params.
const headerLink = new ApolloLink((operation, forward) => {
  const {
    skipGraphQlTargetCheck = false,
    cache,
    forwardToConfig,
  } = operation.getContext() as ApolloContextWithInMemoryCache;

  const variables = operation.variables as QueryVariables;

  const graphQlTarget = variables.target;
  if (!skipGraphQlTargetCheck && !isKnownGraphQlTarget(graphQlTarget))
    throw new Error(
      `GraphQL target "${graphQlTarget}" is missing or is not supported`
    );

  /**
   * NOTE:
   *   The project key is read from the url in a project related appliation context.
   *   This holds for most applications like `application-categories`, `application-discounts` etc.
   *   However, the `application-account` does not run with the project key being part of the url.
   *   As a result we allow passing the project key as a variable on the operation allowing
   *   it to be the fallback.
   */
  const projectKey = variables.projectKey || selectProjectKeyFromUrl();
  const teamId = variables.teamId || selectTeamIdFromLocalStorage();
  const userId = selectUserId({ apolloCache: cache });
  const featureFlag = variables.featureFlag;

  operation.setContext({
    credentials: 'include',
    headers: omitEmpty({
      [SUPPORTED_HEADERS.X_PROJECT_KEY]: projectKey,
      [SUPPORTED_HEADERS.X_CORRELATION_ID]: getCorrelationId({ userId }),
      [SUPPORTED_HEADERS.X_GRAPHQL_TARGET]: graphQlTarget,
      // Experimental features, use with caution.
      [SUPPORTED_HEADERS.X_TEAM_ID]: teamId,
      [SUPPORTED_HEADERS.X_APPLICATION_ID]: window.app.applicationId,
      [SUPPORTED_HEADERS.X_FEATURE_FLAG]: featureFlag,
      // Additional headers for the forward-to feature.
      [SUPPORTED_HEADERS.ACCEPT_VERSION]: forwardToConfig
        ? forwardToConfig.version
        : undefined,
      [SUPPORTED_HEADERS.X_FORWARD_TO]: forwardToConfig
        ? forwardToConfig.uri
        : undefined,
    }),
  });
  return forward(operation);
});

export default headerLink;
