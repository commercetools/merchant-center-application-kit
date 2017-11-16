import { SHOW_LOADING, HIDE_LOADING } from '@commercetools-local/constants';
import toGlobal from 'core/utils/to-global';
import client from 'core/utils/node-sdk';
import applyOptionsToService from '../apply-options-to-service';

export default ({ dispatch, getState }) => next => action => {
  if (!action) return next(action);

  if (action.type === 'SDK') {
    const state = getState();
    const application = state.globalAppState;

    const service = client[action.payload.service];
    if (!service) {
      throw new Error(`Unkown service "${action.payload.service}"`);
    }
    if (application.token)
      service.withHeader('Authorization', application.token);
    // TODO how to configure this one?
    // Do we need it for every request?
    // how would we avoid `withCredentials`?
    if (application.currentProjectKey)
      service.withCredentials({ projectKey: application.currentProjectKey });

    // TODO handle types other than fetch
    // e.g. update needs to send a payload

    // apply options
    if (action.payload.options)
      applyOptionsToService(action.payload.options, service);

    const source = `api/${action.payload.service}/${action.payload.method}`;
    // NOTE here the middleware is aware of the application
    // Instead we should probably convert to a middleware factory
    // and provide hooks for `onFetch`, `onResult` and `onError`
    dispatch(toGlobal({ type: SHOW_LOADING, payload: source }));
    // trigger request (eg through service.fetch)
    // NOTE the promise returned by the client resolves to a custom format
    // it will contain { statusCode, headers, body }
    return service[action.payload.method](action.payload.payload).then(
      result => {
        dispatch(toGlobal({ type: HIDE_LOADING, payload: source }));
        // NOTE The promise returned by "fetch" will reject when the request fails,
        // but only in certain cases. See "Checking that the fetch was successful"
        // in https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        // I am unsure how much the SDK already handles for us in this case.
        // TODO maybe we need a check like the one below
        // if (result.statusCode !== 200) {
        //   // eslint-disable-next-line no-console
        //   console.warn('sdk: request failed', action.payload, result);
        //   return Promise.reject(/* ... */)
        // }
        return result.body;
      },
      error => {
        dispatch(toGlobal({ type: HIDE_LOADING, payload: source }));
        throw error;
      }
    );
  }
  return next(action);
};
