import type {
  TNotificationMetaOptions,
  TAddNotificationAction,
  TNotification,
} from '@commercetools-frontend/notifications';
import type { TShowNotification } from '../types';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../actions';

type TNotificationHook<Notification extends TShowNotification> = (
  content: Notification,
  meta?: TNotificationMetaOptions
) => TAddNotificationAction<Notification & TNotification>;

/**
 * Dispatch a notification.
 *
 * @example
 * const showSuccessNotification = useShowNotification();
 * showSuccessNotification({
 *   domain: NOTIFICATION_DOMAINS.SIDE,
 *   kind: NOTIFICATION_KINDS_SIDE.success,
 *   text: "All good!",
 * });
 */
function useShowNotification<
  Notification extends TShowNotification
>(): TNotificationHook<Notification>;
/**
 * Dispatch a notification.
 *
 * @deprecated: Avoid passing the notification options here.
 * Instead define them in the notification function itself.
 *
 * @example
 * Bad:
 * const showSuccessNotification = useShowNotification({
 *   domain: NOTIFICATION_DOMAINS.SIDE,
 *   kind: NOTIFICATION_KINDS_SIDE.success,
 * });
 * showSuccessNotification({
 *   text: "All good!",
 * });
 *
 * Good:
 * const showSuccessNotification = useShowNotification();
 * showSuccessNotification({
 *   domain: NOTIFICATION_DOMAINS.SIDE,
 *   kind: NOTIFICATION_KINDS_SIDE.success,
 *   text: "All good!",
 * });
 */
function useShowNotification<Notification extends TShowNotification>(
  notificationFragment: Partial<Notification>
): TNotificationHook<Notification>;

function useShowNotification<Notification extends TShowNotification>(
  notificationFragment?: Partial<Notification>
): TNotificationHook<Notification> {
  const dispatch = useDispatch();
  return useCallback(
    (content, meta) => {
      const notification = showNotification<Notification>(
        { ...notificationFragment, ...content },
        meta
      );
      return dispatch(notification);
    },
    [dispatch, notificationFragment]
  );
}

export default useShowNotification;
