import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { handleActionError } from '../actions';

export default function useOnActionError(error) {
  const dispatch = useDispatch<
    Dispatch<ReturnType<typeof handleActionError>>
  >();
  return React.useCallback(() => {
    const action = handleActionError(error);
    if (action) dispatch(action);
  }, [dispatch, error]);
}
