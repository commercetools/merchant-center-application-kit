import {
  removeNotification,
  ADD_NOTIFICATION,
} from '@commercetools-frontend/notifications';
import { selectPageNotifications } from '@commercetools-frontend/react-notifications';
import { HIDE_ALL_PAGE_NOTIFICATIONS } from '@commercetools-frontend/constants';

function isErrorNotificationKind(kind) {
  return kind === 'api-error' || kind === 'unexpected-error';
}

export default ({ getState }) => next => action => {
  if (!action) return next(action);

  if (action.type === HIDE_ALL_PAGE_NOTIFICATIONS) {
    const state = getState();
    selectPageNotifications(state).forEach(notification =>
      next(removeNotification(notification.id))
    );
  } else if (
    action.type === ADD_NOTIFICATION &&
    action.payload &&
    isErrorNotificationKind(action.payload.kind)
  ) {
    const state = getState();
    selectPageNotifications(state).forEach(notification => {
      if (isErrorNotificationKind(notification.kind))
        next(removeNotification(notification.id));
    });
  }
  return next(action);
};
