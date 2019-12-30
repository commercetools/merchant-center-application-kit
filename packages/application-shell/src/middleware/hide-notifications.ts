import { Action, Dispatch, MiddlewareAPI } from 'redux';
import {
  removeNotification,
  ADD_NOTIFICATION,
  TNotificationAction,
} from '@commercetools-frontend/notifications';
import {
  TApiErrorNotification,
  TUnexpectedErrorNotification,
} from '@commercetools-frontend/actions-global';
import { selectPageNotifications } from '@commercetools-frontend/react-notifications';
import {
  HIDE_ALL_PAGE_NOTIFICATIONS,
  NOTIFICATION_KINDS_PAGE,
} from '@commercetools-frontend/constants';

type TNotificationActionError =
  | TNotificationAction<TApiErrorNotification>
  | TNotificationAction<TUnexpectedErrorNotification>;

type TNotificationActionHideAll = Action<typeof HIDE_ALL_PAGE_NOTIFICATIONS>;

const isAddNotificationErrorAction = (
  action: Action
): action is TNotificationActionError => {
  const errorAction = action as TNotificationActionError;
  return (
    errorAction.type === ADD_NOTIFICATION &&
    errorAction.payload &&
    (errorAction.payload.kind === NOTIFICATION_KINDS_PAGE['api-error'] ||
      errorAction.payload.kind === NOTIFICATION_KINDS_PAGE['unexpected-error'])
  );
};

const isHideAllNotificationsAction = (
  action: Action
): action is TNotificationActionHideAll =>
  action.type === HIDE_ALL_PAGE_NOTIFICATIONS;

export default ({ getState }: MiddlewareAPI) => (next: Dispatch<Action>) => (
  action: Action
) => {
  if (
    isHideAllNotificationsAction(action) ||
    isAddNotificationErrorAction(action)
  ) {
    const state = getState();
    selectPageNotifications(state).forEach(notification => {
      next(removeNotification(notification.id));
    });
  }

  return next(action);
};
