import React from 'react';
import { useDispatch } from 'react-redux';
import { TNotificationMetaOptions } from '@commercetools-frontend/notifications';
import { showNotification } from '../actions';
import { TShowNotification } from '../types';

// Returns a function that dispatches a notification, pre-configured to
// a speficic notification.
// Example:
//   const showSuccessNotification = useShowNotification({
//     domain: NOTIFICATION_DOMAINS.SIDE,
//     kind: NOTIFICATION_KINDS_SIDE.success,
//   });
//   showSuccessNotification({ text: "All good!" });
export default function useShowNotification<
  Notification extends TShowNotification
  // FIXME: remove the `notificationFragment`, it makes the typing unnecessarily complex
>(notificationFragment?: Partial<Notification>) {
  const dispatch = useDispatch();
  return React.useCallback(
    (content: Notification, meta?: TNotificationMetaOptions) => {
      const notification = showNotification<Notification>(
        { ...notificationFragment, ...content },
        meta
      );
      return dispatch(notification);
    },
    [dispatch, notificationFragment]
  );
}
