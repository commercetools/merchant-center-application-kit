// This file allows consumers of the application-shell to test
// components rendered by the application shell.
// They should
// import { render } from ""@commercetools-frontend/application-shell/test-utils"
// and then use it together with react-testing-library.
import React from 'react';
import { Router } from 'react-router-dom';
import { render as rtlRender } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import { IntlProvider } from 'react-intl';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { MockedProvider as ApolloMockProvider } from 'react-apollo/test-utils';
import memoryAdapter from '@flopflip/memory-adapter';
import { Provider as StoreProvider } from 'react-redux';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { createReduxStore } from './configure-store';

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
};

const defaultPermissions = { canManageProject: true };

// Allow consumers of `render` to extend the defaults by passing an object
// or to completely omit the value by passing `null`
const mergeOptional = (defaultValue, value) =>
  value === null ? undefined : { ...defaultValue, ...value };

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
    // forwarding to react-testing-library
    ...renderOptions
  } = {}
) => {
  const mergedUser = mergeOptional(defaultUser, user);
  const mergedProject = mergeOptional(defaultProject, project);
  const mergedEnvironment = mergeOptional(defaultEnvironment, environment);
  return {
    ...rtlRender(
      <IntlProvider locale={locale}>
        <ApolloMockProvider mocks={mocks} addTypename={addTypename}>
          <ConfigureFlopFlip adapter={adpater} defaultFlags={flags}>
            <ApplicationContextProvider
              user={mergedUser}
              project={mergedProject && { ...mergedProject, permissions }}
              environment={mergedEnvironment}
              projectDataLocale={dataLocale}
            >
              <Router history={history}>{ui}</Router>
            </ApplicationContextProvider>
          </ConfigureFlopFlip>
        </ApolloMockProvider>
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
  };
};

// Test setup for rendering with Redux
// We expose a sophisticated function because we plan to get rid of Redux
// Use this function only when your test actually needs Redux
const renderWithRedux = (
  ui,
  {
    // Consuemrs of renderWithRedux can use
    //   { store: createReduxStore({ requestsInFlight: null, .. }) }
    // to pass an initial state to Redux.
    store = createReduxStore(),
    ...renderOptions
  } = {}
) => ({
  ...render(<StoreProvider store={store}>{ui}</StoreProvider>, renderOptions),
  // adding `store` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  store,
});

// re-export everything
export * from 'react-testing-library';

export {
  // override render method of react-testing-library
  render,
  renderWithRedux,
  // the original "render" method of react-testing-library
  rtlRender,
};
