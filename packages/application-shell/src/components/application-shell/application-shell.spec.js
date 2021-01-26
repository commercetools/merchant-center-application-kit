import React from 'react';
import { encode } from 'qss';
import { graphql, rest } from 'msw';
import { setupServer } from 'msw/node';
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
  UserMock,
  ProjectMock,
  ApplicationAppbarMenuMock,
  ApplicationNavbarMenuMock,
  ApplicationNavbarSubmenuMock,
  ProjectExtensionMock,
  CustomApplicationMock,
} from '../../../../../graphql-test-utils';
import { STORAGE_KEYS } from '../../constants';
import { location } from '../../utils/location';
import ApplicationShellProvider from '../application-shell-provider';
import ApplicationShell from './application-shell';

jest.mock('@commercetools-frontend/sentry');
jest.mock('../../utils/location');

const createTestProps = (props) => ({
  environment: {
    applicationName: 'my-app',
    entryPointUriPath: 'avengers',
    frontendHost: 'localhost:3001',
    mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
    location: 'eu',
    env: 'development',
    cdnUrl: 'http://localhost:3001',
    servedByProxy: 'false',
    enableSignUp: 'true',
  },
  featureFlags: {},
  defaultFeatureFlags: {},
  trackingEventList: {},
  onRegisterErrorListeners: jest.fn(),
  onMenuItemClick: jest.fn(),
  applicationMessages: {
    en: { 'CustomApp.title': 'Title en' },
    'en-US': { 'CustomApp.title': 'Title' },
    de: { 'CustomApp.title': 'Titel' },
  },
  ...props,
});
const createTestAppliedPermissions = ({
  allAppliedPermissions = [],
  allAppliedActionRights = [],
  allAppliedDataFences = [],
  allAppliedMenuVisibilities = [],
} = {}) => ({
  allAppliedPermissions,
  allAppliedActionRights,
  allAppliedDataFences,
  allPermissionsForAllApplications: {
    allAppliedPermissions,
    allAppliedActionRights,
    allAppliedDataFences,
    allAppliedMenuVisibilities,
  },
});

const renderApp = (ui, options = {}) => {
  const { route, renderNodeAsChildren, ...customProps } = options;
  const jsxElem = ui || <p>{'OK'}</p>;
  const initialRoute = route || '/';
  const testHistory = createEnhancedHistory(
    createMemoryHistory({ initialEntries: [initialRoute] })
  );
  ApplicationShellProvider.history = testHistory;
  const defaultProps = createTestProps();
  const props = {
    ...defaultProps,
    ...customProps,
    environment: { ...defaultProps.environment, ...customProps.environment },
    ...(renderNodeAsChildren
      ? { children: jsxElem }
      : { render: () => jsxElem }),
  };
  const rendered = render(<ApplicationShell {...props} />);
  const findByLeftNavigation = () => rendered.findByTestId('left-navigation');
  const queryByLeftNavigation = () => rendered.queryByTestId('left-navigation');
  const waitForLeftNavigationToBeLoaded = async () => {
    await findByLeftNavigation();
    // Wait for the loading navbar to disappear. Instead of using `waitForElementToBeRemoved`,
    // which seems not stable enough, we wait to find the "Support" link, which is present
    // when the navbar is loaded.
    await rendered.findByText('Support');
  };

  return {
    ...rendered,
    findByLeftNavigation,
    queryByLeftNavigation,
    waitForLeftNavigationToBeLoaded,
    history: testHistory,
  };
};

const getDefaultMockResolvers = (mocks = {}) => {
  const mockedProjects = Array.isArray(mocks.projects)
    ? mocks.projects
    : [
        ProjectMock.build({
          key: 'test-1',
          name: 'Test 1',
        }),
        ProjectMock.build({
          key: 'test-2',
          name: 'Test 2',
        }),
      ];
  const mockedUser =
    mocks.user !== undefined
      ? mocks.user
      : UserMock.build({
          defaultProjectKey: 'test-1',
          projects: {
            __typename: 'ProjectQueryResult',
            total: mockedProjects.length,
            results: mockedProjects,
          },
        });
  // Main network requests
  return [
    graphql.query('FetchLoggedInUser', (req, res, ctx) =>
      res(ctx.data({ user: mockedUser }))
    ),
    graphql.query('FetchUserProjects', (req, res, ctx) =>
      res(ctx.data({ user: mockedUser }))
    ),
    graphql.query('FetchProject', (req, res, ctx) => {
      if (req.variables.projectKey === 'not-found') {
        return res(ctx.data({ project: null }));
      }
      return res(ctx.data({ project: mockedProjects[0] }));
    }),
  ];
};
const mockServer = setupServer(
  // Other network requests
  rest.post(/\/proxy\/mc-metrics\/metrics\//, (req, res, ctx) =>
    res(ctx.json({ message: 'ok' }))
  )
);

beforeEach(() => {
  jest.clearAllMocks();

  mockServer.use(...getDefaultMockResolvers());

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
  mockServer.resetHandlers();
});
beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'error',
  })
);
afterAll(() => mockServer.close());

describe.each`
  renderNodeAsChildren | route
  ${false}             | ${'/'}
  ${true}              | ${'/test-1/avengers'}
`(
  'when rendering (as children: $renderNodeAsChildren)',
  ({ renderNodeAsChildren, route }) => {
    it('should pass environment into application context', async () => {
      const TestComponent = () => {
        const applicationName = useApplicationContext(
          (context) => context.environment.applicationName
        );
        return <p>{`Application name: ${applicationName}`}</p>;
      };
      const rendered = renderApp(<TestComponent />, {
        renderNodeAsChildren,
        route,
      });
      await rendered.findByText('Application name: my-app');
    });

    describe('when user navigates to "/account" route', () => {
      if (renderNodeAsChildren) {
        it('should trigger a page reload (when served by proxy)', async () => {
          const rendered = renderApp(null, {
            renderNodeAsChildren,
            environment: { servedByProxy: true },
          });
          await rendered.findByText('OK');
          rendered.history.push('/account');
          await waitFor(() => {
            expect(location.reload).toHaveBeenCalled();
          });
        });
      } else {
        it('should render using the "render" prop', async () => {
          const rendered = renderApp(null, {
            renderNodeAsChildren,
          });
          await rendered.findByText('OK');
          rendered.history.push('/account');
          await rendered.findByText('OK');
          expect(location.reload).not.toHaveBeenCalled();
        });
      }
    });
  }
);

describe('when route does not contain a project key (e.g. /account)', () => {
  it('should not render NavBar', async () => {
    const rendered = renderApp();
    await rendered.findByText('OK');
    rendered.history.push('/account');
    await waitFor(() => {
      expect(rendered.history.location.pathname).toBe('/account');
    });
    expect(rendered.queryByLeftNavigation()).not.toBeInTheDocument();
    await rendered.findByText('OK');
  });
});
describe('when user first visits "/" with no projectKey defined in localStorage', () => {
  it('should not render the NavBar first, then redirect to "/:projectKey" and render the NavBar', async () => {
    const rendered = renderApp();
    await waitFor(() => {
      // Redirect "/" -> "/:projectKey"
      expect(rendered.history.location.pathname).toBe(`/test-1`);
    });
    expect(rendered.queryByLeftNavigation()).toBeInTheDocument();
  });
});
describe('when user has no default project', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        user: UserMock.build({
          defaultProjectKey: null,
          projects: {
            __typename: 'ProjectQueryResult',
            total: 0,
            results: [],
          },
        }),
      })
    );
  });
  it('should redirect to project creation', async () => {
    const rendered = renderApp(null, {
      environment: {
        servedByProxy: 'true',
      },
    });
    await waitFor(() => {
      expect(location.replace).toHaveBeenCalledWith('/account/projects/new');
    });
    expect(rendered.queryByText('OK')).not.toBeInTheDocument();
  });
});
describe('when loading user fails with an unknown graphql error', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      graphql.query('FetchLoggedInUser', (req, res, ctx) =>
        res(ctx.errors([new ApolloError('Oops')]))
      )
    );
  });
  it('should render error page', async () => {
    const rendered = renderApp();
    await rendered.findByText('Sorry! An unexpected error occured.');
  });
});
describe('when loading user fails with an unauthorized graphql error', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      graphql.query('FetchLoggedInUser', (req, res, ctx) =>
        res(ctx.errors([new AuthenticationError('User is not authorized')]))
      )
    );
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
    });
    expect(rendered.queryByText('OK')).not.toBeInTheDocument();
  });
});
describe('when loading user fails with a "was not found." graphql error message', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      graphql.query('FetchLoggedInUser', (req, res, ctx) =>
        res(ctx.errors([{ message: 'User was not found.' }]))
      )
    );
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
    });
    expect(rendered.queryByText('OK')).not.toBeInTheDocument();
  });
});
describe('when project is not found', () => {
  it('should render "project not found" page', async () => {
    const rendered = renderApp(null, { route: '/not-found' });
    await rendered.findByText('We could not find this Project');
  });
});
describe('when project is temporarily suspended', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            suspension: {
              __typename: 'ProjectSuspension',
              isActive: true,
              reason: 'TemporaryMaintenance',
            },
          }),
        ],
      })
    );
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
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            suspension: {
              __typename: 'ProjectSuspension',
              isActive: true,
              reason: 'Other',
            },
          }),
        ],
      })
    );
  });
  it('should render "project suspended" page', async () => {
    const rendered = renderApp();
    await rendered.findByText('Your Project has been suspended');
  });
});
describe('when project is expired', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            expiry: {
              __typename: 'ProjectExpiry',
              isActive: true,
              daysLeft: null,
            },
          }),
        ],
      })
    );
  });
  it('should render "project expired" page', async () => {
    const rendered = renderApp();
    await rendered.findByText('Your trial has expired');
  });
});
describe('when project is about to expire (<14 days left)', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            expiry: {
              __typename: 'ProjectExpiry',
              isActive: false,
              daysLeft: 13,
            },
          }),
        ],
      })
    );
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
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            expiry: {
              __typename: 'ProjectExpiry',
              isActive: false,
              daysLeft: 14,
            },
          }),
        ],
      })
    );
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
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            expiry: {
              __typename: 'ProjectExpiry',
              isActive: false,
              daysLeft: 15,
            },
          }),
        ],
      })
    );
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
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            expiry: {
              __typename: 'ProjectExpiry',
              isActive: false,
              daysLeft: 0,
            },
          }),
        ],
      })
    );
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
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            initialized: false,
          }),
        ],
      })
    );
  });
  it('should render "project not initialized" page', async () => {
    const rendered = renderApp();
    await rendered.findByText('Your project has not yet been initialized');
  });
});
describe('when user does not have permissions to access the project', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            ...createTestAppliedPermissions({
              allAppliedPermissions: [],
            }),
          }),
        ],
      })
    );
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
  it('should render app for new project', async () => {
    const rendered = renderApp(
      <label id="project-switcher">{'Project switcher'}</label>
    );
    await rendered.findByText('Project switcher');
    const input = await rendered.findByLabelText('Project switcher');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    rendered.getByText('Test 2').click();

    await waitFor(() => {
      expect(location.replace).toHaveBeenCalledWith(`/test-2`);
    });
  });
});
describe('when user is not authenticated', () => {
  beforeEach(() => {
    window.localStorage.getItem.mockReturnValue(null);
    mockServer.use(
      graphql.query('AmILoggedIn', (req, res, ctx) => res.once(ctx.status(401)))
    );
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
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            languages: ['en'],
          }),
        ],
      })
    );
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
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [],
      })
    );
  });
  it('should not render project switcher', async () => {
    const rendered = renderApp();
    await waitFor(() => {
      expect(
        rendered.container.querySelector('[name="project-switcher"]')
      ).not.toBeInTheDocument();
    });
    await rendered.findByText('Back to project');
  });
});
describe('when dispatching a loading notification', () => {
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
  it('should expand and collapse menu', async () => {
    const rendered = renderApp();
    await rendered.waitForLeftNavigationToBeLoaded();
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
    it('should render links with all the correct state attributes', async () => {
      const navbarSubmenuMock = ApplicationNavbarSubmenuMock.build();
      const navbarMock = ApplicationNavbarMenuMock.build({
        submenu: [navbarSubmenuMock],
      });
      const rendered = renderApp(null, {
        DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
      });

      const applicationLocale = 'en';
      const mainMenuLabel = navbarMock.labelAllLocales.find(
        (localized) => localized.locale === applicationLocale
      );
      const mainSubmenuLabel = navbarSubmenuMock.labelAllLocales.find(
        (localized) => localized.locale === applicationLocale
      );

      // Wait for the loading nav container to disappear
      await rendered.waitForLeftNavigationToBeLoaded();
      await checkLinksInteractions(rendered, {
        mainMenuLabel,
        mainSubmenuLabel,
      });
    });
  });
  describe('when rendering navbar menu links from remote config and custom applications', () => {
    beforeEach(() => {
      mockServer.resetHandlers();
      mockServer.use(
        ...getDefaultMockResolvers(),
        graphql.query('FetchProjectExtensionsNavbar', (req, res, ctx) => {
          return res(
            ctx.data({
              projectExtension: ProjectExtensionMock.build({
                applications: CustomApplicationMock.buildList(1, {
                  navbarMenu: ApplicationNavbarMenuMock.build({
                    labelAllLocales: [
                      {
                        __typename: 'LocalizedField',
                        locale: 'en',
                        value: 'Marvel',
                      },
                    ],
                    submenu: ApplicationNavbarSubmenuMock.buildList(1, {
                      labelAllLocales: [
                        {
                          __typename: 'LocalizedField',
                          locale: 'en',
                          value: 'Avengers',
                        },
                      ],
                    }),
                  }),
                }),
              }),
            })
          );
        }),
        graphql
          .link(`${window.location.origin}/api/graphql`)
          .query('FetchApplicationsMenu', (req, res, ctx) =>
            res(
              ctx.data({
                applicationsMenu: {
                  __typename: 'ApplicationsMenu',
                  appBar: ApplicationAppbarMenuMock.buildList(1),
                  navBar: ApplicationNavbarMenuMock.buildList(1, {
                    labelAllLocales: [
                      {
                        __typename: 'LocalizedField',
                        locale: 'en',
                        value: 'Products',
                      },
                    ],
                    submenu: ApplicationNavbarSubmenuMock.buildList(1, {
                      labelAllLocales: [
                        {
                          __typename: 'LocalizedField',
                          locale: 'en',
                          value: 'Add product',
                        },
                      ],
                    }),
                  }),
                },
              })
            )
          ),
        graphql
          .link(`${window.location.origin}/api/graphql`)
          .query('FetchAllMenuFeatureToggles', (req, res, ctx) =>
            res(ctx.data({ allFeatureToggles: [] }))
          )
      );
    });
    it('should render links with all the correct state attributes', async () => {
      const rendered = renderApp(null, {
        environment: {
          servedByProxy: 'true',
        },
      });
      // Wait for the loading nav container to disappear
      await rendered.waitForLeftNavigationToBeLoaded();

      // Check links from internal applications menu
      await checkLinksInteractions(rendered, {
        mainMenuLabel: { value: 'Products' },
        mainSubmenuLabel: { value: 'Add product' },
      });

      // Check links from custom applications menu
      await checkLinksInteractions(rendered, {
        mainMenuLabel: { value: 'Marvel' },
        mainSubmenuLabel: { value: 'Avengers' },
      });
    });
  });
});
describe('when navbar menu items are hidden', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            ...createTestAppliedPermissions({
              allAppliedMenuVisibilities: [
                {
                  __typename: 'AppliedMenuVisibilities',
                  name: 'hideFoo',
                  value: true,
                },
              ],
            }),
          }),
        ],
      })
    );
  });
  it('should not render hidden menu items', async () => {
    const navbarSubmenuMock = ApplicationNavbarSubmenuMock.build({
      menuVisibility: 'hideFoo',
    });
    const navbarMock = ApplicationNavbarMenuMock.build({
      submenu: [navbarSubmenuMock],
    });
    const rendered = renderApp(null, {
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    await rendered.waitForLeftNavigationToBeLoaded();
    // Get the nav container, to narrow down the search area
    const container = await rendered.findByLeftNavigation();
    const navbarRendered = within(container);

    const applicationLocale = 'en';
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
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            ...createTestAppliedPermissions({
              allAppliedPermissions: [
                {
                  __typename: 'AppliedPermission',
                  name: 'canManageOrders',
                  value: true,
                },
              ],
            }),
          }),
        ],
      })
    );
  });
  it('should render item', async () => {
    const navbarMock = ApplicationNavbarMenuMock.build({
      permissions: ['ManageOrders'],
    });
    const rendered = renderApp(null, {
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    await rendered.waitForLeftNavigationToBeLoaded();
    const container = await rendered.findByLeftNavigation();

    const applicationLocale = 'en';
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await within(container).findByText(mainMenuLabel.value);
  });
});
describe('when navbar menu items do not match given permissions', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            ...createTestAppliedPermissions({
              allAppliedPermissions: [
                {
                  __typename: 'AppliedPermission',
                  name: 'canManageOrders',
                  value: false,
                },
              ],
            }),
          }),
        ],
      })
    );
  });
  it('should not render item', async () => {
    const navbarMock = ApplicationNavbarMenuMock.build({
      permissions: ['ViewOrders'],
    });
    const rendered = renderApp(null, {
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    await rendered.waitForLeftNavigationToBeLoaded();
    // Get the nav container, to narrow down the search area
    const container = await rendered.findByLeftNavigation();
    const navbarRendered = within(container);

    const applicationLocale = 'en';
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
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            ...createTestAppliedPermissions({
              allAppliedPermissions: [
                {
                  __typename: 'AppliedPermission',
                  name: 'canManageOrders',
                  value: true,
                },
              ],
              allAppliedActionRights: [
                {
                  __typename: 'AppliedActionRight',
                  group: 'orders',
                  name: 'canAddOrders',
                  value: true,
                },
              ],
            }),
          }),
        ],
      })
    );
  });
  it('should render item', async () => {
    const navbarMock = ApplicationNavbarMenuMock.build({
      permissions: ['ManageOrders'],
      actionRights: [{ group: 'orders', name: 'AddOrders' }],
    });
    const rendered = renderApp(null, {
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    await rendered.waitForLeftNavigationToBeLoaded();
    const container = await rendered.findByLeftNavigation();

    const applicationLocale = 'en';
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await within(container).findByText(mainMenuLabel.value);
  });
});
describe('when navbar menu items do not match given action rights', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            ...createTestAppliedPermissions({
              allAppliedPermissions: [
                {
                  __typename: 'AppliedPermission',
                  name: 'canManageOrders',
                  value: true,
                },
              ],
              allAppliedActionRights: [
                {
                  __typename: 'AppliedActionRight',
                  group: 'orders',
                  name: 'canAddOrders',
                  value: false,
                },
              ],
            }),
          }),
        ],
      })
    );
  });
  it('should not render item', async () => {
    const navbarMock = ApplicationNavbarMenuMock.build({
      permissions: ['ManageOrders'],
      actionRights: [{ group: 'orders', name: 'AddOrders' }],
    });
    const rendered = renderApp(null, {
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    await rendered.waitForLeftNavigationToBeLoaded();
    // Get the nav container, to narrow down the search area
    const container = await rendered.findByLeftNavigation();
    const navbarRendered = within(container);

    const applicationLocale = 'en';
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
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            ...createTestAppliedPermissions({
              allAppliedPermissions: [
                {
                  __typename: 'AppliedPermission',
                  name: 'canManageOrders',
                  value: true,
                },
              ],
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
          }),
        ],
      })
    );
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
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    await rendered.waitForLeftNavigationToBeLoaded();
    const container = await rendered.findByLeftNavigation();

    const applicationLocale = 'en';
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await within(container).findByText(mainMenuLabel.value);
  });
});
describe('when navbar menu items do not match given data fences', () => {
  beforeEach(() => {
    mockServer.resetHandlers();
    mockServer.use(
      ...getDefaultMockResolvers({
        projects: [
          ProjectMock.build({
            ...createTestAppliedPermissions({
              allAppliedPermissions: [
                {
                  __typename: 'AppliedPermission',
                  name: 'canViewOrders',
                  value: true,
                },
              ],
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
          }),
        ],
      })
    );
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
      DEV_ONLY__loadNavbarMenuConfig: () => Promise.resolve([navbarMock]),
    });
    await rendered.waitForLeftNavigationToBeLoaded();
    const container = await rendered.findByLeftNavigation();

    const applicationLocale = 'en';
    const mainMenuLabel = navbarMock.labelAllLocales.find(
      (localized) => localized.locale === applicationLocale
    );
    await waitFor(async () => {
      expect(
        within(container).queryByText(mainMenuLabel.value)
      ).not.toBeInTheDocument();
    });
  });
});
