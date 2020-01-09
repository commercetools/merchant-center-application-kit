import React from 'react';
import xhrMock from 'xhr-mock';
import { render, wait, waitForElement } from '@testing-library/react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import history from '@commercetools-frontend/browser-history';
import {
  createGraphqlMockServer,
  mocksForMc,
} from '../../../../../graphql-test-utils';
import { STORAGE_KEYS } from '../../constants';
import ApplicationShell from './application-shell';

jest.mock('@commercetools-frontend/sentry');

const createTestEnvironment = custom => ({
  applicationName: 'playground',
  frontendHost: 'localhost:3001',
  mcApiUrl: 'https://mc-api.commercetools.com',
  location: 'eu',
  env: 'development',
  cdnUrl: 'http://localhost:3001',
  servedByProxy: false,
  adminCenterUrl: 'https://admin.commercetools.com',
  ...custom,
});

const mockSuperfluousRequests = () => {
  xhrMock.post(/\/proxy\/mc-metrics\/metrics\/.*$/, {
    body: JSON.stringify({ message: 'ok' }),
  });
  xhrMock.get(/\.launchdarkly\.com\/.*$/, {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  });
  xhrMock.post(/\.launchdarkly\.com\/.*$/, {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  });
};

beforeEach(() => {
  xhrMock.setup();
  mockSuperfluousRequests();
  window.localStorage.setItem.mockClear();
  window.localStorage.getItem.mockClear();
  window.localStorage.removeItem.mockClear();
  window.location.replace = jest.fn();
  reportErrorToSentry.mockClear();

  window.localStorage.getItem.mockImplementation(key => {
    switch (key) {
      case STORAGE_KEYS.IS_AUTHENTICATED:
        return 'true';
      case STORAGE_KEYS.ACTIVE_PROJECT_KEY:
        return null;
      default:
        return null;
    }
  });
});
afterEach(() => {
  xhrMock.reset();
  xhrMock.teardown();
});

describe('rendering', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: mocksForMc.createMockOperations() },
    });
  });
  it('should pass environment into application context', async () => {
    const TestComponent = () => {
      const applicationName = useApplicationContext(
        context => context.environment.applicationName
      );
      return <p>{`Application name: ${applicationName}`}</p>;
    };
    const rendered = render(
      <ApplicationShell
        environment={createTestEnvironment()}
        onRegisterErrorListeners={jest.fn()}
        applicationMessages={{
          en: { 'CustomApp.title': 'Title en' },
          'en-US': { 'CustomApp.title': 'Title' },
          de: { 'CustomApp.title': 'Titel' },
        }}
        render={() => <TestComponent />}
      />
    );
    await waitForElement(() =>
      rendered.getByText('Application name: playground')
    );
  });
  describe('when route does not contain a project key', () => {
    it('should not render NavBar', async () => {
      const rendered = render(
        <ApplicationShell
          environment={createTestEnvironment()}
          onRegisterErrorListeners={jest.fn()}
          applicationMessages={{
            en: { 'CustomApp.title': 'Title en' },
            'en-US': { 'CustomApp.title': 'Title' },
            de: { 'CustomApp.title': 'Titel' },
          }}
          render={() => <p>{'OK'}</p>}
        />
      );
      await waitForElement(() => rendered.getByText('OK'));
      history.push('/account');
      await wait(() => {
        expect(history.location.pathname).toBe('/account');
        expect(
          rendered.queryByTestId('left-navigation')
        ).not.toBeInTheDocument();
      });
    });
  });
});
