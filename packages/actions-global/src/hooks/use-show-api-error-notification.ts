import type { TApiErrorNotificationOptions } from '../types';

import React from 'react';
import { useDispatch } from 'react-redux';
import { showApiErrorNotification } from '../actions';

// Returns a function that dispatches an API error notification.
// Example:
//   const showApiErrorNotification = useShowApiErrorNotification();
//   showApiErrorNotification({ errors });
export default function useShowApiErrorNotification() {
  const dispatch = useDispatch();
  return React.useCallback(
    (options: TApiErrorNotificationOptions) =>
      dispatch(showApiErrorNotification(options)),
    [dispatch]
  );
}
