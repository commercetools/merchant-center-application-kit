import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../action-types';

export default function notificationsReducer(state = [], action) {
  if (!action || !action.type) return state;

  switch (action.type) {
    case ADD_NOTIFICATION: {
      return [action.payload, ...state];
    }
    case REMOVE_NOTIFICATION:
      return state.filter(notification => notification.id !== action.payload);
    default:
      return state;
  }
}
