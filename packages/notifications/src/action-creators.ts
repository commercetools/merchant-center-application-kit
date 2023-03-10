import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './action-types';
import type {
  TNotificationMetaOptions,
  TRemoveNotificationAction,
  TNotification,
  TAddNotificationAction,
} from './types';

export function addNotification<Payload extends TNotification>(
  notification: Payload,
  meta?: TNotificationMetaOptions
) {
  const action: TAddNotificationAction<Payload> = {
    type: ADD_NOTIFICATION,
    payload: notification,
  };
  if (meta) action.meta = meta;
  return action;
}

export function removeNotification(
  id: TNotification['id']
): TRemoveNotificationAction {
  return { type: REMOVE_NOTIFICATION, payload: { id } };
}
