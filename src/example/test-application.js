import React from 'react';
import PropTypes from 'prop-types';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider as StoreProvider, connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import {
  addNotification,
  removeNotification,
  middleware as notificationsMiddleware,
} from '@commercetools-local/notifications';
import { DOMAINS } from '@commercetools-local/constants';
import * as i18n from '../../../../i18n';
import ApplicationShell, {
  RequestsInFlightLoader,
  requestsInFlightReducer,
  activePluginReducer,
  NotificationsConnector,
  notificationsReducer,
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

const createReducer = (injectedReducers = {}) =>
  combineReducers({
    activePlugin: activePluginReducer,
    requestsInFlight: requestsInFlightReducer,
    notifications: notificationsReducer,
    ...injectedReducers,
  });
const store = createStore(
  createReducer(),
  { requestsInFlight: null },
  compose(applyMiddleware(loggerMiddleware, notificationsMiddleware))
);
store.injectedReducers = {};
store.injectReducer = ({ name, reducer }) => {
  store.injectedReducers[name] = reducer;
  store.replaceReducer(createReducer(store.injectedReducers));
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
class TriggerNotification extends React.PureComponent {
  static displayName = 'TriggerNotification';
  static propTypes = {
    activePlugin: PropTypes.string,
    addNotification: PropTypes.func.isRequired,
  };
  domains = [
    { name: DOMAINS.GLOBAL, kind: 'info' },
    { name: DOMAINS.PAGE, kind: 'error' },
    { name: DOMAINS.SIDE, kind: 'success' },
  ];
  render() {
    return (
      <div>
        {this.domains.map(domain => (
          <div key={domain.name}>
            <label>{domain.name}</label>
            <button
              onClick={() =>
                this.props.addNotification({
                  domain: domain.name,
                  text: 'foo',
                  kind: domain.kind,
                  plugin: this.props.activePlugin,
                })
              }
            >
              {'Add notification'}
            </button>
            <button onClick={() => store.dispatch(removeNotification())}>
              {'Remove notification'}
            </button>
          </div>
        ))}
      </div>
    );
  }
}
const ConnectedTriggerNotification = connect(
  state => ({
    activePlugin: state.activePlugin,
  }),
  { addNotification }
)(TriggerNotification);

const TestApplication = () => (
  <StoreProvider store={store}>
    <NotificationsConnector>
      {({
        notificationsByDomain,
        showNotification,
        showApiErrorNotification,
        showUnexpectedErrorNotification,
      }) => (
        <ApplicationShell
          i18n={i18n}
          configuration={window.app}
          menuItems={testMenuItems}
          notificationsByDomain={notificationsByDomain}
          showNotification={showNotification}
          showApiErrorNotification={showApiErrorNotification}
          showUnexpectedErrorNotification={showUnexpectedErrorNotification}
          render={() => (
            <div>
              <RequestsInFlightLoader />
              <TriggerRequestsInFlight store={store} />
              <ConnectedTriggerNotification />
              <Switch>
                <Route
                  path="/:projectKey/dashboard"
                  component={TestDashboard}
                />
                <Route path="/:projectKey/products" component={TestProducts} />
              </Switch>
            </div>
          )}
        />
      )}
    </NotificationsConnector>
  </StoreProvider>
);
TestApplication.displayName = 'TestApplication';

export default TestApplication;
