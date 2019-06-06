import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../action-types';
import { removeNotification } from '../action-creators';

const dismissCallbacksMap = new Map();
let id = 0;

export default ({ dispatch }) => next => action => {
  if (!action) return next(action);

  if (action.type === REMOVE_NOTIFICATION) {
    const notificationId = action.payload;
    const callback = dismissCallbacksMap.get(notificationId);
    if (callback) callback(notificationId);
    dismissCallbacksMap.delete(notificationId);
    return next(action);
  }

  if (action.type === ADD_NOTIFICATION) {
    id += 1;

    const notification = {
      ...action.payload,
      id,
    };

    const notificationHandle = {
      id,
      dismiss() {
        dispatch(removeNotification(notification.id));
      },
    };

    if (action.meta) {
      if (action.meta.dismissAfter)
        setTimeout(notificationHandle.dismiss, action.meta.dismissAfter);
      if (typeof action.meta.onDismiss === 'function')
        dismissCallbacksMap.set(notification.id, action.meta.onDismiss);
    }

    next({
      ...action,
      payload: notification,
    });
    return notificationHandle;
  }

  return next(action);
};
