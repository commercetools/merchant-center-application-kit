import {
  isGlobalAction,
  isLocalAction,
} from '@commercetools-local/utils/actions';

/**
 * Middleware factory.
 * Takes an action and, if it's of type `__GLOBAL`, it will dispatch
 * the contained "real" action to the global reducer.
 * Example:
 *
 *   {
 *     type: '__GLOBAL',
 *     payload: {
 *       type: 'SHOW_LOADING',
 *       payload: 'FOO'
 *     },
 *     meta: {
 *       plugin: 'mcng-foo'
 *     },
 *   }
 *
 * will get transformed to:
 *
 *   {
 *     type: 'SHOW_LOADING',
 *     payload: 'FOO'
 *   }
 *
 * @param {Array} whitelist - A list of actions that can be dispatched globally.
 * @return {Function} The middlware.
 */
export default function createExtractGlobalActions(whitelist = []) {
  return () => next => action => {
    if (isLocalAction(action) && isGlobalAction(action.payload)) {
      if (whitelist.includes(action.payload.payload.type))
        return next(action.payload.payload);

      if (window.app.env !== 'production') {
        const { plugin } = action.meta;
        // eslint-disable-next-line no-console
        console.warn(
          `${plugin} tried to dispatch global non-whitelisted action`
        );
      }
    }

    // enable the app to dispatch globally like a plugin, even though it is not
    // necessary. The app could simply dispatch the plain action, but when
    // dispatching from a function used by plugins and the app, the function
    // doesn't know whether it needs to wrap actions in toGlobal or not.
    // Allowing the app to use disptach global actions as well makes it possible
    // to have action creators which are used in both the app and plugins.
    // TODO This is currently only used for the services, and can potentially be
    // removed again when these use a proper middleware.
    if (isGlobalAction(action)) {
      if (whitelist.includes(action.payload.type)) return next(action.payload);

      if (window.app.env !== 'production')
        // eslint-disable-next-line no-console
        console.warn('app tried to dispatch global non-whitelisted action');
    }

    return next(action);
  };
}
