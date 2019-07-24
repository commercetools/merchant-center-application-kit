import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { showApiErrorNotification } from '../actions';
import { TApiErrorNotificationOptions } from '../types';

// Returns a function that dispatches an API error notification.
// Example:
//   const showApiErrorNotification = useShowApiErrorNotification();
//   showApiErrorNotification({ errors });
export default function useShowApiErrorNotification() {
  const dispatch = useDispatch<
    Dispatch<ReturnType<typeof showApiErrorNotification>>
  >();
  return React.useCallback(
    (options: TApiErrorNotificationOptions) =>
      dispatch(showApiErrorNotification(options)),
    [dispatch]
  );
}
