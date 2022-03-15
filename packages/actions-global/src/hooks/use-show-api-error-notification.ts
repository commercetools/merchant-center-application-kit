import type { TApiErrorNotificationOptions } from '../types';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showApiErrorNotification } from '../actions';

/**
 * Dispatch an API error notification.
 *
 * @example
 * const showApiErrorNotification = useShowApiErrorNotification();
 * showApiErrorNotification({ errors });
 */
export default function useShowApiErrorNotification() {
  const dispatch = useDispatch();
  return useCallback(
    (options: TApiErrorNotificationOptions) =>
      dispatch(showApiErrorNotification(options)),
    [dispatch]
  );
}
