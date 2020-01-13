import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { hideAllPageNotifications } from '../actions';

export default function useHideAllPageNotifications() {
  const dispatch = useDispatch<
    Dispatch<ReturnType<typeof hideAllPageNotifications>>
  >();
  return React.useCallback(() => {
    dispatch(hideAllPageNotifications());
  }, [dispatch]);
}
