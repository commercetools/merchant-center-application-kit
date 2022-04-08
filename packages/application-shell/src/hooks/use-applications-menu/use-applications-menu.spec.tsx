import type {
  ApplicationWindow,
  ApplicationMenuLinksForDevelopmentConfig,
} from '@commercetools-frontend/constants';
import type { TFetchApplicationsMenuQuery } from '../../types/generated/proxy';
import type { Config, MenuLoaderResult } from './use-applications-menu';

import { mocked } from 'jest-mock';
import upperFirst from 'lodash/upperFirst';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import {
  screen,
  renderApp,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test-utils';
import FetchApplicationsMenu from './fetch-applications-menu.proxy.graphql';
import useApplicationsMenu from './use-applications-menu';

jest.mock('@commercetools-frontend/sentry');

const createTestEnvironment = (
  custom: Partial<ApplicationWindow['app']> = {}
) => ({
  applicationId: 'application-id',
  applicationName: 'Avengers',
  entryPointUriPath: 'avengers',
  revision: '123',
  env: 'development',
  location: 'gcp-eu',
  cdnUrl: 'http://localhost:3001',
  mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
  frontendHost: 'mc.europe-west1.gcp.commercetools.com',
  servedByProxy: false,
  ...custom,
});

const NavBarTest = (props: Config) => {
  const applicationsMenu = useApplicationsMenu<'navBar'>('navBar', props);
  const userLocale = useApplicationContext(
    (context) => context.user?.locale ?? 'en'
  );
  if (applicationsMenu) {
    return (
      <>
        {applicationsMenu.map((menu) => {
          const localizedLabels = transformLocalizedFieldToLocalizedString(
            menu.labelAllLocales
          );
          return (
            <ul key={menu.uriPath}>
              <li>
                <label>{localizedLabels?.[userLocale]}</label>
                <p>{`Path: ${menu.uriPath}`}</p>
              </li>
              {menu.submenu.map((submenu) => {
                const localizedLabels =
                  transformLocalizedFieldToLocalizedString(
                    submenu.labelAllLocales
                  );
                return (
                  <ul key={submenu.uriPath}>
                    <li>
                      <label>{localizedLabels?.[userLocale]}</label>
                      <p>{`Sub-path: ${submenu.uriPath}`}</p>
                    </li>
                  </ul>
                );
              })}
            </ul>
          );
        })}
      </>
    );
  }
  return <div>{'loading'}</div>;
};
const AppBarTest = (props: Config) => {
  const applicationsMenu = useApplicationsMenu<'appBar'>('appBar', props);
  const userLocale = useApplicationContext(
    (context) => context.user?.locale ?? 'en'
  );
  if (applicationsMenu) {
    return (
      <>
        {applicationsMenu.map((menu) => {
          const localizedLabels = transformLocalizedFieldToLocalizedString(
            menu.labelAllLocales
          );
          return (
            <ul key={menu.uriPath}>
              <li>
                <label>{localizedLabels?.[userLocale]}</label>
                <p>{`Path: ${menu.uriPath}`}</p>
              </li>
            </ul>
          );
        })}
      </>
    );
  }
  return <div>{'loading'}</div>;
};

const createTestNavBarLegacyMenuJsonConfig = (
  uriPath: string,
  props: Partial<MenuLoaderResult<'navBar'>[0]> = {}
) => ({
  uriPath,
  key: uriPath,
  labelAllLocales: [{ locale: 'en', value: upperFirst(uriPath) }],
  icon: 'UserFilledIcon',
  permissions: [],
  dataFences: [],
  actionRights: [],
  featureToggle: '',
  menuVisibility: `hide${upperFirst(uriPath)}`,
  submenu: [
    {
      uriPath: `${uriPath}/new`,
      key: `${uriPath}-new`,
      labelAllLocales: [{ locale: 'en', value: `${upperFirst(uriPath)} new` }],
      menuVisibility: `hide${upperFirst(uriPath)}New`,
      permissions: [],
      actionRights: [],
      dataFences: [],
      featureToggle: '',
    },
  ],
  shouldRenderDivider: false,
  ...props,
});
const createTestNavBarMenuLinksConfig = (
  props: Partial<ApplicationMenuLinksForDevelopmentConfig> = {}
) => ({
  icon: '<svg><path fill="#000000" /></svg>',
  defaultLabel: 'Avengers',
  labelAllLocales: [{ locale: 'en', value: 'Avengers' }],
  permissions: [],
  submenuLinks: [
    {
      uriPath: 'avengers/new',
      defaultLabel: 'Add avenger',
      labelAllLocales: [{ locale: 'en', value: 'Add avenger' }],
      permissions: [],
    },
  ],
  ...props,
});
const createTestAppBarMenuLinksConfig = (
  props: Partial<
    ApplicationMenuLinksForDevelopmentConfig['submenuLinks'][0]
  > = {}
) => [
  {
    uriPath: 'profile',
    defaultLabel: 'Profile',
    labelAllLocales: [{ locale: 'en', value: 'Profile' }],
    permissions: [],
    ...props,
  },
  {
    uriPath: 'organizations',
    defaultLabel: 'Organizations',
    labelAllLocales: [{ locale: 'en', value: 'Organizations' }],
    permissions: [],
    ...props,
  },
];

const createGraphqlResponse = (
  custom: Partial<TFetchApplicationsMenuQuery> = {}
) => ({
  applicationsMenu: {
    appBar: [],
    navBar: [createTestNavBarLegacyMenuJsonConfig('orders')],
  },
  ...custom,
});

describe('for production usage', () => {
  const environment = createTestEnvironment({
    servedByProxy: true,
  });
  describe('when the query succeeds', () => {
    it('should render menu key', async () => {
      renderApp(<NavBarTest environment={environment} />, {
        disableRoutePermissionCheck: true,
        mocks: [
          {
            request: {
              query: FetchApplicationsMenu,
            },
            result: {
              data: createGraphqlResponse(),
            },
          },
        ],
      });
      await waitForElementToBeRemoved(() => screen.queryByText('loading'));
      expect(screen.getByText('Orders')).toBeInTheDocument();
      expect(screen.getByText('Orders new')).toBeInTheDocument();
      expect(screen.getByText('Path: orders')).toBeInTheDocument();
      expect(screen.getByText('Sub-path: orders/new')).toBeInTheDocument();
    });
  });
  describe('when the query fails', () => {
    it('should report error to sentry', async () => {
      console.error = jest.fn();
      mocked(reportErrorToSentry).mockClear();
      const error = new Error('Oops');
      renderApp(
        <AppBarTest
          environment={environment}
          queryOptions={{
            onError: reportErrorToSentry,
          }}
        />,
        {
          disableRoutePermissionCheck: true,
          mocks: [
            {
              request: {
                query: FetchApplicationsMenu,
              },
              error,
            },
          ],
        }
      );
      await screen.findByText('loading');
      await waitFor(() => {
        expect(reportErrorToSentry).toHaveBeenCalled();
      });
    });
  });
});
describe('for local development', () => {
  describe('<NavBar>', () => {
    describe('loading the menu config from the application config', () => {
      it('should render menu key', async () => {
        const environment = createTestEnvironment({
          __DEVELOPMENT__: {
            menuLinks: createTestNavBarMenuLinksConfig(),
          },
        });
        renderApp(<NavBarTest environment={environment} />, {
          disableRoutePermissionCheck: true,
        });
        await screen.findByText('Avengers');
        expect(screen.getByText('Add avenger')).toBeInTheDocument();
        expect(screen.getByText('Path: avengers')).toBeInTheDocument();
        expect(screen.getByText('Sub-path: avengers/new')).toBeInTheDocument();
      });
    });
  });

  describe('<AppBar>', () => {
    describe('loading the account menu config from the application config', () => {
      it('should render menu key', async () => {
        const environment = createTestEnvironment({
          __DEVELOPMENT__: {
            // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
            accountLinks: createTestAppBarMenuLinksConfig(),
          },
        });
        renderApp(<AppBarTest environment={environment} />, {
          disableRoutePermissionCheck: true,
        });
        await screen.findByText('Profile');
        expect(screen.getByText('Path: profile')).toBeInTheDocument();
        expect(screen.getByText('Organizations')).toBeInTheDocument();
        expect(screen.getByText('Path: organizations')).toBeInTheDocument();
      });
    });
  });
});
