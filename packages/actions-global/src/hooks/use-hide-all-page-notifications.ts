import React from 'react';
import { useDispatch } from 'react-redux';
import { hideAllPageNotifications } from '../actions';

export default function useHideAllPageNotifications() {
  const dispatch = useDispatch();
  return React.useCallback(() => dispatch(hideAllPageNotifications()), [
    dispatch,
  ]);
}
