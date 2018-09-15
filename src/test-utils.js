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
import { createReduxStore } from './index';

// Reset memoryAdapter after each test, so that the next test accepts the
// defaultFlags param.
// This could also be moved into setup-test-framework, not sure which
// location is better for it.
afterEach(memoryAdapter.reset);

// This function renders any component within the application context.
// The context is not completely set up yet, some things are missing:
//   - Tracking on context
//   - Project information
//   - possibly more that I'm not aware of right now
//
//  We can add these things as we go and when we need them.

// Inspired by
// https://github.com/kentcdodds/react-testing-library-course/blob/2a5b1560656790bb1d9c055fba3845780b2c2c97/src/__tests__/react-router-03.js
// eslint-disable-next-line import/prefer-default-export
export const render = (
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
    // forwarding to react-testing-library
    ...renderOptions
  } = {}
) => ({
  ...rtlRender(
    <IntlProvider locale={locale}>
      <ApolloMockProvider mocks={mocks} addTypename={addTypename}>
        <ConfigureFlopFlip adapter={adpater} defaultFlags={flags}>
          <Router history={history}>{ui}</Router>
        </ConfigureFlopFlip>
      </ApolloMockProvider>
    </IntlProvider>,
    renderOptions
  ),
  // adding `history` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  history,
});

// Test setup for rendering with Redux
// We expose a sophisticated function because we plan to get rid of Redux
// Use this function only when your test actually needs Redux
export const renderWithRedux = (
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
