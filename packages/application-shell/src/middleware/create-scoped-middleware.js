import { __LOCAL } from './add-plugin-to-notification/constants';
import { isLocalAction } from './add-plugin-to-notification/actions';

// Localizes a middleware for a plugin.
//
// The middleware will then run for the payload of local actions, instead of
// running for all actions.
//
// The wrapped middleware then
//   - uses local getState and local dispatch
//   - emits a local action when it calls `next`
export default wrappedMiddleware => middlewareApi => next => action => {
  if (isLocalAction(action) && action.meta) {
    const localDispatch = newAction =>
      middlewareApi.dispatch({
        type: __LOCAL,
        payload: newAction,
        meta: {
          plugin: action.meta.plugin,
        },
      });

    const localGetState = () => {
      const state = middlewareApi.getState();
      return state[action.meta.plugin];
    };

    const localNext = localAction =>
      next({
        ...action,
        payload: localAction,
      });

    const localMiddlewareApi = {
      dispatch: localDispatch,
      getState: localGetState,
    };

    // calling `next` is the responsibility of the original middleware
    return wrappedMiddleware(localMiddlewareApi)(localNext)(action.payload);
  }
  return next(action);
};
