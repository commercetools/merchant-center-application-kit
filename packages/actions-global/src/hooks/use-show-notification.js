import React from 'react';
import { showNotification } from '../actions';
import { useDispatch } from 'react-redux';

// Returns a function that dispatches a notification, pre-configured to
// a speficic notification.
// Example:
//   const showSuccessNotification = useShowNotification({
//     kind: 'success',
//     domain: DOMAINS.SIDE,
//   });
//   showSuccessNotification({ text: "All good!" });
export default function useShowNotification(notificationFragment) {
  const dispatch = useDispatch();
  return React.useCallback(
    content => {
      dispatch(showNotification({ ...notificationFragment, ...content }));
    },
    [dispatch, notificationFragment]
  );
}
