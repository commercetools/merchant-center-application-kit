import type { ApplicationWindow } from '@commercetools-frontend/constants';
import mapValues from 'lodash/mapValues';
import {
  configureStore,
  combineReducers,
  applyMiddleware,
  type ReducersMapObject,
  type Store,
  type Middleware,
  type StoreEnhancer,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import omitEmpty from 'omit-empty-es';
import {
  middleware as notificationsMiddleware,
  reducer as notificationsReducer,
} from '@commercetools-frontend/notifications';
import { createMiddleware as createSdkMiddleware } from '@commercetools-frontend/sdk';
import { SHOW_LOADING, HIDE_LOADING } from '@commercetools-frontend/constants';
import { SUPPORTED_HEADERS } from './constants';
import hideNotificationsMiddleware from './middleware/hide-notifications';
import loggerMiddleware from './middleware/logger';
import { requestsInFlightReducer } from './components/requests-in-flight-loader';
import {
  getCorrelationId,
  selectProjectKeyFromUrl,
  selectTeamIdFromLocalStorage,
  selectUserId,
} from './utils';
import * as oidcStorage from './utils/oidc-storage';

interface ApplicationWindowWithDevtools extends ApplicationWindow {
  __REDUX_DEVTOOLS_EXTENSION__: (config?: {
    actionsBlacklist: string[];
  }) => StoreEnhancer<unknown, {}>;
}
declare let window: ApplicationWindowWithDevtools;

type Headers = { [key: string]: string };
export type TEnhancedStore = Store & {
  injectedReducers: { [key: string]: ReducersMapObject };
  injectReducers: (payload: {
    id: string;
    reducers: ReducersMapObject;
  }) => void;
  removeReducers: (payload: { id: string }) => void;
};

const mergeObjectValues = <T>(object: { [key: string]: T }) =>
  Object.entries<T>(object).reduce(
    (acc, [, value]) => ({ ...acc, ...value }),
    {} as T
  );

const patchedGetCorrelationId = () =>
  getCorrelationId({ userId: selectUserId() });

const getAdditionalHeaders = (): Headers | undefined => {
  const sessionToken = oidcStorage.getSessionToken();
  return omitEmpty<Headers>({
    [SUPPORTED_HEADERS.AUTHORIZATION]: sessionToken
      ? `Bearer ${sessionToken}`
      : undefined,
    [SUPPORTED_HEADERS.X_APPLICATION_ID]: window.app.applicationId,
    [SUPPORTED_HEADERS.X_TEAM_ID]: selectTeamIdFromLocalStorage(),
  });
};

const sdkMiddleware = createSdkMiddleware({
  getCorrelationId: patchedGetCorrelationId,
  getProjectKey: selectProjectKeyFromUrl,
  getAdditionalHeaders,
});

/**
 * @deprecated: This function should not be used directly anymore.
 */
export const applyDefaultMiddlewares = (...middlewares: Middleware[]) =>
  applyMiddleware(...middlewares, thunk, loggerMiddleware);

const createInternalReducer = (
  injectedReducers: ReducersMapObject = {},
  preloadedState = {}
) => {
  // not providing preloadedStateReducers to combineReducers will cause an error
  // when preloadedState contains keys other than requestsInFlight and
  // notifications:
  // Unexpected key "new Key" found in preloadedState argument passed to createStore. Expected to find one of the known reducer keys instead: "requestsInFlight", "notifications". Unexpected keys will be ignored.
  // https://redux.js.org/api/createstore#createstorereducer-preloadedstate-enhancer
  const preloadedStateReducers = mapValues(
    preloadedState,
    (value) => () => value
  );

  // NOTE: since we don't know in advance which reducers will be injected,
  // we pass an `unknown` type to express this uncertainty and make the compiler happy.
  return combineReducers<unknown>({
    requestsInFlight: requestsInFlightReducer,
    notifications: notificationsReducer,
    ...injectedReducers,
    ...preloadedStateReducers,
  });
};

// We use a factory as it's more practicable for tests
// The application can import the configured store (the default export)
export const createReduxStore = (
  preloadedState = {},
  // additional middleware, used for testing
  additionalMiddlewares: Middleware[] = []
): TEnhancedStore => {
  const store = configureStore({
    preloadedState,
    reducer: createInternalReducer(undefined, preloadedState),
    devTools: {
      actionsDenylist: [SHOW_LOADING, HIDE_LOADING],
    },
    middleware: (getDefaultMiddleware) => [
      ...additionalMiddlewares,
      hideNotificationsMiddleware,
      notificationsMiddleware,
      sdkMiddleware,
      ...getDefaultMiddleware({
        // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
        serializableCheck: false,
      }),
      loggerMiddleware,
    ],
  });

  const enhancedStore = store as TEnhancedStore;

  // Enable reducers to be injected on runtime (see `<InjectReducer>`)
  enhancedStore.injectedReducers = {};
  enhancedStore.injectReducers = ({
    id,
    reducers,
  }: {
    id: string;
    reducers: ReducersMapObject;
  }) => {
    const hasReducerBeenInjected =
      Reflect.has(enhancedStore.injectedReducers, id) &&
      enhancedStore.injectedReducers[id] === reducers;

    if (!hasReducerBeenInjected) {
      // Keep track of the reducer by id, so we can check if it's been injected aleady
      enhancedStore.injectedReducers[id] = reducers;
      // ...when we create the new reducer though, we spread the reducers from each namespace
      enhancedStore.replaceReducer(
        createInternalReducer(mergeObjectValues(enhancedStore.injectedReducers))
      );
    }
  };
  enhancedStore.removeReducers = ({ id }: { id: string }) => {
    delete enhancedStore.injectedReducers[id];
    enhancedStore.replaceReducer(
      createInternalReducer(mergeObjectValues(enhancedStore.injectedReducers))
    );
  };
  return enhancedStore;
};

export default createReduxStore();
