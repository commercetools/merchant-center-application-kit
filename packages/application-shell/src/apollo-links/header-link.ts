import ApolloClient from 'apollo-client';
import { NormalizedCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import omitEmpty from 'omit-empty-es';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {
  getCorrelationId,
  selectProjectKeyFromUrl,
  selectTeamIdFromLocalStorage,
  selectUserId,
} from '../utils';

type GraphQlTarget = typeof GRAPHQL_TARGETS[keyof typeof GRAPHQL_TARGETS];

type ApolloContext = {
  uri?: string;
  cache: ApolloClient<NormalizedCache>;
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
  const { uri, cache } = operation.getContext() as ApolloContext;

  // In case the `context` contains a `uri`, it means that we are not sending
  // the request to the MC API, but to another server.
  // For now, if that's the case, we skip the `target` validation and we do
  // not send the custom headers.
  if (uri) {
    return forward(operation);
  }

  const variables = operation.variables as QueryVariables;

  const graphQlTarget = variables.target;
  if (!isKnownGraphQlTarget(graphQlTarget))
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
      'X-Team-Id': teamId,
    }),
  });
  return forward(operation);
});

export default headerLink;
