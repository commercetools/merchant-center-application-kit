import type { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import type { TSdkAction } from '../types';

type TAsyncDispatch<Action extends TSdkAction, Data> = (
  action: Action
) => Promise<Data>;

// Wraps `dispatch` and cast the return type to a Promise, as the middleware
// returns a Promise.
function useAsyncDispatch<Action extends TSdkAction, Data>() {
  const dispatch = useDispatch<Dispatch<Action>>();
  return dispatch as unknown as TAsyncDispatch<Action, Data>;
}

export default useAsyncDispatch;
