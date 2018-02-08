import { ApolloLink } from 'apollo-link';
import {
  GRAPHQL_TARGETS,
  STORAGE_KEYS as CORE_STORAGE_KEYS,
} from '@commercetools-local/constants';

const isKnownTarget = target => Object.values(GRAPHQL_TARGETS).includes(target);

/* eslint-disable import/prefer-default-export */
// Use a middleware to update the request headers with the correct params.
export const createHeaderLink = ({ storage }) =>
  new ApolloLink((operation, forward) => {
    const target = operation.variables.target;
    if (!isKnownTarget(target))
      throw new Error(
        `GraphQL target "${target}" is missing or is not supported`
      );

    const token = storage.get(CORE_STORAGE_KEYS.TOKEN);
    const projectKey = storage.get(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
    // NOTE: keep header names with capital letters to avoid possible conflicts
    // or problems with nginx.
    operation.setContext({
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'X-Project-Key': projectKey,
        'X-Graphql-Target': target,
      },
    });
    return forward(operation);
  });
