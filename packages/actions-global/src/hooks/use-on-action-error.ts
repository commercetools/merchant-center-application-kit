import React from 'react';
import { useDispatch } from 'react-redux';
import handleActionError, {
  ActionError,
  DispatchActionError,
} from '../actions/handle-action-error';

export default function useOnActionError() {
  const dispatch = useDispatch<DispatchActionError>();

  return React.useCallback(
    (error: ActionError) => dispatch(handleActionError(error)),
    [dispatch]
  );
}
