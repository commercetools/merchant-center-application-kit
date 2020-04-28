import type { ActionError } from '../actions/handle-action-error';

import React from 'react';
import { useDispatch } from 'react-redux';
import handleActionError from '../actions/handle-action-error';

export default function useOnActionError() {
  const dispatch = useDispatch();
  return React.useCallback(
    (error: ActionError) => dispatch(handleActionError(error)),
    [dispatch]
  );
}
