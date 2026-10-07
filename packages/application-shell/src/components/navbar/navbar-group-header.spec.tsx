import { NimbusProvider } from '@commercetools/nimbus';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import NavbarGroupHeader from './navbar-group-header';

const visibleMenus = [{ permissions: [] as string[] }];
const emptyProjectPermissions = { permissions: {} };

const createUser = (isAdminOfAnyOrganization: boolean) => ({
  id: 'u1',
  email: 'foo@bar.com',
  createdAt: '2020-01-01T12:29:33.916Z',
  firstName: 'foo',
  lastName: 'bar',
  language: 'en',
  numberFormat: 'en',
  defaultProjectKey: undefined,
  timeZone: undefined,
  businessRole: undefined,
  projects: {
    total: 0,
    results: [],
  },
  gravatarHash: 'xxx',
  launchdarklyTrackingGroup: 'commercetools',
  launchdarklyTrackingSubgroup: 'dev',
  launchdarklyTrackingId: '111',
  launchdarklyTrackingTeam: undefined,
  launchdarklyTrackingCloudEnvironment: 'ctp_production_gcp_europe-west1_v1',
  isAdminOfAnyOrganization,
});

const environment = {
  revision: '1',
  applicationId: '__local:avengers',
  applicationIdentifier: '__local:avengers',
  applicationName: 'my-app',
  entryPointUriPath: 'avengers',
  frontendHost: 'localhost:3001',
  mcApiUrl: 'https://mc-api.europe-west1.gcp.commercetools.com',
  location: 'eu',
  env: 'development',
  cdnUrl: 'http://localhost:3001',
  servedByProxy: false,
};

const renderHeader = ({
  label = 'Agent Sphere',
  isNew,
  menuItems = visibleMenus,
  projectPermissions = emptyProjectPermissions,
  isAdminOfAnyOrganization = false,
}: {
  label?: string;
  isNew?: boolean;
  menuItems?: Array<{ permissions: string[] }>;
  projectPermissions?: { permissions: Record<string, boolean> | null };
  isAdminOfAnyOrganization?: boolean;
} = {}) =>
  render(
    <ApplicationContextProvider
      user={createUser(isAdminOfAnyOrganization)}
      environment={environment}
    >
      <IntlProvider locale="en">
        <NavbarGroupHeader
          label={label}
          isNew={isNew}
          menuItems={menuItems}
          projectPermissions={projectPermissions}
        />
      </IntlProvider>
    </ApplicationContextProvider>
  );

describe('NavbarGroupHeader', () => {
  it('renders the label', () => {
    renderHeader();

    expect(screen.getByText('Agent Sphere')).toBeInTheDocument();
  });

  it('does not render the badge when isNew is false', () => {
    renderHeader({ isNew: false });

    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });

  it('renders the badge without a surrounding NimbusProvider', () => {
    renderHeader({ isNew: true });

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders the badge once inside a NimbusProvider', () => {
    render(
      <ApplicationContextProvider
        user={createUser(false)}
        environment={environment}
      >
        <IntlProvider locale="en">
          <NimbusProvider locale="en" loadFonts={false}>
            <NavbarGroupHeader
              label="Agent Sphere"
              isNew
              menuItems={visibleMenus}
              projectPermissions={emptyProjectPermissions}
            />
          </NimbusProvider>
        </IntlProvider>
      </ApplicationContextProvider>
    );

    expect(screen.getAllByText('New')).toHaveLength(1);
  });

  describe('permission visibility', () => {
    it('does not render when no menu permissions match', () => {
      renderHeader({
        menuItems: [{ permissions: ['ViewProducts'] }],
        projectPermissions: { permissions: { canViewOrders: true } },
      });

      expect(screen.queryByText('Agent Sphere')).not.toBeInTheDocument();
    });

    it('renders when at least one menu permission matches', () => {
      renderHeader({
        menuItems: [
          { permissions: ['ViewProducts'] },
          { permissions: ['ViewOrders'] },
        ],
        projectPermissions: { permissions: { canViewOrders: true } },
      });

      expect(screen.getByText('Agent Sphere')).toBeInTheDocument();
    });

    it('renders when a menu has no permissions (always visible)', () => {
      renderHeader({
        menuItems: [{ permissions: [] }],
        projectPermissions: { permissions: {} },
      });

      expect(screen.getByText('Agent Sphere')).toBeInTheDocument();
    });

    it('does not render when menu requires Administrator and user is not admin of any organization', () => {
      renderHeader({
        menuItems: [{ permissions: ['Administrator'] }],
        projectPermissions: { permissions: {} },
        isAdminOfAnyOrganization: false,
      });

      expect(screen.queryByText('Agent Sphere')).not.toBeInTheDocument();
    });

    it('renders when menu requires Administrator and user is admin of any organization', () => {
      renderHeader({
        menuItems: [{ permissions: ['Administrator'] }],
        projectPermissions: { permissions: {} },
        isAdminOfAnyOrganization: true,
      });

      expect(screen.getByText('Agent Sphere')).toBeInTheDocument();
    });
  });

  describe('when Nimbus is not installed', () => {
    afterEach(() => {
      jest.resetModules();
    });

    it('does not render the badge', () => {
      jest.isolateModules(() => {
        // Mirrors what the mc-scripts bundler fallback produces when Nimbus is
        // not installed: an empty module, so every named import is `undefined`.
        jest.doMock('@commercetools/nimbus', () => ({}));
        // Require React from the isolated registry so the component and the
        // renderer share a single React instance.
        const { act, createElement } = require('react');
        const { createRoot } = require('react-dom/client');
        const { IntlProvider: IsolatedIntlProvider } = require('react-intl');
        const {
          ApplicationContextProvider: IsolatedApplicationContextProvider,
        } = require('@commercetools-frontend/application-shell-connectors');
        const IsolatedNavbarGroupHeader =
          require('./navbar-group-header').default;

        const container = document.createElement('div');
        const root = createRoot(container);
        // Testing Library cannot be required inside `isolateModules`, so drive
        // React's `act` directly.
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
          root.render(
            createElement(
              IsolatedApplicationContextProvider,
              {
                user: createUser(false),
                environment,
              },
              createElement(
                IsolatedIntlProvider,
                { locale: 'en' },
                createElement(IsolatedNavbarGroupHeader, {
                  label: 'Agent Sphere',
                  isNew: true,
                  menuItems: visibleMenus,
                  projectPermissions: emptyProjectPermissions,
                })
              )
            )
          );
        });

        expect(container).toHaveTextContent('Agent Sphere');
        expect(container).not.toHaveTextContent('New');
        act(() => root.unmount());
      });
    });
  });
});
