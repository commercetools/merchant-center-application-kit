import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { TSdkAction } from '../types';

// Wraps `dispatch` and cast the return type to a Promise, as the middleware
// returns a Promise.
function useAsyncDispatch<Action extends TSdkAction, Data>() {
  const dispatch = useDispatch<Dispatch<Action>>();
  return (action: Action) => (dispatch(action) as unknown) as Promise<Data>;
}

export default useAsyncDispatch;
