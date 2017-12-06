import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider as StoreProvider } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import * as i18n from '../../../../i18n';
import ApplicationShell from '../main';
import testMenuItems from './fixtures/menu-items';
import TestDashboard from './test-dashboard';
import TestProducts from './test-products';

const logger = createLogger({
  collapsed: true,
  colors: {
    title: action =>
      /^LOCAL($|\/.*)/.test(action.type) ? '#FFA500' : '#000000',
    prevState: () => '#9E9E9E',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
  },
});

const mainReducer = state => state || {};
const store = createStore(mainReducer, {}, compose(applyMiddleware(logger)));
store.injectedReducers = {};
store.injectReducer = ({ name, reducer }) => {
  store.injectedReducers[name] = reducer;
  store.replaceReducer((state, action) => {
    if (action && action.type === 'ACTIVATE_PLUGIN') {
      // NOTE: to ensure that we pick the correct plugin name
      // we use the value within the action payload.
      // If we were to use the `name` given from the component
      // it would have been wrong, because the reference to that
      // variable can be out of sync.
      const pluginName = action.payload;
      return {
        ...state,
        activePlugin: pluginName,
        [pluginName]: store.injectedReducers[pluginName](state[pluginName], {
          type: 'INIT_PLUGIN',
        }),
      };
    }
    return mainReducer(state, action);
  });
};

const TestApplication = () => (
  <ApplicationShell
    i18n={i18n}
    configuration={window.app}
    menuItems={testMenuItems}
  >
    <StoreProvider store={store}>
      <Switch>
        <Route path="/:projectKey/dashboard" component={TestDashboard} />
        <Route path="/:projectKey/products" component={TestProducts} />
      </Switch>
    </StoreProvider>
  </ApplicationShell>
);
TestApplication.displayName = 'TestApplication';

export default TestApplication;
