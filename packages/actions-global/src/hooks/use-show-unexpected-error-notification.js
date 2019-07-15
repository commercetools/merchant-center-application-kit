import React from 'react';
import { showUnexpectedErrorNotification } from '../actions';
import { useDispatch } from 'react-redux';

// Returns a function that dispatches an unexpected error notification.
// Example:
//   const showUnexpectedErrorNotification = useShowUnexpectedErrorNotification();
//   showUnexpectedErrorNotification({ error });
export default function useShowUnexpectedErrorNotification() {
  const dispatch = useDispatch();
  return React.useCallback(
    (...args) => dispatch(showUnexpectedErrorNotification(...args)),
    [dispatch]
  );
}
