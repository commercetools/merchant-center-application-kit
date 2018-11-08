import { ApolloLink } from 'apollo-link';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {
  getCorrelationId,
  selectProjectKeyFromUrl,
  selectUserId,
} from '../utils';

const isKnownTarget = target => Object.values(GRAPHQL_TARGETS).includes(target);

/* eslint-disable import/prefer-default-export */
// Use a middleware to update the request headers with the correct params.
const headerLink = new ApolloLink((operation, forward) => {
  const target = operation.variables.target;
  if (!isKnownTarget(target))
    throw new Error(
      `GraphQL target "${target}" is missing or is not supported`
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
  const userId = selectUserId({ apolloCache: operation.getContext().cache });

  // NOTE: keep header names with capital letters to avoid possible conflicts or problems with nginx.
  operation.setContext({
    headers: {
      'X-Project-Key': projectKey,
      'X-Correlation-Id': getCorrelationId({ userId }),
      'X-Graphql-Target': target,
    },
  });
  return forward(operation);
});

export default headerLink;
