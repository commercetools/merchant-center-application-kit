import { ADD_NOTIFICATION } from '@commercetools-frontend/notifications';
import { isLocalAction, isGlobalAction } from './actions';

const isAddNotificationAction = action =>
  action && action.type === ADD_NOTIFICATION;

// This middleware will inject the active `plugin` name for all actions of type
// `ADD_NOTIFICATION` (this is usually only for __LOCAL actions, which are
// wrapped in a __GLOBAL action by default, hence the nested structure).
// Context: notifications need to know which plugin they were displayed from,
// so we can render them inside the context of their plugin.
export default () => next => action => {
  // Bail out if there is no `plugin` field in the meta object
  if (!action || !action.meta || !action.meta.plugin) return next(action);

  if (
    isLocalAction(action) &&
    isGlobalAction(action.payload) &&
    isAddNotificationAction(action.payload.payload)
  ) {
    return next({
      ...action,
      // __LOCAL
      payload: {
        ...action.payload,
        // __GLOBAL
        payload: {
          ...action.payload.payload,
          // ADD_NOTIFICATION
          payload: {
            ...action.payload.payload.payload,
            plugin: action.meta.plugin,
          },
        },
      },
    });
  }

  return next(action);
};
