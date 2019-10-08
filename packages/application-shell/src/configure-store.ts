import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
  ReducersMapObject,
  Middleware,
  StoreEnhancer,
} from 'redux';
import thunk from 'redux-thunk';
import {
  middleware as notificationsMiddleware,
  reducer as notificationsReducer,
} from '@commercetools-frontend/notifications';
import { createMiddleware as createSdkMiddleware } from '@commercetools-frontend/sdk';
import {
  SHOW_LOADING,
  HIDE_LOADING,
  ApplicationWindow,
} from '@commercetools-frontend/constants';
import hideNotificationsMiddleware from './middleware/hide-notifications';
import loggerMiddleware from './middleware/logger';
import { requestsInFlightReducer } from './components/requests-in-flight-loader';
import apolloClient from './configure-apollo';
import {
  getCorrelationId,
  selectProjectKeyFromUrl,
  selectTeamIdFromLocalStorage,
  selectUserId,
} from './utils';

interface ApplicationWindowWithDevtools extends ApplicationWindow {
  __REDUX_DEVTOOLS_EXTENSION__: (config?: {
    actionsBlacklist: string[];
  }) => StoreEnhancer<unknown, {}>;
}
declare let window: ApplicationWindowWithDevtools;

type TEnhancedStore = {
  injectedReducers: { [key: string]: ReducersMapObject };
  injectReducers: (payload: {
    id: string;
    reducers: ReducersMapObject;
  }) => void;
  removeReducers: (payload: { id: string }) => void;
};

const identityStoreEnhancer: StoreEnhancer<unknown, {}> = noop => noop;

const mergeObjectValues = <T>(object: { [key: string]: T }) =>
  Object.entries<T>(object).reduce(
    (acc, [, value]) => ({ ...acc, ...value }),
    {}
  );

const patchedGetCorrelationId = () =>
  getCorrelationId({
    userId: selectUserId({ apolloCache: apolloClient }),
  });

const createInternalReducer = (injectedReducers: ReducersMapObject = {}) =>
  combineReducers<unknown>({
    requestsInFlight: requestsInFlightReducer,
    notifications: notificationsReducer,
    ...injectedReducers,
  });

const sdkMiddleware = createSdkMiddleware({
  getCorrelationId: patchedGetCorrelationId,
  getProjectKey: selectProjectKeyFromUrl,
  getTeamId: selectTeamIdFromLocalStorage,
});

export const applyDefaultMiddlewares = (...middlewares: Middleware[]) =>
  applyMiddleware(...middlewares, thunk, loggerMiddleware);

// We use a factory as it's more practicable for tests
// The application can import the configured store (the default export)
export const createReduxStore = (
  preloadedState = { requestsInFlight: undefined },
  // additional middleware, used for testing
  additionalMiddlewares: Middleware[] = []
) => {
  const store = createStore(
    createInternalReducer(),
    preloadedState,
    compose(
      applyDefaultMiddlewares(
        ...additionalMiddlewares,
        hideNotificationsMiddleware,
        notificationsMiddleware,
        sdkMiddleware
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__({
            actionsBlacklist: [SHOW_LOADING, HIDE_LOADING],
          })
        : identityStoreEnhancer
    )
  );

  const enhancedStore = store as typeof store & TEnhancedStore;

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
