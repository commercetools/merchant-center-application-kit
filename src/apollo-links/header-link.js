import { ApolloLink } from 'apollo-link';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { getCorrelationId, selectProjectKey } from '../utils';

const isKnownTarget = target => Object.values(GRAPHQL_TARGETS).includes(target);

/* eslint-disable import/prefer-default-export */
// Use a middleware to update the request headers with the correct params.
export const headerLink = new ApolloLink((operation, forward) => {
  const target = operation.variables.target;
  if (!isKnownTarget(target))
    throw new Error(
      `GraphQL target "${target}" is missing or is not supported`
    );

  const projectKey = selectProjectKey();
  // NOTE: keep header names with capital letters to avoid possible conflicts
  // or problems with nginx.
  operation.setContext({
    headers: {
      'X-Project-Key': projectKey,
      'X-Correlation-Id': getCorrelationId(),
      'X-Graphql-Target': target,
    },
  });
  return forward(operation);
});
