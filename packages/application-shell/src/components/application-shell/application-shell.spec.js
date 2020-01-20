import React from 'react';
import { encode } from 'qss';
import xhrMock from 'xhr-mock';
import {
  render,
  wait,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { AuthenticationError, ApolloError } from 'apollo-server-errors';
import { useDispatch } from 'react-redux';
import { createMemoryHistory } from 'history';
import { createEnhancedHistory } from '@commercetools-frontend/browser-history';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  LOGOUT_REASONS,
  SHOW_LOADING,
  HIDE_LOADING,
} from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import LockedDiamondSVG from '@commercetools-frontend/assets/images/locked-diamond.svg';
import {
  applyMocksForExternalNetworkRequests,
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
  applyMocksForExternalNetworkRequests();
  jest.clearAllMocks();

  window.location.replace = jest.fn();
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
    await rendered.findByText('Application name: my-app');
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
    await rendered.findByText('OK');
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
    await rendered.findByText('Sorry! An unexpected error occured.');
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
    await rendered.findByText('We could not find this Project');
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
    await rendered.findByText(
      'Your Project is temporarily suspended due to maintenance.'
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
    await rendered.findByText('Your Project has been suspended');
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
    await rendered.findByText('Your trial has expired');
  });
});
describe('when project is about to expire (<14 days left)', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchProject: {
            project: ProjectMock.build({
              expiry: { isActive: false, daysLeft: 13 },
            }),
          },
        }),
      },
    });
  });
  it('should render global warning message', async () => {
    const rendered = renderApp();
    await rendered.findByText(
      /^Your project trial period will expire in 13 days\.(.*)$/
    );
  });
});
describe('when project is about to expire (14 days left)', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchProject: {
            project: ProjectMock.build({
              expiry: { isActive: false, daysLeft: 14 },
            }),
          },
        }),
      },
    });
  });
  it('should render global warning message', async () => {
    const rendered = renderApp();
    await rendered.findByText(
      /^Your project trial period will expire in 14 days\.(.*)$/
    );
  });
});
describe('when project is about to expire (>14 days left)', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchProject: {
            project: ProjectMock.build({
              expiry: { isActive: false, daysLeft: 15 },
            }),
          },
        }),
      },
    });
  });
  it('should not render global warning message', async () => {
    const rendered = renderApp();
    await wait(() => {
      expect(
        rendered.queryByText(/^Your project trial period will expire (.*)$/)
      ).not.toBeInTheDocument();
    });
  });
});
describe('when project is about to expire (0 days left)', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchProject: {
            project: ProjectMock.build({
              expiry: { isActive: false, daysLeft: 0 },
            }),
          },
        }),
      },
    });
  });
  it('should render global warning message', async () => {
    const rendered = renderApp();
    await rendered.findByText(
      /^Your project trial period will expire in 0 days\.(.*)$/
    );
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
    await rendered.findByText('Your project has not yet been initialized');
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
    await rendered.findByText('Not enough permissions to access this resource');
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
    await rendered.findByText('Project switcher');
    const input = await rendered.findByLabelText('Project switcher');
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
  it('should redirect to /login with reason "unauthorized"', async () => {
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
describe('when selecting project locale "de"', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: mocksForMc.createMockOperations() },
    });
  });
  it('should render data for locale "de"', async () => {
    const TestComponent = () => {
      const projectDataLocale = useApplicationContext(
        context => context.dataLocale
      );
      return <span>{`Data locale: ${projectDataLocale}`}</span>;
    };
    const rendered = renderApp(<TestComponent />);
    await rendered.findByText('Data locale: en');

    // Select a different locale
    const input = rendered.container.querySelector('[name="locale-switcher"]');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    rendered.getByText('de').click();
    await rendered.findByText('Data locale: de');
  });
});
describe('when project has only one language', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchProject: {
            project: ProjectMock.build({
              languages: ['en'],
            }),
          },
        }),
      },
    });
  });
  it('should not render locale switcher', async () => {
    const rendered = renderApp();
    await wait(() => {
      expect(
        rendered.container.querySelector('[name="locale-switcher"]')
      ).not.toBeInTheDocument();
    });
  });
});
describe('when user has no projects', () => {
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
  it('should not render project switcher', async () => {
    const rendered = renderApp();
    await wait(() => {
      expect(
        rendered.container.querySelector('[name="project-switcher"]')
      ).not.toBeInTheDocument();
    });
  });
});
describe('when user has no projects but a defaultProjectKey', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: {
        mc: mocksForMc.createMockOperations({
          FetchLoggedInUser: {
            me: UserMock.build({
              defaultProjectKey: 'test-1',
              projects: { total: 0, results: [] },
            }),
          },
        }),
      },
    });
  });
  it('should render back to project link', async () => {
    const rendered = renderApp();
    await rendered.findByText('Back to project');
  });
});
describe('when dispatching a loading notification', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: mocksForMc.createMockOperations() },
    });
  });
  it('should render loading info', async () => {
    const TestComponent = () => {
      const dispatch = useDispatch();
      return (
        <>
          <button
            onClick={() => {
              dispatch({ type: SHOW_LOADING, payload: 'test' });
            }}
          >
            {'Show loading'}
          </button>
          <button
            onClick={() => {
              dispatch({ type: HIDE_LOADING, payload: 'test' });
            }}
          >
            {'Hide loading'}
          </button>
        </>
      );
    };
    const rendered = renderApp(<TestComponent />);
    const showBtn = await rendered.findByText('Show loading');
    fireEvent.click(showBtn);
    await rendered.findByText('Processing...');
    const hideBtn = await rendered.findByText('Hide loading');
    fireEvent.click(hideBtn);
    await wait(() => {
      expect(rendered.queryByText('Processing...')).not.toBeInTheDocument();
    });
  });
});
