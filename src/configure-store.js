import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import {
  middleware as notificationsMiddleware,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '@commercetools-local/notifications';
import { middleware as sdkMiddleware } from '@commercetools-local/sdk';
import { middleware as serviceMiddleware } from '@commercetools-local/sdk-service';
import client from '@commercetools-local/utils/node-sdk';
import * as constants from '@commercetools-local/constants';
import addPluginToNotificationMiddleware from './middleware/add-plugin-to-notification';
import batchedUpdates from './middleware/batched-updates';
import createExtractGlobalActions from './middleware/create-extract-global-actions';
import createScopedMiddleware from './middleware/create-scoped-middleware';
import hideNotificationsMiddleware from './middleware/hide-notifications';
import loggerMiddleware, { actionTransformer } from './middleware/logger';
import sentryTrackingMiddleware from './middleware/sentry-tracking';
import { activePluginReducer } from './components/inject-reducer';
import { requestsInFlightReducer } from './components/requests-in-flight-loader';
import { notificationsReducer } from './components/notifications-connector';

const createReducer = (injectedReducers = {}) =>
  combineReducers({
    activePlugin: activePluginReducer,
    requestsInFlight: requestsInFlightReducer,
    notifications: notificationsReducer,
    form: formReducer,
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
        constants.SHOW_LOADING,
        constants.HIDE_LOADING,
        ADD_NOTIFICATION,
        REMOVE_NOTIFICATION,
        constants.HIDE_ALL_PAGE_NOTIFICATIONS,
        constants.SWITCH_LOCALE,
        constants.SWITCH_PROJECT_LANGUAGE,
      ]),
      createScopedMiddleware(thunk.withExtraArgument(client)),
      sentryTrackingMiddleware,
      createScopedMiddleware(sentryTrackingMiddleware),
      hideNotificationsMiddleware,
      notificationsMiddleware,
      sdkMiddleware,
      createScopedMiddleware(sdkMiddleware),
      serviceMiddleware,
      createScopedMiddleware(serviceMiddleware),
      thunk.withExtraArgument(client),
      batchedUpdates,
      loggerMiddleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__({
          actionSanitizer: actionTransformer,
          actionsBlacklist: [constants.SHOW_LOADING, constants.HIDE_LOADING],
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
