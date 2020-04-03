import React from 'react';
import { encode } from 'qss';
import xhrMock from 'xhr-mock';
import { render, waitFor, fireEvent, within } from '@testing-library/react';
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
  mocksForProxy,
  mocksForSettings,
  UserMock,
  ProjectMock,
  ApplicationNavbarMenuMock,
  ApplicationNavbarSubmenuMock,
} from '../../../../../graphql-test-utils';
import { createApolloClient } from '../../configure-apollo';
import { STORAGE_KEYS } from '../../constants';
import { PROJECT_EXTENSIONS } from '../../feature-toggles';
import { location } from '../../utils/location';
import ApplicationShellProvider from '../application-shell-provider';
import ApplicationShell from './application-shell';

jest.mock('@commercetools-frontend/sentry');
jest.mock('../../utils/location');

const createTestProps = (props) => ({
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
  const { route, ...customProps } = options;
  const initialRoute = route || '/';
  const testHistory = createEnhancedHistory(
    createMemoryHistory({ initialEntries: [initialRoute] })
  );
  ApplicationShellProvider.history = testHistory;
  const testApolloClient = createApolloClient();
  ApplicationShellProvider.apolloClient = testApolloClient;
  const defaultProps = createTestProps();
  const props = {
    ...defaultProps,
    ...customProps,
    environment: { ...defaultProps.environment, ...customProps.environment },
  };
  const rendered = render(
    <ApplicationShell {...props} render={() => ui || <p>{'OK'}</p>} />
  );
  const findByLeftNavigation = () => rendered.findByTestId('left-navigation');
  const queryByLeftNavigation = () => rendered.queryByTestId('left-navigation');

  return {
    ...rendered,
    findByLeftNavigation,
    queryByLeftNavigation,
    history: testHistory,
  };
};

beforeEach(() => {
  xhrMock.setup();
  applyMocksForExternalNetworkRequests();
  jest.clearAllMocks();

  window.localStorage.getItem.mockImplementation((key) => {
    switch (key) {
      case STORAGE_KEYS.IS_AUTHENTICATED:
        return 'true';
      case STORAGE_KEYS.IS_FORCED_MENU_OPEN:
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
        (context) => context.environment.applicationName
      );
      return <p>{`Application name: ${applicationName}`}</p>;
    };
    const rendered = renderApp(<TestComponent />);
    await rendered.findByText('Application name: my-app');
  });
});
describe('when route does not contain a project key (e.g. /account)', () => {
  beforeEach(() => {
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: mocksForMc.createMockOperations() },
    });
  });
  it('should not render NavBar', async () => {
    const rendered = renderApp();
    await rendered.findByText('OK');
    rendered.history.push('/account');
    await waitFor(() => {
      expect(rendered.history.location.pathname).toBe('/account');
      expect(rendered.queryByLeftNavigation()).not.toBeInTheDocument();
    });
  });
});
describe('when user first visits "/" with no projectKey defined in localStorage', () => {
  let operations;
  beforeEach(() => {
    operations = mocksForMc.createMockOperations();
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: operations },
    });
  });
  it('should not render the NavBar first, then redirect to "/:projectKey" and render the NavBar', async () => {
    const rendered = renderApp();
    await waitFor(() => {
      // Redirect "/" -> "/:projectKey"
      expect(rendered.history.location.pathname).toBe(
        `/${operations.FetchProject.project.key}`
      );
    });
    expect(rendered.queryByLeftNavigation()).toBeInTheDocument();
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
    await waitFor(() => {
      expect(location.replace).toHaveBeenCalledWith('/account/projects/new');
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
    await waitFor(() => {
      expect(location.replace).toHaveBeenCalledWith(
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
    await waitFor(() => {
      expect(location.replace).toHaveBeenCalledWith(
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
    await waitFor(() => {
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

    await waitFor(() => {
      expect(location.replace).toHaveBeenCalledWith(`/${nextProject.key}`);
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

    await waitFor(() => {
      expect(location.replace).toHaveBeenCalledWith(
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
        (context) => context.dataLocale
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
    await waitFor(() => {
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
    await waitFor(() => {
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
    await waitFor(() => {
      expect(rendered.queryByText('Processing...')).not.toBeInTheDocument();
    });
  });
});
describe('when clicking on navbar menu toggle', () => {
  let operations;
  beforeEach(() => {
    operations = mocksForMc.createMockOperations();
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: operations },
    });
  });
  it('should expand and collapse menu', async () => {
    const rendered = renderApp();
    const button = await rendered.findByTestId('menu-expander');
    fireEvent.click(button);
    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.IS_FORCED_MENU_OPEN,
        'false'
      );
    });
    fireEvent.click(button);
    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.IS_FORCED_MENU_OPEN,
        'true'
      );
    });
    // Check that the support link is rendered
    // Get the nav container, to narrow down the search area
    const container = await rendered.findByLeftNavigation();
    const navbarRendered = within(container);
    expect(navbarRendered.getByText('Support')).toBeInTheDocument();
  });
});
describe('navbar menu links interactions', () => {
  async function checkLinksInteractions(
    rendered,
    { mainMenuLabel, mainSubmenuLabel }
  ) {
    // Wait for the nav container
    await rendered.findByLeftNavigation();

    // Check the relationships between the menu items of a group
    const menuTitle = await within(
      await rendered.findByLeftNavigation()
    ).findByText(mainMenuLabel.value);
    const groupId = menuTitle.getAttribute('aria-owns');
    const submenuContainer = rendered.container.querySelector(`#${groupId}`);
    expect(submenuContainer).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(menuTitle);
    await waitFor(() => {
      expect(submenuContainer).toHaveAttribute('aria-expanded', 'true');
    });
    const menuGroupContainer = within(rendered.getByTestId(groupId));
    const menuLink = menuGroupContainer.queryByText(mainSubmenuLabel.value);
    expect(menuLink).toBeInTheDocument();
    expect(menuLink).not.toHaveAttribute('aria-current');
    // Go to the link to check if the link becomes active
    fireEvent.click(menuLink);
    await waitFor(() => {
      expect(menuLink).toHaveAttribute('aria-current', 'page');
    });
  }
  describe('when rendering navbar menu links from local config', () => {
    let operations;
    beforeEach(() => {
      operations = mocksForMc.createMockOperations();
      createGraphqlMockServer(xhrMock, {
        operationsByTarget: { mc: operations },
      });
    });
    it('should render links with all the correct state attributes', async () => {
      const navbarSubmenuMock = ApplicationNavbarSubmenuMock.build();
      const navbarMock = ApplicationNavbarMenuMock.build({
        submenu: [navbarSubmenuMock],
      });
      const rendered = renderApp(null, {
        featureFlags: {
          [PROJECT_EXTENSIONS]: false,
        },
        DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
      });

      const applicationLocale = operations.FetchLoggedInUser.me.language;
      const mainMenuLabel = navbarMock.labelAllLocales.find(
        (localized) => localized.locale === applicationLocale
      );
      const mainSubmenuLabel = navbarSubmenuMock.labelAllLocales.find(
        (localized) => localized.locale === applicationLocale
      );

      await checkLinksInteractions(rendered, {
        mainMenuLabel,
        mainSubmenuLabel,
      });
    });
  });
  describe('when rendering navbar menu links from remote config', () => {
    let mcOperations;
    let proxyOperations;
    beforeEach(() => {
      mcOperations = mocksForMc.createMockOperations();
      proxyOperations = mocksForProxy.createMockOperations();
      createGraphqlMockServer(xhrMock, {
        operationsByTarget: { mc: mcOperations, proxy: proxyOperations },
      });
    });
    it('should render links with all the correct state attributes', async () => {
      const rendered = renderApp(null, {
        featureFlags: {
          [PROJECT_EXTENSIONS]: false,
        },
        environment: {
          servedByProxy: 'true',
        },
      });
      const applicationLocale = mcOperations.FetchLoggedInUser.me.language;
      const mainMenuLabel = proxyOperations.FetchApplicationsMenu.applicationsMenu.navBar[0].labelAllLocales.find(
        (localized) => localized.locale === applicationLocale
      );
      const mainSubmenuLabel = proxyOperations.FetchApplicationsMenu.applicationsMenu.navBar[0].submenu[0].labelAllLocales.find(
        (localized) => localized.locale === applicationLocale
      );

      await checkLinksInteractions(rendered, {
        mainMenuLabel,
        mainSubmenuLabel,
      });
    });
  });
  describe('when rendering navbar menu links for custom applications', () => {
    let mcOperations;
    let proxyOperations;
    let settingsOperations;
    beforeEach(() => {
      mcOperations = mocksForMc.createMockOperations();
      proxyOperations = mocksForProxy.createMockOperations();
      settingsOperations = mocksForSettings.createMockOperations();
      createGraphqlMockServer(xhrMock, {
        operationsByTarget: {
          mc: mcOperations,
          proxy: proxyOperations,
          settings: settingsOperations,
        },
      });
    });
    it('should render links with all the correct state attributes', async () => {
      const rendered = renderApp(null, {
        featureFlags: {
          [PROJECT_EXTENSIONS]: true,
        },
        environment: {
          servedByProxy: 'true',
        },
      });
      const applicationLocale = mcOperations.FetchLoggedInUser.me.language;
      const mainMenuLabel = settingsOperations.FetchProjectExtensionsNavbar.projectExtension.applications[0].navbarMenu.labelAllLocales.find(
        (localized) => localized.locale === applicationLocale
      );
      const mainSubmenuLabel = settingsOperations.FetchProjectExtensionsNavbar.projectExtension.applications[0].navbarMenu.submenu[0].labelAllLocales.find(
        (localized) => localized.locale === applicationLocale
      );

      await checkLinksInteractions(rendered, {
        mainMenuLabel,
        mainSubmenuLabel,
      });
    });
  });
});
describe('when navbar menu items are disabled', () => {
  let operations;
  beforeEach(() => {
    operations = mocksForMc.createMockOperations();
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: operations },
    });
  });
  it('should not render disabled menu items', async () => {
    const navbarSubmenuMock = ApplicationNavbarSubmenuMock.build();
    const navbarMock = ApplicationNavbarMenuMock.build({
      submenu: [navbarSubmenuMock],
    });
    const rendered = renderApp(null, {
      featureFlags: {
        [PROJECT_EXTENSIONS]: false,
      },
      environment: { disabledMenuItems: [navbarMock.key] },
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    // Get the nav container, to narrow down the search area
    const container = await rendered.findByLeftNavigation();
    const navbarRendered = within(container);

    const applicationLocale = operations.FetchLoggedInUser.me.language;
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await waitFor(() => {
      expect(
        navbarRendered.queryByText(mainMenuLabel.value)
      ).not.toBeInTheDocument();
    });
  });
});
describe('when navbar menu items are hidden', () => {
  let operations;
  beforeEach(() => {
    operations = mocksForMc.createMockOperations({
      FetchProject: {
        project: ProjectMock.build({
          allAppliedMenuVisibilities: [{ name: 'hideFoo', value: true }],
        }),
      },
    });
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: operations },
    });
  });
  it('should not render hidden menu items', async () => {
    const navbarSubmenuMock = ApplicationNavbarSubmenuMock.build({
      menuVisibility:
        operations.FetchProject.project.allAppliedMenuVisibilities[0].name,
    });
    const navbarMock = ApplicationNavbarMenuMock.build({
      submenu: [navbarSubmenuMock],
    });
    const rendered = renderApp(null, {
      featureFlags: {
        [PROJECT_EXTENSIONS]: false,
      },
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    // Get the nav container, to narrow down the search area
    const container = await rendered.findByLeftNavigation();
    const navbarRendered = within(container);

    const applicationLocale = operations.FetchLoggedInUser.me.language;
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await waitFor(() => {
      expect(
        navbarRendered.queryByText(mainMenuLabel.value)
      ).not.toBeInTheDocument();
    });
  });
});
describe('when navbar menu items match given permissions', () => {
  let operations;
  beforeEach(() => {
    operations = mocksForMc.createMockOperations({
      FetchProject: {
        project: ProjectMock.build({
          allAppliedPermissions: [{ name: 'canManageOrders', value: true }],
        }),
      },
    });
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: operations },
    });
  });
  it('should render item', async () => {
    const navbarMock = ApplicationNavbarMenuMock.build({
      permissions: ['ManageOrders'],
    });
    const rendered = renderApp(null, {
      featureFlags: {
        [PROJECT_EXTENSIONS]: false,
      },
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    // Wait the nav container
    await rendered.findByLeftNavigation();

    const applicationLocale = operations.FetchLoggedInUser.me.language;
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await within(await rendered.findByLeftNavigation()).findByText(
      mainMenuLabel.value
    );
  });
});
describe('when navbar menu items do not match given permissions', () => {
  let operations;
  beforeEach(() => {
    operations = mocksForMc.createMockOperations({
      FetchProject: {
        project: ProjectMock.build({
          allAppliedPermissions: [{ name: 'canManageOrders', value: false }],
        }),
      },
    });
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: operations },
    });
  });
  it('should not render item', async () => {
    const navbarMock = ApplicationNavbarMenuMock.build({
      permissions: ['ViewOrders'],
    });
    const rendered = renderApp(null, {
      featureFlags: {
        [PROJECT_EXTENSIONS]: false,
      },
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    // Get the nav container, to narrow down the search area
    const container = await rendered.findByLeftNavigation();
    const navbarRendered = within(container);

    const applicationLocale = operations.FetchLoggedInUser.me.language;
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await waitFor(() => {
      expect(
        navbarRendered.queryByText(mainMenuLabel.value)
      ).not.toBeInTheDocument();
    });
  });
});
describe('when navbar menu items match given action rights', () => {
  let operations;
  beforeEach(() => {
    operations = mocksForMc.createMockOperations({
      FetchProject: {
        project: ProjectMock.build({
          allAppliedPermissions: [{ name: 'canManageOrders', value: true }],
          allAppliedActionRights: [
            {
              group: 'orders',
              name: 'canAddOrders',
              value: true,
            },
          ],
        }),
      },
    });
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: operations },
    });
  });
  it('should render item', async () => {
    const navbarMock = ApplicationNavbarMenuMock.build({
      permissions: ['ManageOrders'],
      actionRights: [{ group: 'orders', name: 'AddOrders' }],
    });
    const rendered = renderApp(null, {
      featureFlags: {
        [PROJECT_EXTENSIONS]: false,
      },
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    // Wait for the nav container
    await rendered.findByLeftNavigation();

    const applicationLocale = operations.FetchLoggedInUser.me.language;
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await within(await rendered.findByLeftNavigation()).findByText(
      mainMenuLabel.value
    );
  });
});
describe('when navbar menu items do not match given action rights', () => {
  let operations;
  beforeEach(() => {
    operations = mocksForMc.createMockOperations({
      FetchProject: {
        project: ProjectMock.build({
          allAppliedPermissions: [{ name: 'canManageOrders', value: true }],
          allAppliedActionRights: [
            {
              group: 'orders',
              name: 'canAddOrders',
              value: false,
            },
          ],
        }),
      },
    });
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: operations },
    });
  });
  it('should not render item', async () => {
    const navbarMock = ApplicationNavbarMenuMock.build({
      permissions: ['ManageOrders'],
      actionRights: [{ group: 'orders', name: 'AddOrders' }],
    });
    const rendered = renderApp(null, {
      featureFlags: {
        [PROJECT_EXTENSIONS]: false,
      },
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    // Get the nav container, to narrow down the search area
    const container = await rendered.findByLeftNavigation();
    const navbarRendered = within(container);

    const applicationLocale = operations.FetchLoggedInUser.me.language;
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await waitFor(() => {
      expect(
        navbarRendered.queryByText(mainMenuLabel.value)
      ).not.toBeInTheDocument();
    });
  });
});
describe('when navbar menu items match given data fences', () => {
  let operations;
  beforeEach(() => {
    operations = mocksForMc.createMockOperations({
      FetchProject: {
        project: ProjectMock.build({
          allAppliedPermissions: [{ name: 'canManageOrders', value: true }],
          allAppliedDataFences: [
            {
              __typename: 'StoreDataFence',
              value: 'usa',
              type: 'store',
              group: 'orders',
              name: 'canManageOrders',
            },
          ],
        }),
      },
    });
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: operations },
    });
  });
  it('should render item', async () => {
    const navbarMock = ApplicationNavbarMenuMock.build({
      permissions: ['ManageOrders'],
      dataFences: [
        {
          type: 'store',
          group: 'orders',
          name: 'ManageOrders',
        },
      ],
    });
    const rendered = renderApp(null, {
      featureFlags: {
        [PROJECT_EXTENSIONS]: false,
      },
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    // Wait the nav container
    await rendered.findByLeftNavigation();

    const applicationLocale = operations.FetchLoggedInUser.me.language;
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await within(await rendered.findByLeftNavigation()).findByText(
      mainMenuLabel.value
    );
  });
});
describe('when navbar menu items do not match given data fences', () => {
  let operations;
  beforeEach(() => {
    operations = mocksForMc.createMockOperations({
      FetchProject: {
        project: ProjectMock.build({
          allAppliedPermissions: [{ name: 'canViewOrders', value: true }],
          allAppliedDataFences: [
            {
              __typename: 'StoreDataFence',
              value: 'usa',
              type: 'store',
              group: 'orders',
              name: 'canViewOrders',
            },
          ],
        }),
      },
    });
    createGraphqlMockServer(xhrMock, {
      operationsByTarget: { mc: operations },
    });
  });
  it('should not render item', async () => {
    const navbarMock = ApplicationNavbarMenuMock.build({
      permissions: ['ManageOrders'],
      dataFences: [
        {
          type: 'store',
          group: 'orders',
          name: 'ManageOrders',
        },
      ],
    });
    const rendered = renderApp(null, {
      featureFlags: {
        [PROJECT_EXTENSIONS]: false,
      },
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    // Wait for the nav container
    await rendered.findByLeftNavigation();

    const applicationLocale = operations.FetchLoggedInUser.me.language;
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await waitFor(async () => {
      expect(
        within(await rendered.findByLeftNavigation()).queryByText(
          mainMenuLabel.value
        )
      ).not.toBeInTheDocument();
    });
  });
});
