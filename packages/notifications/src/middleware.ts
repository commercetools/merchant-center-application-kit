import type { Action, Dispatch, MiddlewareAPI } from 'redux';
import { removeNotification } from './action-creators';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './action-types';
import type {
  TNotification,
  TNotificationOnDismiss,
  TNotificationAction,
} from './types';

// Force TS cast of generic action to TNotificationAction
const isNotificationAction = <Payload extends TNotification>(
  action: Action
): action is TNotificationAction<Payload> =>
  [ADD_NOTIFICATION, REMOVE_NOTIFICATION].includes(action.type);

const dismissCallbacksMap = new Map<
  TNotification['id'],
  TNotificationOnDismiss
>();
let id = 0;

const middleware =
  <Payload extends TNotification>({ dispatch }: MiddlewareAPI) =>
  (next: Dispatch<TNotificationAction<Payload>>) =>
  (action: TNotificationAction<Payload>) => {
    if (!isNotificationAction<Payload>(action)) {
      return next(action);
    }

    switch (action.type) {
      case ADD_NOTIFICATION: {
        id += 1;

        const notification = {
          ...action.payload,
          id,
        };

        const dismissCallback = () => {
          dispatch(removeNotification(notification.id));
        };

        if (action.meta) {
          if (action.meta.dismissAfter)
            setTimeout(dismissCallback, action.meta.dismissAfter);
          if (typeof action.meta.onDismiss === 'function')
            dismissCallbacksMap.set(notification.id, action.meta.onDismiss);
        }

        const nextAction = {
          ...action,
          payload: notification,
          dismiss: dismissCallback,
        };
        return next(nextAction);
      }
      case REMOVE_NOTIFICATION: {
        const notificationId = action.payload.id;
        const callback = dismissCallbacksMap.get(notificationId);
        if (callback) callback(notificationId);
        dismissCallbacksMap.delete(notificationId);
        return next(action);
      }
      default:
        return next(action);
    }
  };

export default middleware;
