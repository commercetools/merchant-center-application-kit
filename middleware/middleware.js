import { createRequestBuilder } from '@commercetools/api-request-builder';
import { SHOW_LOADING, HIDE_LOADING } from '@commercetools-local/constants';
import toGlobal from 'core/utils/to-global';
import { parseUri, logRequest } from '../utils';
import client from './client';

// NOTE in case we create the middleware into a factory, these could come in
// as options
const selectProjectKey = state => {
  const application = state.globalAppState || state.application;
  return application.currentProjectKey;
};

const selectToken = state => {
  const application = state.globalAppState || state.application;
  return application.token;
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

const methodToHttpMethod = method => {
  switch (method) {
    case 'fetch':
      return 'GET';
    case 'update':
      return 'POST';
    default:
      throw new Error('sdk: unknown-method');
  }
};

export default ({ dispatch, getState }) => next => action => {
  if (!action) return next(action);

  if (action.type === 'SDK') {
    // NOTE here the middleware is aware of the application
    // instead we could refactor to middleware factory and accept options with
    // options.selectToken(state) and options.selectProjectKey(state)
    // or is this Speculative Generality?
    const state = getState();

    const uri = actionToUri(action, selectProjectKey(state));

    const requestName = `sdk.${action.payload.method}(${uri})`;

    // NOTE here the middleware is aware of the application
    // Instead we should probably convert to a middleware factory
    // and provide hooks for `onFetch`, `onResult` and `onError
    dispatch(toGlobal({ type: SHOW_LOADING, payload: requestName }));

    const method = methodToHttpMethod(action.payload.method);
    const headers = { Authorization: selectToken(state) };

    logRequest({ method, action, headers, uriParts: parseUri(uri) });

    // NOTE the promise returned by the client resolves to a custom format
    // it will contain { statusCode, headers, body }
    return client
      .execute({
        uri,
        method,
        headers,
        ...(method === 'POST' ? { body: action.payload.payload } : {}),
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
