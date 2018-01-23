import { isLocalAction } from '@commercetools-local/utils/actions';

const createPluginReducer = reducer => (state, action) =>
  reducer(state, isLocalAction(action) ? action.payload : action);

export default createPluginReducer;
