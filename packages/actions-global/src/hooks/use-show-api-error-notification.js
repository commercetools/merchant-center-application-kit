import React from 'react';
import { showApiErrorNotification } from '../actions';
import { useDispatch } from 'react-redux';

// Returns a function that dispatches an API error notification.
// Example:
//   const showApiErrorNotification = useShowApiErrorNotification();
//   showApiErrorNotification({ errors });
export default function useShowApiErrorNotification() {
  const dispatch = useDispatch();
  return React.useCallback(
    (...args) => dispatch(showApiErrorNotification(...args)),
    [dispatch]
  );
}
