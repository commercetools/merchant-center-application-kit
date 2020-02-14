import React from 'react';
import { useDispatch } from 'react-redux';
import handleActionError, { ActionError } from '../actions/handle-action-error';

export default function useOnActionError() {
  const dispatch = useDispatch();
  return React.useCallback(
    (error: ActionError) => dispatch(handleActionError(error)),
    [dispatch]
  );
}
