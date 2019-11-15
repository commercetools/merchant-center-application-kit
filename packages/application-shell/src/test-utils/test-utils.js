import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import invariant from 'tiny-invariant';
import { ApolloProvider } from 'react-apollo';
import * as rtl from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { IntlProvider } from 'react-intl';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { MockedProvider as ApolloMockProvider } from '@apollo/react-testing';
import memoryAdapter from '@flopflip/memory-adapter';
import { Provider as StoreProvider } from 'react-redux';
import { createEnhancedHistory } from '@commercetools-frontend/browser-history';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import {
  NotificationsList,
  NotificationProviderForCustomComponent,
} from '@commercetools-frontend/react-notifications';
import { DOMAINS } from '@commercetools-frontend/constants';
// eslint-disable-next-line import/named
import { createTestMiddleware as createSdkTestMiddleware } from '@commercetools-frontend/sdk/test-utils';
import { GtmContext } from '../components/gtm-booter';
import { createReduxStore } from '../configure-store';
import { createApolloClient } from '../configure-apollo';

// Reset memoryAdapter after each test, so that the next test accepts the
// defaultFlags param.
// This could also be moved into setup-test-framework, not sure which
// location is better for it.
afterEach(memoryAdapter.reset);

// These default values get merged with the values provided by the test from
// the call to "render"

const defaultProject = {
  key: 'test-with-big-data',
  version: 43,
  name: 'Test with big data',
  countries: ['de', 'en'],
  currencies: ['EUR', 'GBP'],
  languages: ['de', 'en-GB', 'en'],
  owner: {
    id: 'project-id-1',
  },
  initialized: true,
  expiry: {
    isActive: false,
    daysLeft: undefined,
  },
  suspension: {
    isActive: false,
  },
  allAppliedPermissions: [],
  allAppliedActionRights: [],
  allAppliedMenuVisibilities: [],
  allAppliedDataFences: [],
};

const defaultUser = {
  id: 'user-id-1',
  email: 'sheldon.cooper@caltech.edu',
  firstName: 'Sheldon',
  lastName: 'Cooper',
  language: 'en',
  timeZone: 'Etc/UTC',
  numberFormat: 'en',
  defaultProjectKey: defaultProject.key,
  projects: {
    total: 1,
    results: [defaultProject],
  },
  gravatarHash: 'aaa',
  launchdarklyTrackingGroup: 'commercetools',
  launchdarklyTrackingId: '111',
  launchdarklyTrackingTeam: undefined,
  launchdarklyTrackingTenant: 'gcp-eu',
};

const defaultEnvironment = {
  applicationName: 'my-app',
  frontendHost: 'localhost:3001',
  mcApiUrl: 'https://mc-api.commercetools.com',
  location: 'eu',
  env: 'production',
  cdnUrl: 'http://localhost:3001',
  servedByProxy: false,
};

// Allow consumers of `render` to extend the defaults by passing an object
// or to completely omit the value by passing `null`
const mergeOptional = (defaultValue, value) =>
  value === null ? undefined : { ...defaultValue, ...value };

const LoadingFallback = () => 'Loading...';
LoadingFallback.displayName = 'LoadingFallback';

const MockedApolloProvider = ({ children, mocks, addTypename }) => (
  <ApolloMockProvider mocks={mocks} addTypename={addTypename}>
    {children}
  </ApolloMockProvider>
);
MockedApolloProvider.displayName = 'MockedApolloProvider';
MockedApolloProvider.propTypes = {
  children: PropTypes.node.isRequired,
  mocks: PropTypes.array.isRequired,
  addTypename: PropTypes.bool.isRequired,
};

const defaultGtmTracking = {
  track: jest.fn(),
  getHierarchy: jest.fn(),
};
const defaultFlopflipAdapterArgs = {};

// For backwards compatibility we need to denormalize the given `permissions` option
// (which is now deprecated) to `allAppliedPermissions`, in order to pass the value
// to the `project` prop in the application context provider.
// From:
// {
//   permissions: {
//     canManageProjectSettings: true
//   }
// }
// To:
// {
//   allAppliedPermissions: [
//     { name: 'canManageProjectSettings', value: true }
//   ]
// }
const denormalizePermissions = permissions => {
  if (!permissions) return;
  return Object.keys(permissions).reduce(
    (allAppliedPermissions, permissionKey) => [
      ...allAppliedPermissions,
      { name: permissionKey, value: permissions[permissionKey] },
    ],
    []
  );
};
// For backwards compatibility we need to denormalize the given `actionRights` option
// (which is now deprecated) to `allAppliedActionRights`, in order to pass the value
// to the `project` prop in the application context provider.
// From:
// {
//   actionRights: {
//     products: {
//       canEditPrices: true,
//       canPublishProducts: false,
//     }
//   }
// }
// To:
// {
//   allAppliedActionRights: [
//     { group: 'products', name: 'canEditPrices', value: true },
//     { group: 'products', name: 'canPublishProducts', value: false }
//   ]
// }
const denormalizeActionRights = actionRights => {
  if (!actionRights) return;
  return Object.keys(actionRights).reduce(
    (allAppliedActionRights, actionRightGroup) => [
      ...allAppliedActionRights,
      ...Object.keys(actionRights[actionRightGroup]).reduce(
        (allActionRightsByGroup, actionRightKey) => [
          ...allActionRightsByGroup,
          {
            group: actionRightGroup,
            name: actionRightKey,
            value: actionRights[actionRightGroup][actionRightKey],
          },
        ]
      ),
    ],
    []
  );
};
// For backwards compatibility we need to denormalize the given `dataFences` option
// (which is now deprecated) to `allAppliedDataFences`, in order to pass the value
// to the `project` prop in the application context provider.
// From:
// {
//   dataFences: {
//     store: {
//       orders: {
//         canViewOrders: {
//           values: ['store-1'],
//         }
//       }
//     }
//   }
// }
// To:
// {
//   allAppliedDataFences: [
//     { type: 'store', group: 'orders', name: 'canViewOrders', value: 'store-1' }
//   ]
// }
const denormalizeDataFences = dataFences => {
  if (!dataFences) return;
  return Object.keys(dataFences).reduce(
    (allAppliedDataFences, dataFenceGroupKey) => {
      switch (dataFenceGroupKey) {
        case 'store':
          return [
            ...allAppliedDataFences,
            ...Object.keys(dataFences.store).reduce(
              (allResources, resourceType) => [
                ...allResources,
                ...Object.keys(dataFences.store[resourceType]).reduce(
                  (allPermissions, permissionKey) => [
                    ...allPermissions,
                    ...dataFences.store[resourceType][permissionKey].values.map(
                      value => ({
                        __typename: 'StoreDataFence',
                        type: 'store',
                        value,
                        group: resourceType,
                        name: permissionKey,
                      })
                    ),
                  ],
                  []
                ),
              ],
              []
            ),
          ];
        default:
          return allAppliedDataFences;
      }
    },
    []
  );
};

const wrapIfNeeded = (wrapper, children) =>
  wrapper ? React.createElement(wrapper, null, children) : children;

// This function renders any component within the application context, as if it
// was rendered inside <ApplicationShell />.
// The context is not completely set up yet, some things are missing:
//   - Tracking on context
//   - react-intl's information from addLocaleData
//   - possibly more that I'm not aware of right now
//
//  We can add these things as we go and when we need them.

// Inspired by
// https://github.com/kentcdodds/react-testing-library-course/blob/2a5b1560656790bb1d9c055fba3845780b2c2c97/src/__tests__/react-router-03.js
const renderApp = (
  ui,
  {
    // react-intl
    locale = 'en',
    // Apollo
    mocks = [],
    addTypename = false,
    // react-router
    route = '/',
    history = createEnhancedHistory(
      createMemoryHistory({ initialEntries: [route] })
    ),
    // flopflip
    adapter = memoryAdapter,
    flags = {},
    // application-context
    environment,
    user,
    project,
    permissions, // <-- deprecated option, use `{ project: { allAppliedPermissions } }`
    actionRights, // <-- deprecated option, use `{ project: { allAppliedActionRights } }`
    dataFences, // <-- deprecated option, use `{ project: { allAppliedDataFences } }`
    dataLocale = 'en',
    ApolloProviderComponent = MockedApolloProvider,
    // gtm-context
    gtmTracking = defaultGtmTracking,
    // forwarding to @testing-library/react
    ...renderOptions
  } = {}
) => {
  const mergedUser = mergeOptional(defaultUser, user);
  const mergedProject = mergeOptional(defaultProject, project);
  const mergedEnvironment = mergeOptional(defaultEnvironment, environment);
  const mergedGtmTracking = mergeOptional(defaultGtmTracking, gtmTracking);

  const ApplicationProviders = ({ children }) => (
    <IntlProvider locale={locale}>
      <ApolloProviderComponent mocks={mocks} addTypename={addTypename}>
        <ConfigureFlopFlip
          adapter={adapter}
          defaultFlags={flags}
          adapterArgs={defaultFlopflipAdapterArgs}
        >
          <ApplicationContextProvider
            user={mergedUser}
            project={
              mergedProject && {
                ...mergedProject,
                allAppliedPermissions: denormalizePermissions(permissions),
                allAppliedActionRights: denormalizeActionRights(actionRights),
                allAppliedDataFences: denormalizeDataFences(dataFences),
              }
            }
            environment={mergedEnvironment}
            projectDataLocale={dataLocale}
          >
            <GtmContext.Provider value={mergedGtmTracking}>
              <Router history={history}>
                <React.Suspense fallback={<LoadingFallback />}>
                  {children}
                </React.Suspense>
              </Router>
            </GtmContext.Provider>
          </ApplicationContextProvider>
        </ConfigureFlopFlip>
      </ApolloProviderComponent>
    </IntlProvider>
  );
  ApplicationProviders.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const rendered = rtl.render(ui, {
    ...renderOptions,
    wrapper: ({ children }) =>
      wrapIfNeeded(
        ApplicationProviders,
        wrapIfNeeded(renderOptions.wrapper, children)
      ),
  });

  return {
    ...rendered,

    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
    // Adding user, project & environment so tests know about the merge results
    // Note that these objects do not resemble the application context, they are
    // only intended to communicate the test setup back to the tests.
    user: mergedUser,
    project: mergedProject,
    environment: mergedEnvironment,
    // Adding gtmTracking to the returned utilities to allow us
    // to reference it in our tests.
    gtmTracking: mergedGtmTracking,
  };
};

// Test setup for rendering with Redux
// We expose a sophisticated function because we plan to get rid of Redux
// Use this function only when your test actually needs Redux
const renderAppWithRedux = (
  ui,
  {
    // The store option is kept around to keep the API open as not all use-cases
    // are known yet. Meanwhile storeState and sdkMocks provide convenient ways
    // to work with the redux store.
    store = undefined,
    // Pass an initial state to Redux store.
    storeState = undefined,
    // renderAppWithRedux supports mocking requests made through the sdk
    // middleware. The approach is inspired by ApolloMockProvider.
    // You can pass responses for specific actions like
    //   renderAppWithRedux(ui, {
    //     sdkMocks: [
    //       {
    //         action: { type: 'SDK', payload: {}},
    //         response: { foo: true },
    //       }
    //     ]
    //   })
    // You can also fake a failing request using
    //   renderAppWithRedux(ui, {
    //     sdkMocks: [
    //       {
    //         action: { type: 'SDK', payload: {}},
    //         error: new Error('foo'),
    //       }
    //     ]
    //   })
    // Note that each response will only be used once. When multiple responses
    // are provided for identical actions, then they are used in the order
    // they are provided in.
    sdkMocks = [],
    // Pass a function to map custom notification components
    mapNotificationToComponent = () => {},
    ...renderOptions
  } = {}
) => {
  invariant(
    !(store && storeState),
    'test-utils: You provided both `store` and `storeState`. Please provide only one of them.'
  );
  invariant(
    !(store && sdkMocks.length > 0),
    'test-utils: You provided both `store` and `sdkMocks`. Please provide only one of them.'
  );

  // Determine the redux store to use in tests.
  // - When the user passed in a "store", we use that store and ignore
  //   sdkMocks and storeState.
  // - When the user passed in no sdkMocks, we create a store using the
  //   provided storeState. If storeState is undefined, then the defaults kick
  //   in anyways.
  // - Lastly, when sdkMocks were provided (and no store was provided), we
  //   create a store which applies a special middleware to allow mocking sdk
  //   responses. We further initialize the store with the provided storeState.
  //   If storeState is undefined, then the defaults kick in anyways.
  const reduxStore = (() => {
    if (store) return store;

    if (sdkMocks.length === 0) return createReduxStore(storeState);

    const testingMiddleware = createSdkTestMiddleware(sdkMocks);
    return createReduxStore(storeState, [testingMiddleware]);
  })();

  const ReduxProviders = ({ children }) => (
    <NotificationProviderForCustomComponent
      mapNotificationToComponent={mapNotificationToComponent}
    >
      <StoreProvider store={reduxStore}>
        <div>
          <NotificationsList domain={DOMAINS.GLOBAL} />
          <NotificationsList domain={DOMAINS.PAGE} />
          <NotificationsList domain={DOMAINS.SIDE} />
          {children}
        </div>
      </StoreProvider>
    </NotificationProviderForCustomComponent>
  );
  ReduxProviders.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const rendered = renderApp(ui, {
    ...renderOptions,
    wrapper: ({ children }) =>
      wrapIfNeeded(
        ReduxProviders,
        wrapIfNeeded(renderOptions.wrapper, children)
      ),
  });

  return {
    ...rendered,
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store: reduxStore,
  };
};

// Renders UI without mocking ApolloProvider
const experimentalRenderAppWithRedux = (ui, renderOptions) => {
  const client = createApolloClient();
  const RealApolloProvider = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  );
  RealApolloProvider.displayName = 'RealApolloProvider';
  RealApolloProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return renderAppWithRedux(ui, {
    ...renderOptions,
    ApolloProviderComponent: RealApolloProvider,
  });
};

// re-export everything
export * from '@testing-library/react';

export { renderApp, renderAppWithRedux, experimentalRenderAppWithRedux };
