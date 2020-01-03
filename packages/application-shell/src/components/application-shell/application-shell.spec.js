import React from 'react';
import { encode } from 'qss';
import xhrMock from 'xhr-mock';
import { render, wait, waitForElement } from '@testing-library/react';
import { AuthenticationError, ApolloError } from 'apollo-server-errors';
import { createMemoryHistory } from 'history';
import defaultHistory, {
  createEnhancedHistory,
} from '@commercetools-frontend/browser-history';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import {
  createGraphqlMockServer,
  getDefaultFixturesFor,
} from '../../test-utils/graphql-mock';
import * as appShellUtils from '../../utils';
import ApplicationShellProvider from '../application-shell-provider';
import ApplicationShell from './application-shell';

jest.mock('@commercetools-frontend/sentry');
jest.mock('../../utils');

const createTestProps = props => ({
  environment: {
    applicationName: 'my-app',
    frontendHost: 'localhost:3001',
    mcApiUrl: 'https://mc-api.commercetools.com',
    location: 'eu',
    env: 'development',
    cdnUrl: 'http://localhost:3001',
    servedByProxy: 'false',
    enableSignUp: 'true',
  },
  featureFlags: {},
  defaultFeatureFlags: {},
  trackingEventWhitelist: {},
  onRegisterErrorListeners: jest.fn(),
  onMenuItemClick: jest.fn(),
  applicationMessages: {
    en: { 'CustomApp.title': 'Title en' },
    'en-US': { 'CustomApp.title': 'Title' },
    de: { 'CustomApp.title': 'Titel' },
  },
  ...props,
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

const renderApp = (options = {}) => {
  const initialRoute = options.route || '/foo';
  const testHistory = createEnhancedHistory(
    createMemoryHistory({ initialEntries: [initialRoute] })
  );
  ApplicationShellProvider.history = testHistory;
  const defaultProps = createTestProps();
  const props = {
    ...defaultProps,
    environment: { ...defaultProps.environment, ...options.environment },
  };
  const rendered = render(
    <ApplicationShell {...props} render={() => <span>{'Hello world'}</span>} />
  );
  return { ...rendered, history: testHistory };
};

beforeEach(() => {
  xhrMock.setup();
  mockSuperfluousRequests();
  window.localStorage.setItem.mockClear();
  window.localStorage.getItem.mockClear();
  window.localStorage.removeItem.mockClear();
  window.location.replace = jest.fn();
  reportErrorToSentry.mockClear();
  window.localStorage.getItem.mockReturnValue('true');
  ApplicationShellProvider.history = defaultHistory;
  appShellUtils.getPreviousProjectKey.mockClear();
});
afterEach(() => {
  xhrMock.reset();
  xhrMock.teardown();
});

describe('rendering', () => {
  describe('when user is not authenticated', () => {
    beforeEach(() => {
      window.localStorage.getItem.mockReturnValue(null);
      createGraphqlMockServer(xhrMock, {
        onRequest: async (req, res, next) => {
          const body = JSON.parse(req.body());
          if (body.operationName === 'AmILoggedIn') {
            return res
              .status(401)
              .body(JSON.stringify({ message: 'Unauthorized' }));
          }
          return next();
        },
      });
    });
    it('redirect to /login with reason "unauthorized"', async () => {
      const rendered = renderApp();
      await wait(() => {
        expect(window.location.replace).toHaveBeenCalledWith(
          `${window.location.origin}/login?${encode({
            reason: LOGOUT_REASONS.UNAUTHORIZED,
            redirectTo: `${window.location.origin}/foo`,
          })}`
        );
      });
      expect(rendered.queryByText('Hello world')).not.toBeInTheDocument();
    });
  });
  describe('when user is authenticated', () => {
    describe('when route is /logout', () => {
      beforeEach(() => {
        createGraphqlMockServer(xhrMock);
      });
      it('should redirect to /logout with reason "user"', async () => {
        const rendered = renderApp({ route: '/logout' });
        await wait(() => {
          expect(window.location.replace).toHaveBeenCalledWith(
            `${window.location.origin}/logout?${encode({
              reason: LOGOUT_REASONS.USER,
              redirectTo: window.location.origin,
            })}`
          );
        });
        expect(rendered.queryByText('Hello world')).not.toBeInTheDocument();
      });
    });
    describe('when route is /account', () => {
      beforeEach(() => {
        createGraphqlMockServer(xhrMock);
        appShellUtils.getPreviousProjectKey.mockReturnValue('test-project-key');
      });
      it('should render app as it is', async () => {
        const rendered = renderApp({ route: '/account' });
        await wait(() => {
          expect(rendered.queryByText('Hello world')).toBeInTheDocument();
        });
        expect(rendered.history.location.pathname).toBe('/account');
      });
    });
    describe('when route is /', () => {
      beforeEach(() => {
        createGraphqlMockServer(xhrMock);
        appShellUtils.getPreviousProjectKey.mockReturnValue('test-project-key');
      });
      it('should redirect to project URL and render app', async () => {
        const rendered = renderApp({ route: '/' });
        await wait(() => {
          expect(rendered.queryByText('Hello world')).toBeInTheDocument();
        });
        expect(rendered.history.location.pathname).toBe('/test-project-key');
      });
    });
    describe('when user has no default project', () => {
      beforeEach(() => {
        createGraphqlMockServer(xhrMock);
        appShellUtils.getPreviousProjectKey.mockReturnValue(null);
      });
      it('should redirect to project creation', async () => {
        const rendered = renderApp({
          route: '/',
          environment: {
            servedByProxy: 'true',
          },
        });
        await wait(() => {
          expect(window.location.replace).toHaveBeenCalledWith(
            '/account/projects/new'
          );
        });
        expect(rendered.queryByText('Hello world')).not.toBeInTheDocument();
      });
    });
    describe('when user has no projects and signup is disabled and app is running on production', () => {
      beforeEach(() => {
        const mcFixtures = getDefaultFixturesFor('mc');
        createGraphqlMockServer(xhrMock, {
          resolvers: {
            mc: {
              query: {
                me: () =>
                  mcFixtures.User.attr('projects', {
                    total: 0,
                    results: [],
                  }).build(),
              },
            },
          },
        });
        appShellUtils.getPreviousProjectKey.mockReturnValue('something');
      });
      it('should redirect to /logout with reason param', async () => {
        const rendered = renderApp({
          route: '/',
          environment: {
            servedByProxy: 'true',
            enableSignUp: 'false',
          },
        });
        await wait(() => {
          expect(window.location.replace).toHaveBeenCalledWith(
            `${window.location.origin}/logout?${encode({
              reason: 'no-projects',
            })}`
          );
        });
        expect(rendered.queryByText('Hello world')).not.toBeInTheDocument();
      });
    });
    describe('when user has no projects and signup is enabled', () => {
      beforeEach(() => {
        const mcFixtures = getDefaultFixturesFor('mc');
        createGraphqlMockServer(xhrMock, {
          resolvers: {
            mc: {
              query: {
                me: () =>
                  mcFixtures.User.attr('projects', {
                    total: 0,
                    results: [],
                  }).build(),
              },
            },
          },
        });
        appShellUtils.getPreviousProjectKey.mockReturnValue('something');
      });
      it('should redirect to project creation', async () => {
        const rendered = renderApp({
          route: '/',
          environment: {
            servedByProxy: 'true',
          },
        });
        await wait(() => {
          expect(window.location.replace).toHaveBeenCalledWith(
            '/account/projects/new'
          );
        });
        expect(rendered.queryByText('Hello world')).not.toBeInTheDocument();
      });
    });

    describe('when loading user fails with an unknown graphql error', () => {
      beforeEach(() => {
        createGraphqlMockServer(xhrMock, {
          resolvers: {
            mc: {
              query: {
                me: () => {
                  throw new ApolloError('Oops');
                },
              },
            },
          },
        });
      });
      it('should render error page', async () => {
        const rendered = renderApp();
        await waitForElement(() =>
          rendered.getByText('Sorry! An unexpected error occured.')
        );
        expect(rendered.queryByText('Hello world')).not.toBeInTheDocument();
        expect(reportErrorToSentry).toHaveBeenCalledWith(
          expect.objectContaining({
            graphQLErrors: expect.arrayContaining([
              expect.objectContaining({ message: 'Oops' }),
            ]),
          }),
          {}
        );
      });
    });
    describe('when loading user fails with an unauthorized graphql error', () => {
      beforeEach(() => {
        createGraphqlMockServer(xhrMock, {
          resolvers: {
            mc: {
              query: {
                me: () => {
                  throw new AuthenticationError('User is not authorized');
                },
              },
            },
          },
        });
      });
      it('should redirect to /logout with reason "unauthorized"', async () => {
        const rendered = renderApp();
        await wait(() => {
          expect(window.location.replace).toHaveBeenCalledWith(
            `${window.location.origin}/logout?${encode({
              reason: LOGOUT_REASONS.UNAUTHORIZED,
            })}`
          );
        });
        expect(rendered.queryByText('Hello world')).not.toBeInTheDocument();
      });
    });
    describe('when loading user fails with a "was not found." graphql error message', () => {
      beforeEach(() => {
        createGraphqlMockServer(xhrMock, {
          resolvers: {
            mc: {
              query: {
                me: () => {
                  throw new Error('User was not found.');
                },
              },
            },
          },
        });
      });
      it('should redirect to /logout with reason "deleted"', async () => {
        const rendered = renderApp();
        await wait(() => {
          expect(window.location.replace).toHaveBeenCalledWith(
            `${window.location.origin}/logout?${encode({
              reason: LOGOUT_REASONS.DELETED,
            })}`
          );
        });
        expect(rendered.queryByText('Hello world')).not.toBeInTheDocument();
      });
    });

    describe('when project is not found', () => {
      it.todo('should render page not found');
    });
    describe('when project is suspended', () => {
      it.todo('should render project suspended page');
    });
    describe('when project is expired', () => {
      it.todo('should render project expired page');
    });
    describe('when project is not initialized', () => {
      it.todo('should render project not initialized page');
    });
  });
});
