import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  middleware as notificationsMiddleware,
  reducer as notificationsReducer,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '@commercetools-frontend/notifications';
import { createMiddleware as createSdkMiddleware } from '@commercetools-local/sdk';
import {
  SHOW_LOADING,
  HIDE_LOADING,
  HIDE_ALL_PAGE_NOTIFICATIONS,
} from '@commercetools-frontend/constants';
import addPluginToNotificationMiddleware from './middleware/add-plugin-to-notification';
import batchedUpdates from './middleware/batched-updates';
import createExtractGlobalActions from './middleware/create-extract-global-actions';
import createScopedMiddleware from './middleware/create-scoped-middleware';
import hideNotificationsMiddleware from './middleware/hide-notifications';
import loggerMiddleware, { actionTransformer } from './middleware/logger';
import sentryTrackingMiddleware from './middleware/sentry-tracking';
import { activePluginReducer } from './components/inject-reducer';
import { requestsInFlightReducer } from './components/requests-in-flight-loader';
import { getCorrelationId, selectProjectKey } from './utils';

const sdkMiddleware = createSdkMiddleware({
  getCorrelationId,
  getProjectKey: selectProjectKey,
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
  compose(
    applyMiddleware(
      // Should be defined before `createExtractGlobalActions`
      addPluginToNotificationMiddleware,
      createExtractGlobalActions([
        /* list of action types plugins may dispatch globally */
        SHOW_LOADING,
        HIDE_LOADING,
        ADD_NOTIFICATION,
        REMOVE_NOTIFICATION,
        HIDE_ALL_PAGE_NOTIFICATIONS,
      ]),
      createScopedMiddleware(thunk),
      sentryTrackingMiddleware,
      createScopedMiddleware(sentryTrackingMiddleware),
      hideNotificationsMiddleware,
      notificationsMiddleware,
      sdkMiddleware,
      createScopedMiddleware(sdkMiddleware),
      thunk,
      batchedUpdates,
      loggerMiddleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__({
          actionSanitizer: actionTransformer,
          actionsBlacklist: [SHOW_LOADING, HIDE_LOADING],
        })
      : noop => noop
  )
);
store.injectedReducers = {};
store.injectReducer = ({ name, reducer }) => {
  store.injectedReducers[name] = reducer;
  store.replaceReducer(createReducer(store.injectedReducers));
};

export default store;
