import type { ActionError } from '../actions/handle-action-error';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import handleActionError from '../actions/handle-action-error';

export default function useOnActionError() {
  const dispatch = useDispatch();
  return useCallback(
    (error: ActionError) => dispatch(handleActionError(error)),
    [dispatch]
  );
}
