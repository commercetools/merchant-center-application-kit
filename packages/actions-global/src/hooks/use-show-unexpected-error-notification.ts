import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { TAppNotificationValuesUnexpectedError } from '@commercetools-frontend/constants';
import { showUnexpectedErrorNotification } from '../actions';

// Returns a function that dispatches an unexpected error notification.
// Example:
//   const showUnexpectedErrorNotification = useShowUnexpectedErrorNotification();
//   showUnexpectedErrorNotification({ error });
export default function useShowUnexpectedErrorNotification() {
  const dispatch = useDispatch<
    Dispatch<ReturnType<typeof showUnexpectedErrorNotification>>
  >();
  return React.useCallback(
    (options: TAppNotificationValuesUnexpectedError) =>
      dispatch(showUnexpectedErrorNotification(options)),
    [dispatch]
  );
}
