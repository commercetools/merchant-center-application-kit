import { createClient } from '@commercetools/sdk-client';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createUserAgentMiddleware } from '@commercetools/sdk-middleware-user-agent';
import { createRequestBuilder } from '@commercetools/api-request-builder';
import { SHOW_LOADING, HIDE_LOADING } from '@commercetools-local/constants';
import toGlobal from 'core/utils/to-global';
import applyOptionsToService from '../apply-options-to-service';

const userAgentMiddleware = createUserAgentMiddleware({
  libraryName: 'merchant-center-frontend',
  libraryVersion: '1.0.0',
  contactUrl: 'https://mc.commercetools.com',
  contactEmail: 'mc@commercetools.com',
});

// NOTE we should not use these directly but rather have them passed in from
// the application
const { app: { host, protocol } } = window;
const backendUrl = `${protocol}://${host}`;
const httpMiddleware = createHttpMiddleware({ host: backendUrl });
const client = createClient({
  middlewares: [userAgentMiddleware, httpMiddleware],
});

export default ({ dispatch, getState }) => next => action => {
  if (!action) return next(action);

  if (action.type === 'SDK') {
    const state = getState();
    const application = state.globalAppState || state.application;

    // TODO how to configure project key?
    // Do we need it for every request?
    // What if one request does not need it? Omit the object?
    const requestBuilder = createRequestBuilder({
      projectKey: application.currentProjectKey,
    });
    // NOTE it's weird that we have to access this from the request builder.
    // Shouldn't it just be a part of the object we parse?
    // NOTE shouldn't requestBuilder be called requestUriBuilder instead?
    const service = requestBuilder[action.payload.service];
    // NOTE once the sdk supports parsing objects this can go away
    applyOptionsToService(action.payload.options, service);

    // TODO throw when this fails?
    const uri = service.build();

    const requestName = `sdk.${action.payload.method}(${uri})`;

    // NOTE here the middleware is aware of the application
    // Instead we should probably convert to a middleware factory
    // and provide hooks for `onFetch`, `onResult` and `onError
    dispatch(toGlobal({ type: SHOW_LOADING, payload: requestName }));

    // NOTE do we need to support more types?
    const method = (() => {
      switch (action.payload.method) {
        case 'fetch':
          return 'GET';
        case 'update':
          return 'POST';
        default:
          throw new Error('sdk: unkown-method');
      }
    })();

    // NOTE the promise returned by the client resolves to a custom format
    // it will contain { statusCode, headers, body }
    return client
      .execute({
        uri,
        method,
        headers: { Authorization: application.token },
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
