import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  middleware as notificationsMiddleware,
  reducer as notificationsReducer,
} from '@commercetools-frontend/notifications';
import { createMiddleware as createSdkMiddleware } from '@commercetools-frontend/sdk';
import { SHOW_LOADING, HIDE_LOADING } from '@commercetools-frontend/constants';
import hideNotificationsMiddleware from './middleware/hide-notifications';
import loggerMiddleware from './middleware/logger';
import sentryTrackingMiddleware from './middleware/sentry-tracking';
import { requestsInFlightReducer } from './components/requests-in-flight-loader';
import apolloClient from './configure-apollo';
import {
  getCorrelationId,
  selectProjectKeyFromUrl,
  selectUserId,
} from './utils';

const patchedGetCorrelationId = () =>
  getCorrelationId({
    userId: selectUserId({ apolloCache: apolloClient }),
  });

const createInternalReducer = () =>
  combineReducers({
    requestsInFlight: requestsInFlightReducer,
    notifications: notificationsReducer,
  });

const sdkMiddleware = createSdkMiddleware({
  getCorrelationId: patchedGetCorrelationId,
  getProjectKey: selectProjectKeyFromUrl,
});

export const applyDefaultMiddlewares = (...middlewares) =>
  applyMiddleware(...middlewares, thunk, loggerMiddleware);

// We use a factory as it's more practicable for tests
// The application can import the configured store (the default export)
export const createReduxStore = (
  preloadedState = { requestsInFlight: null },
  // additional middleware, used for testing
  additionalMiddlewares = []
) =>
  createStore(
    createInternalReducer(),
    preloadedState,
    compose(
      applyDefaultMiddlewares(
        ...additionalMiddlewares,
        sentryTrackingMiddleware,
        hideNotificationsMiddleware,
        notificationsMiddleware,
        sdkMiddleware
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__({
            actionsBlacklist: [SHOW_LOADING, HIDE_LOADING],
          })
        : noop => noop
    )
  );

export default createReduxStore();
