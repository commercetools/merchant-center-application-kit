import React from 'react';
import PropTypes from 'prop-types';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider as StoreProvider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import * as i18n from '../../../../i18n';
import ApplicationShell, {
  RequestsInFlightLoader,
  requestsInFlightReducer,
} from '../main';
import testMenuItems from './fixtures/menu-items';
import TestDashboard from './test-dashboard';
import TestProducts from './test-products';

const loggerMiddleware = createLogger({
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

const mainReducer = combineReducers({
  requestsInFlight: requestsInFlightReducer,
});
const store = createStore(
  mainReducer,
  { requestsInFlight: null },
  compose(applyMiddleware(loggerMiddleware))
);
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

class TriggerRequestsInFlight extends React.PureComponent {
  static displayName = 'TriggerRequestsInFlight';
  static propTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
  };
  requestIds = ['request/1', 'request/2', 'request/3'];
  getRandomRequestId = () =>
    this.requestIds[Math.floor(Math.random() * this.requestIds.length)];
  render() {
    return (
      <div>
        <button
          onClick={() =>
            store.dispatch({
              type: 'SHOW_LOADING',
              payload: this.getRandomRequestId(),
            })
          }
        >
          {'Add request'}
        </button>
        <button
          onClick={() =>
            store.dispatch({
              type: 'HIDE_LOADING',
              payload: this.getRandomRequestId(),
            })
          }
        >
          {'Remove request'}
        </button>
      </div>
    );
  }
}

const TestApplication = () => (
  <ApplicationShell
    i18n={i18n}
    configuration={window.app}
    menuItems={testMenuItems}
    render={() => (
      <StoreProvider store={store}>
        <div>
          <RequestsInFlightLoader />
          <TriggerRequestsInFlight store={store} />
          <Switch>
            <Route path="/:projectKey/dashboard" component={TestDashboard} />
            <Route path="/:projectKey/products" component={TestProducts} />
          </Switch>
        </div>
      </StoreProvider>
    )}
  />
);
TestApplication.displayName = 'TestApplication';

export default TestApplication;
