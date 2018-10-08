import { isLocalAction } from '../../middleware/add-plugin-to-notification/actions';

// Actions dispatched by plugins are scoped within a `__LOCAL` action.
// Each plugin reducer should be wrapped into this reducer, so that `__LOCAL`
// actions are unwrapped and properly handled by the plugin reducers.
const createPluginReducer = reducer => (state, action) =>
  reducer(state, isLocalAction(action) ? action.payload : action);

export default createPluginReducer;
