import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { TNotificationMetaOptions } from '@commercetools-frontend/notifications';
import { showNotification } from '../actions';
import { TShowNotification } from '../types';

// Returns a function that dispatches a notification, pre-configured to
// a speficic notification.
// Example:
//   const showSuccessNotification = useShowNotification({
//     kind: 'success',
//     domain: DOMAINS.SIDE,
//   });
//   showSuccessNotification({ text: "All good!" });
export default function useShowNotification<
  Notification extends TShowNotification
  // FIXME: remove the `notificationFragment`, it makes the typing unnecessarily complex
>(notificationFragment?: Partial<Notification>) {
  const dispatch = useDispatch<Dispatch<ReturnType<typeof showNotification>>>();
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
