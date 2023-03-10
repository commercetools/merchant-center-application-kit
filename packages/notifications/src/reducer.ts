import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './action-types';
import type {
  TNotification,
  TNotificationAction,
  TNotificationState,
} from './types';

export default function notificationsReducer<Payload extends TNotification>(
  state: TNotificationState<Payload> = [],
  action: TNotificationAction<Payload>
) {
  if (!action || !action.type) return state;

  switch (action.type) {
    case ADD_NOTIFICATION: {
      return [action.payload, ...state];
    }
    case REMOVE_NOTIFICATION:
      return state.filter(
        (notification) => action.payload.id !== notification.id
      );
    default:
      return state;
  }
}
