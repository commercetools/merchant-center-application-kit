import type { NormalizedCacheObject } from 'apollo-cache-inmemory';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { TApolloContext } from '../utils/apollo-context';

import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import omitEmpty from 'omit-empty-es';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
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
};

const isKnownGraphQlTarget = (target: GraphQlTarget) =>
  Object.values(GRAPHQL_TARGETS).includes(target);

/* eslint-disable import/prefer-default-export */
// Use a middleware to update the request headers with the correct params.
const headerLink = new ApolloLink((operation, forward) => {
  const {
    skipGraphQlTargetCheck = false,
    cache,
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

  operation.setContext({
    credentials: 'include',
    headers: omitEmpty({
      'X-Project-Key': projectKey,
      'X-Correlation-Id': getCorrelationId({ userId }),
      'X-Graphql-Target': graphQlTarget,
      // Experimental features, use with caution.
      'X-Team-Id': teamId,
      'X-Application-Id': window.app.applicationId,
    }),
  });
  return forward(operation);
});

export default headerLink;
