import React from 'react';
import { Dispatch } from 'redux';
import { showNotification } from '../actions';
import { TShowNotification } from '../types';
import { useDispatch } from 'react-redux';

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
>(notificationFragment: Partial<Notification>) {
  const dispatch = useDispatch<Dispatch<ReturnType<typeof showNotification>>>();
  return React.useCallback(
    (content, meta) => {
      const notification = showNotification<Notification>(
        { ...notificationFragment, ...content },
        meta
      );
      dispatch(notification);
    },
    [dispatch, notificationFragment]
  );
}
