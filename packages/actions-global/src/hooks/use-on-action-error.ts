import React from 'react';
import { useDispatch } from 'react-redux';
import handleActionError, {
  ActionError,
  DispatchActionError,
} from '../actions/handle-action-error';

export default function useOnActionError(error: ActionError) {
  const dispatch = useDispatch<DispatchActionError>();
  return React.useCallback(() => handleActionError(error)(dispatch), [
    dispatch,
    error,
  ]);
}
