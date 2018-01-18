import React from 'react';
import PropTypes from 'prop-types';
import { Provider as StoreProvider, connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from '@commercetools-local/core/components/page-not-found';
import {
  addNotification,
  removeNotification,
} from '@commercetools-local/notifications';
import { Sdk } from '@commercetools-local/sdk';
import * as sdkService from '@commercetools-local/sdk-service';
import * as constants from '@commercetools-local/constants';
import * as i18n from '../../../../i18n';
import ApplicationShell, {
  RequestsInFlightLoader,
  NotificationsConnector,
  reduxStore,
  setupGlobalErrorListener,
} from '../main';
import testMenuItems from './fixtures/menu-items';
import TestDashboard, {
  trackingEventWhitelist as dashboardTrackingEventWhitelist,
} from './test-dashboard';
import TestProducts, {
  trackingEventWhitelist as productsTrackingEventWhitelist,
} from './test-products';

const trackingEventWhitelist = {
  ...dashboardTrackingEventWhitelist,
  ...productsTrackingEventWhitelist,
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
            reduxStore.dispatch({
              type: 'SHOW_LOADING',
              payload: this.getRandomRequestId(),
            })
          }
        >
          {'Add request'}
        </button>
        <button
          onClick={() =>
            reduxStore.dispatch({
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
    { name: constants.DOMAINS.GLOBAL, kind: 'info' },
    { name: constants.DOMAINS.PAGE, kind: 'error' },
    { name: constants.DOMAINS.SIDE, kind: 'success' },
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
            <button onClick={() => reduxStore.dispatch(removeNotification())}>
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
  <StoreProvider store={reduxStore}>
    <React.Fragment>
      <RequestsInFlightLoader />
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
            trackingEventWhitelist={trackingEventWhitelist}
            notificationsByDomain={notificationsByDomain}
            showNotification={showNotification}
            showApiErrorNotification={showApiErrorNotification}
            showUnexpectedErrorNotification={showUnexpectedErrorNotification}
            onRegisterGlobalErrorListeners={() => {
              setupGlobalErrorListener(showUnexpectedErrorNotification);
              Sdk.Get.errorHandler = error =>
                sdkService.handleActionError(error, 'sdk')(reduxStore.dispatch);
            }}
            render={() => (
              <div>
                <TriggerRequestsInFlight store={reduxStore} />
                <ConnectedTriggerNotification />
                <Switch>
                  <Route
                    path="/:projectKey/dashboard"
                    component={TestDashboard}
                  />
                  <Route
                    path="/:projectKey/products"
                    component={TestProducts}
                  />
                  {/**
                   * Define a catch-all route (needs
                   * to be defined after the rendered
                   * children) */}
                  <Route component={PageNotFound} />
                </Switch>
              </div>
            )}
          />
        )}
      </NotificationsConnector>
    </React.Fragment>
  </StoreProvider>
);
TestApplication.displayName = 'TestApplication';

export default TestApplication;
