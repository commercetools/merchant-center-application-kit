import { ApolloLink } from 'apollo-link';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';

// TODO: remove this link once we use cookies
// #cookie

/* eslint-disable import/prefer-default-export */
export const createSetTokenLink = ({ storage }) =>
  new ApolloLink((operation, forward) =>
    forward(operation).map(data => {
      // The backend caches the OAuth token inside the jwt token.
      // After having fetched a new OAuth token, it sends the frontend
      // the new jwt token with this header.
      // https://github.com/commercetools/merchant-center-backend/blob/master/docs/AUTHENTICATION.md#projects-api-oauth-token-caching
      const nextToken = operation
        .getContext()
        .response.headers.get('x-set-token');

      if (nextToken) {
        storage.put(CORE_STORAGE_KEYS.TOKEN, nextToken);
      }

      return data;
    })
  );
