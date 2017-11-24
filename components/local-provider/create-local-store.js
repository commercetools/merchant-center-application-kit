import { defaultMemoize } from 'reselect';
import { __LOCAL } from '@commercetools-local/constants';

export function createLocalStore(store, activePlugin) {
  return {
    dispatch(action) {
      return store.dispatch({
        type: __LOCAL,
        payload: action,
        meta: {
          plugin: activePlugin,
        },
      });
    },
    getState() {
      const appState = store.getState();
      const state = appState[activePlugin];
      return state;
    },
    replaceReducer() {
      throw new Error('May not be called from plugin');
    },
    subscribe(...args) {
      return store.subscribe(...args);
    },
  };
}

export default defaultMemoize(createLocalStore);
