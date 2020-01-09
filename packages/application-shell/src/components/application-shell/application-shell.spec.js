import React from 'react';
import { encode } from 'qss';
import xhrMock from 'xhr-mock';
import {
  render,
  wait,
  waitForElement,
  fireEvent,
} from '@testing-library/react';
import { AuthenticationError, ApolloError } from 'apollo-server-errors';
import { createMemoryHistory } from 'history';
import { createEnhancedHistory } from '@commercetools-frontend/browser-history';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import LockedDiamondSVG from '@commercetools-frontend/assets/images/locked-diamond.svg';
import {
  createGraphqlMockServer,
  mocksForMc,
  UserMock,
  ProjectMock,
} from '../../../../../graphql-test-utils';
import selectProjectKeyFromUrl from '../../utils/select-project-key-from-url';
import { createApolloClient } from '../../configure-apollo';
import { STORAGE_KEYS } from '../../constants';
import ApplicationShellProvider from '../application-shell-provider';
import ApplicationShell from './application-shell';

jest.mock('@commercetools-frontend/sentry');
jest.mock('../../utils/select-project-key-from-url');

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

const renderApp = (ui, options = {}) => {
  const initialRoute = options.route || '/';
  const testHistory = createEnhancedHistory(
    createMemoryHistory({ initialEntries: [initialRoute] })
  );
  ApplicationShellProvider.history = testHistory;
  const testApolloClient = createApolloClient();
  ApplicationShellProvider.apolloClient = testApolloClient;
  const defaultProps = createTestProps();
  const props = {
    ...defaultProps,
    environment: { ...defaultProps.environment, ...options.environment },
  };
  const rendered = render(
    <ApplicationShell {...props} render={() => ui || <p>{'OK'}</p>} />
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
  selectProjectKeyFromUrl.mockClear();

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

describe('when rendering', () => {
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
    const rendered = renderApp(<TestComponent />);
    await waitForElement(() => rendered.getByText('Application name: my-app'));
  });
});
describe('when route does not contain a project key', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: mocksForMc.createMockOperations() },
    });
  });
  it('should not render NavBar', async () => {
    const rendered = renderApp();
    await waitForElement(() => rendered.getByText('OK'));
    rendered.history.push('/account');
    await wait(() => {
      expect(rendered.history.location.pathname).toBe('/account');
      expect(rendered.queryByTestId('left-navigation')).not.toBeInTheDocument();
    });
  });
});
describe('when user has no default project', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchLoggedInUser: {
            me: UserMock.build({
              defaultProjectKey: null,
              projects: { total: 0, results: [] },
            }),
          },
        }),
      },
    });
  });
  it('should redirect to project creation', async () => {
    const rendered = renderApp(null, {
      environment: {
        servedByProxy: 'true',
      },
    });
    await wait(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        '/account/projects/new'
      );
      expect(rendered.queryByText('OK')).not.toBeInTheDocument();
    });
  });
});
describe('when loading user fails with an unknown graphql error', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchLoggedInUser: {
            me: new ApolloError('Oops'),
          },
        }),
      },
    });
  });
  it('should render error page', async () => {
    const rendered = renderApp();
    await waitForElement(() =>
      rendered.getByText('Sorry! An unexpected error occured.')
    );
  });
});
describe('when loading user fails with an unauthorized graphql error', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchLoggedInUser: {
            me: new AuthenticationError('User is not authorized'),
          },
        }),
      },
    });
  });
  it('should redirect to "/logout" with reason unauthorized', async () => {
    const rendered = renderApp();
    const queryParams = encode({
      reason: LOGOUT_REASONS.UNAUTHORIZED,
    });
    await wait(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining(`/logout?${queryParams}`)
      );
      expect(rendered.queryByText('OK')).not.toBeInTheDocument();
    });
  });
});
describe('when loading user fails with a "was not found." graphql error message', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchLoggedInUser: {
            me: new Error('User was not found.'),
          },
        }),
      },
    });
  });
  it('should redirect to /logout with reason "deleted"', async () => {
    const rendered = renderApp();
    const queryParams = encode({
      reason: LOGOUT_REASONS.DELETED,
    });
    await wait(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        expect.stringContaining(`/logout?${queryParams}`)
      );
      expect(rendered.queryByText('OK')).not.toBeInTheDocument();
    });
  });
});
describe('when project is not found', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchProject: {
            project: null,
          },
        }),
      },
    });
  });
  it('should render "project not found" page', async () => {
    const rendered = renderApp();
    await waitForElement(() =>
      rendered.getByText('We could not find this Project')
    );
  });
});
describe('when project is temporarily suspended', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchProject: {
            project: ProjectMock.build({
              suspension: { isActive: true, reason: 'TemporaryMaintenance' },
            }),
          },
        }),
      },
    });
  });
  it('should render "project suspended" page', async () => {
    const rendered = renderApp();
    await waitForElement(() =>
      rendered.getByText(
        'Your Project is temporarily suspended due to maintenance.'
      )
    );
  });
});
describe('when project is suspended for another reason', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchProject: {
            project: ProjectMock.build({
              suspension: { isActive: true, reason: 'Other' },
            }),
          },
        }),
      },
    });
  });
  it('should render "project suspended" page', async () => {
    const rendered = renderApp();
    await waitForElement(() =>
      rendered.getByText('Your Project has been suspended')
    );
  });
});
describe('when project is expired', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchProject: {
            project: ProjectMock.build({
              expiry: { isActive: true },
            }),
          },
        }),
      },
    });
  });
  it('should render "project expired" page', async () => {
    const rendered = renderApp();
    await waitForElement(() => rendered.getByText('Your trial has expired'));
  });
});
describe('when project is not initialized', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchProject: {
            project: ProjectMock.build({
              initialized: false,
            }),
          },
        }),
      },
    });
  });
  it('should render "project not initialized" page', async () => {
    const rendered = renderApp();
    await waitForElement(() =>
      rendered.getByText('Your project has not yet been initialized')
    );
  });
});
describe('when user does not have permissions to access the project', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchProject: {
            project: ProjectMock.build({
              allAppliedPermissions: [],
            }),
          },
        }),
      },
    });
  });
  it('should render "unauthorized" page', async () => {
    const TestComponent = () => {
      const canViewDeveloperSettings = useIsAuthorized({
        demandedPermissions: ['ManageDeveloperSettings'],
        shouldMatchSomePermissions: true,
      });
      if (!canViewDeveloperSettings) {
        return (
          <MaintenancePageLayout
            imageSrc={LockedDiamondSVG}
            title="Not enough permissions to access this resource"
            paragraph1="We recommend to contact your project administrators for further questions."
          />
        );
      }
      return <p>{'OK'}</p>;
    };
    const rendered = renderApp(<TestComponent />);
    await waitForElement(() =>
      rendered.getByText('Not enough permissions to access this resource')
    );
  });
});
describe('when switching project', () => {
  let operations;
  beforeEach(() => {
    operations = mocksForMc.createMockOperations();
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: operations },
    });
    selectProjectKeyFromUrl.mockReturnValue(
      operations.FetchLoggedInUser.me.defaultProjectKey
    );
  });
  it('should render app for new project', async () => {
    const rendered = renderApp(
      <label id="project-switcher">{'Project switcher'}</label>
    );
    const nextProject = operations.FetchLoggedInUser.me.projects.results[1];
    await waitForElement(() => rendered.getByText('Project switcher'));
    const input = await waitForElement(() =>
      rendered.getByLabelText('Project switcher')
    );
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    rendered.getByText(nextProject.name).click();
    await wait(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        `/${nextProject.key}`
      );
    });
  });
});
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
    const rendered = renderApp(null, { route: '/foo' });
    const queryParams = encode({
      reason: LOGOUT_REASONS.UNAUTHORIZED,
      redirectTo: `${window.location.origin}/foo`,
    });
    await wait(() => {
      expect(window.location.replace).toHaveBeenCalledWith(
        `${window.location.origin}/login?${queryParams}`
      );
      expect(rendered.queryByText('OK')).not.toBeInTheDocument();
    });
  });
});
