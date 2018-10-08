import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../action-types';

// supported meta properties: { dismissAfter, onDismiss }
export function addNotification(notification, meta) {
  const action = { type: ADD_NOTIFICATION, payload: notification };
  if (meta) action.meta = meta;
  return action;
}

export function removeNotification(id) {
  return { type: REMOVE_NOTIFICATION, payload: id };
}
