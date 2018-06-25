import { createRequestBuilder } from '@commercetools/api-request-builder';
import {
  SHOW_LOADING,
  HIDE_LOADING,
  STATUS_CODES,
} from '@commercetools-local/constants';
import toGlobal from '@commercetools-local/actions-global/to-global';
import { logRequest } from '../utils';
import createClient from './client';

const actionToUri = (action, projectKey) => {
  if (action.payload.uri) return action.payload.uri;

  // Validate that `projectKey` exists
  if (!projectKey) {
    throw new Error(
      `Expected projectKey to be defined for action service "${
        action.payload.service
      }" (method "${action.payload.method}")`
    );
  }

  const requestBuilder = createRequestBuilder({ projectKey });
  // NOTE it's weird that we have to access this from the request builder.
  // Shouldn't it just be a part of the object we parse?
  // NOTE shouldn't requestBuilder be called requestUriBuilder instead?
  const service = requestBuilder[action.payload.service];
  if (action.payload.options) service.parse(action.payload.options);

  return service.build();
};

export default ({ getCorrelationId, getProjectKey }) => {
  const client = createClient({ getCorrelationId });

  return ({ dispatch }) => next => action => {
    if (!action) return next(action);

    if (action.type === 'SDK') {
      const uri = actionToUri(action, getProjectKey());

      // This `requestName` is never really used.
      //
      // We keep track of requests which are in progress in the `loading` state of
      // the application. The `loading` state is an array of strings
      // (which are correlation Ids, action types or request names).
      // This is just done so that debugging is easier.
      //
      // It's easier to debug
      //   loading: ['PRODUCTS_FETCHED', 'sdk.fetch(/product-projection-search)']
      // than to debug
      //   loading: 2
      const requestName = `sdk.${action.payload.method.toLowerCase()}(${uri})`;

      // NOTE here the middleware is aware of the application
      // Instead we should probably convert to a middleware factory
      // and provide hooks for `onFetch`, `onResult` and `onError
      dispatch(toGlobal({ type: SHOW_LOADING, payload: requestName }));

      // NOTE the promise returned by the client resolves to a custom format
      // it will contain { statusCode, headers, body }
      // NOTE This retry logic could be moved to an sdk client middleware,
      // but the client's middleware system is not capable of that right now
      // https://github.com/commercetools/merchant-center-frontend/pull/3304
      // https://github.com/commercetools/nodejs/issues/390
      const sendRequest = ({ shouldRenewToken } = {}) => {
        const headers = {
          Accept: 'application/json',
          ...(action.payload.headers || {}),
          ...(shouldRenewToken ? { 'X-Force-Token': 'true' } : {}),
        };
        const body =
          action.payload.method === 'POST' ? action.payload.payload : undefined;
        return client
          .execute({ uri, method: action.payload.method, headers, body })
          .then(
            result => {
              if (process.env.NODE_ENV !== 'production')
                logRequest({
                  method: action.payload.method,
                  request: { headers, uri },
                  response: result.body,
                  action,
                });
              return result;
            },
            error => {
              if (process.env.NODE_ENV !== 'production')
                logRequest({
                  method: action.payload.method,
                  request: { headers, uri },
                  error,
                  action,
                });
              throw error;
            }
          );
      };
      return sendRequest()
        .catch(error => {
          // in case of 401 error, try again with a new token
          // https://github.com/commercetools/merchant-center-backend/blob/master/docs/AUTHENTICATION.md#problems-due-to-oauth-token-caching
          if (
            error.statusCode &&
            error.statusCode === STATUS_CODES.UNAUTHORIZED
          ) {
            return sendRequest({ shouldRenewToken: true });
          }
          throw error;
        })
        .then(
          result => {
            dispatch(toGlobal({ type: HIDE_LOADING, payload: requestName }));
            // The promise returned by "fetch" will reject when the request fails,
            // but only in certain cases. See "Checking that the fetch was successful"
            // in https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            // The SDK already handles this case for us.
            return result.body;
          },
          error => {
            dispatch(toGlobal({ type: HIDE_LOADING, payload: requestName }));
            throw error;
          }
        );
    }
    return next(action);
  };
};
