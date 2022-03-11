import type { TAppNotificationValuesUnexpectedError } from '@commercetools-frontend/constants';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showUnexpectedErrorNotification } from '../actions';

/**
 * Dispatch an unexpected error notification.
 *
 * @example
 * const showUnexpectedErrorNotification = useShowUnexpectedErrorNotification();
 * showUnexpectedErrorNotification({ errors });
 */
export default function useShowUnexpectedErrorNotification() {
  const dispatch = useDispatch();
  return useCallback(
    (options: TAppNotificationValuesUnexpectedError) =>
      dispatch(showUnexpectedErrorNotification(options)),
    [dispatch]
  );
}
