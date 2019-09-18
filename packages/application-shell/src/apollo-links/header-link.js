import { ApolloLink } from 'apollo-link';
import omitEmpty from 'omit-empty-es';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {
  getCorrelationId,
  selectProjectKeyFromUrl,
  selectTeamIdFromLocalStorage,
  selectUserId,
} from '../utils';

const isKnownGraphQlTarget = target =>
  Object.values(GRAPHQL_TARGETS).includes(target);
const omitEmptyHeaders = headers => omitEmpty(headers);

/* eslint-disable import/prefer-default-export */
// Use a middleware to update the request headers with the correct params.
const headerLink = new ApolloLink((operation, forward) => {
  const { uri, cache } = operation.getContext();

  // In case the `context` contains a `uri`, it means that we are not sending
  // the request to the MC API, but to another server.
  // For now, if that's the case, we skip the `target` validation and we do
  // not send the custom headers.
  if (uri) {
    return forward(operation);
  }

  const graphQlTarget = operation.variables.target;
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
  const projectKey =
    operation.variables.projectKey || selectProjectKeyFromUrl();
  const teamId = operation.variables.teamId || selectTeamIdFromLocalStorage();
  const userId = selectUserId({ apolloCache: cache });

  operation.setContext({
    credentials: 'include',
    headers: omitEmptyHeaders({
      'X-Project-Key': projectKey,
      'X-Correlation-Id': getCorrelationId({ userId }),
      'X-Graphql-Target': graphQlTarget,
      'X-Team-Id': teamId,
    }),
  });
  return forward(operation);
});

export default headerLink;
