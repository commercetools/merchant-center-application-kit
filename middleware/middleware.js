import { createRequestBuilder } from '@commercetools/api-request-builder';
import {
  SHOW_LOADING,
  HIDE_LOADING,
  STORAGE_KEYS as CORE_STORAGE_KEYS,
  STATUS_CODES,
} from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import toGlobal from '@commercetools-local/utils/to-global';
import { logRequest } from '../utils';
import client from './client';

// NOTE in case we create the middleware into a factory, these could come in
// as options
const selectProjectKey = state => {
  // With the new setup, is not possible anymore for the action creators
  // to have access to the `globalAppState`. Therefore, in order to be
  // backwards compatible, we fall back to read the value from local storage.
  // TODO: remove the "old" logic after the #RR4 migration
  const application = state.globalAppState || state.application;
  return (
    (application && application.projectKey) ||
    storage.get(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY)
  );
};

const actionToUri = (action, projectKey) => {
  if (action.payload.uri) return action.payload.uri;
  // TODO how to configure project key?
  // Do we need it for every request?
  // What if one request does not need it? Omit the object?
  const requestBuilder = createRequestBuilder({ projectKey });
  // NOTE it's weird that we have to access this from the request builder.
  // Shouldn't it just be a part of the object we parse?
  // NOTE shouldn't requestBuilder be called requestUriBuilder instead?
  const service = requestBuilder[action.payload.service];
  if (action.payload.options) service.parse(action.payload.options);

  return service.build();
};

export default ({ dispatch, getState }) => next => action => {
  if (!action) return next(action);

  if (action.type === 'SDK') {
    // NOTE here the middleware is aware of the application
    // instead we could refactor to middleware factory and accept options with
    // options.selectProjectKey(state) or is this Speculative Generality?
    const state = getState();

    const uri = actionToUri(action, selectProjectKey(state));

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
