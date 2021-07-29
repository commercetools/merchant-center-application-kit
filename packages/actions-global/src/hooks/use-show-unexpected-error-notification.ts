import type { TAppNotificationValuesUnexpectedError } from '@commercetools-frontend/constants';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showUnexpectedErrorNotification } from '../actions';

// Returns a function that dispatches an unexpected error notification.
// Example:
//   const showUnexpectedErrorNotification = useShowUnexpectedErrorNotification();
//   showUnexpectedErrorNotification({ error });
export default function useShowUnexpectedErrorNotification() {
  const dispatch = useDispatch();
  return useCallback(
    (options: TAppNotificationValuesUnexpectedError) =>
      dispatch(showUnexpectedErrorNotification(options)),
    [dispatch]
  );
}
