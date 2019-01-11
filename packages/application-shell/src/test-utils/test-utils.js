import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import invariant from 'tiny-invariant';
import { ApolloProvider } from 'react-apollo';
import { render as rtlRender } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import { IntlProvider } from 'react-intl';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { MockedProvider as ApolloMockProvider } from 'react-apollo/test-utils';
import memoryAdapter from '@flopflip/memory-adapter';
import { Provider as StoreProvider } from 'react-redux';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { NotificationsList } from '@commercetools-frontend/react-notifications';
import { DOMAINS } from '@commercetools-frontend/constants';
import { createTestMiddleware as createSdkTestMiddleware } from '@commercetools-frontend/sdk/test-utils';
import { GtmContext } from '../components/gtm-booter';
import { createReduxStore } from '../configure-store';
import { createApolloClientForBackendApi } from '../configure-apollo';

// Reset memoryAdapter after each test, so that the next test accepts the
// defaultFlags param.
// This could also be moved into setup-test-framework, not sure which
// location is better for it.
afterEach(memoryAdapter.reset);

// These default values get merged with the values provided by the test from
// the call to "render"
const defaultUser = {
  id: 'user-id-1',
  email: 'sheldon.cooper@caltech.edu',
  firstName: 'Sheldon',
  lastName: 'Cooper',
  language: 'en',
  timeZone: 'Etc/UTC',
};

const defaultEnvironment = {
  frontendHost: 'localhost:3001',
  mcApiUrl: 'https://mc-api.commercetools.com',
  location: 'eu',
  env: 'production',
  cdnUrl: 'http://localhost:3001',
  servedByProxy: false,
};

const defaultProject = {
  key: 'test-with-big-data',
  version: 43,
  name: 'Test with big data',
  countries: ['de', 'en'],
  currencies: ['EUR', 'GBP'],
  languages: ['de', 'en-GB'],
  owner: {
    id: 'project-id-1',
  },
};

const defaultPermissions = { canManageProject: true };

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
const render = (
  ui,
  {
    // react-intl
    locale = 'en',
    // Apollo
    mocks = [],
    addTypename = false,
    // react-router
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    // flopflip
    adpater = memoryAdapter,
    flags = {},
    // application-context
    environment,
    user,
    project,
    permissions = defaultPermissions,
    dataLocale = 'en',
    ApolloProviderComponent = MockedApolloProvider,
    // gtm-context
    gtmTracking = defaultGtmTracking,
    // forwarding to react-testing-library
    ...renderOptions
  } = {}
) => {
  const mergedUser = mergeOptional(defaultUser, user);
  const mergedProject = mergeOptional(defaultProject, project);
  const mergedEnvironment = mergeOptional(defaultEnvironment, environment);
  const mergedGtmTracking = mergeOptional(defaultGtmTracking, gtmTracking);
  return {
    ...rtlRender(
      <IntlProvider locale={locale}>
        <ApolloProviderComponent mocks={mocks} addTypename={addTypename}>
          <ConfigureFlopFlip adapter={adpater} defaultFlags={flags}>
            <ApplicationContextProvider
              user={mergedUser}
              project={
                mergedProject && {
                  ...mergedProject,
                  permissions,
                }
              }
              environment={mergedEnvironment}
              projectDataLocale={dataLocale}
            >
              <GtmContext.Provider value={mergedGtmTracking}>
                <Router history={history}>
                  <React.Suspense fallback={<LoadingFallback />}>
                    {ui}
                  </React.Suspense>
                </Router>
              </GtmContext.Provider>
            </ApplicationContextProvider>
          </ConfigureFlopFlip>
        </ApolloProviderComponent>
      </IntlProvider>,
      renderOptions
    ),
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
const renderWithRedux = (
  ui,
  {
    // The store option is kept around to keep the API open as not all use-cases
    // are known yet. Meanwhile storeState and sdkMocks provide convenient ways
    // to work with the redux store.
    store = undefined,
    // Pass an initial state to Redux store.
    storeState = undefined,
    // renderWithRedux supports mocking requests made through the sdk
    // middleware. The approach is inspired by ApolloMockProvider.
    // You can pass responses for specific actions like
    //   renderWithRedux(ui, {
    //     sdkMocks: [
    //       {
    //         action: { type: 'SDK', payload: {}},
    //         response: { foo: true },
    //       }
    //     ]
    //   })
    // You can also fake a failing request using
    //   renderWithRedux(ui, {
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

  return {
    ...render(
      <StoreProvider store={reduxStore}>
        <div>
          <NotificationsList domain={DOMAINS.GLOBAL} />
          <NotificationsList domain={DOMAINS.PAGE} />
          <NotificationsList domain={DOMAINS.SIDE} />
          {ui}
        </div>
      </StoreProvider>,
      renderOptions
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store: reduxStore,
  };
};

// Renders UI without mocking ApolloProvider
const experimentalRender = (ui, renderOptions) => {
  const client = createApolloClientForBackendApi();
  const RealApolloProvider = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  );
  RealApolloProvider.displayName = 'RealApolloProvider';
  RealApolloProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return renderWithRedux(ui, {
    ...renderOptions,
    ApolloProviderComponent: RealApolloProvider,
  });
};

// re-export everything
export * from 'react-testing-library';

export {
  // override render method of react-testing-library
  render,
  renderWithRedux,
  experimentalRender,
  // the original "render" method of react-testing-library
  rtlRender,
};
