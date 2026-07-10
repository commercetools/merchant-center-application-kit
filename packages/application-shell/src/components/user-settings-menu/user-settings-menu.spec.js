import upperFirst from 'lodash/upperFirst';
import {
  LOGOUT_REASONS,
  SUPPORT_PORTAL_URL,
} from '@commercetools-frontend/constants';
import FetchApplicationsMenu from '../../hooks/use-applications-menu/fetch-applications-menu.proxy.graphql';
import { screen, renderApp, fireEvent, waitFor } from '../../test-utils';
import UserSettingsMenu from './user-settings-menu';

const createTestProps = (custom = {}) => ({
  email: 'john.snow@got.com',
  firstName: 'John',
  lastName: 'Snow',
  gravatarHash: '111',
  language: 'en',
  ...custom,
});
const createTestMenuConfig = (key, custom = {}) => ({
  key,
  labelAllLocales: [{ locale: 'en', value: upperFirst(key) }],
  uriPath: key,
  permissions: [],
  featureToggle: '',
  ...custom,
});
const createGraphqlResponse = (custom = {}) => ({
  applicationsMenu: {
    appBar: [createTestMenuConfig('projects')],
    navBarGroups: [],
  },
  ...custom,
});
const linkChecker = () => async (label, href) => {
  const link = await screen.findByText(label);
  expect(link.closest('a')).toHaveAttribute('href', href);
};

describe('rendering', () => {
  describe('when fetching remote menu config', () => {
    it('should open the menu and inspect the links', async () => {
      const props = createTestProps();
      renderApp(<UserSettingsMenu {...props} />, {
        disableRoutePermissionCheck: true,
        environment: {
          servedByProxy: 'true',
        },
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

      // Make sure Downshift combobox is correctly labelled (a11y)
      const dropdownCombobox = await screen.findByLabelText(
        /^user settings menu$/i
      );
      expect(dropdownCombobox).toHaveAttribute('role', 'combobox');

      const dropdownMenu = await screen.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);
      // Menu should be open
      await screen.findByRole('button', {
        name: /close user settings menu/i,
      });

      const checkLink = linkChecker();

      // Projects link
      await checkLink('Projects', '/account/projects');
      // Privacy link
      await checkLink(
        'Privacy Policy',
        'https://commercetools.com/privacy#suppliers'
      );
      // Support link
      await checkLink('Support', SUPPORT_PORTAL_URL);
      // Logout link
      await checkLink('Logout', `/logout?reason=${LOGOUT_REASONS.USER}`);
    });
  });
  describe('when fetching dev menu config', () => {
    it('should open the menu and inspect the links', async () => {
      const props = createTestProps();
      renderApp(<UserSettingsMenu {...props} />, {
        disableRoutePermissionCheck: true,
        environment: {
          __DEVELOPMENT__: {
            // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
            accountLinks: [createTestMenuConfig('projects')],
          },
        },
        disableAutomaticEntryPointRoutes: true,
      });
      const dropdownMenu = await screen.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);
      // Menu should be open
      await screen.findByRole('button', {
        name: /close user settings menu/i,
      });

      const checkLink = linkChecker();

      // Projects link
      await checkLink('Projects', '/account/projects');
      // Privacy link
      await checkLink(
        'Privacy Policy',
        'https://commercetools.com/privacy#suppliers'
      );
      // Support link
      await checkLink('Support', SUPPORT_PORTAL_URL);
      // Logout link
      await checkLink('Logout', `/logout?reason=${LOGOUT_REASONS.USER}`);
    });
  });
  describe('when clicking on the projects link', () => {
    it('should navigate to projects route and close the user menu', async () => {
      const props = createTestProps();
      const { history } = renderApp(<UserSettingsMenu {...props} />, {
        disableRoutePermissionCheck: true,
        environment: {
          __DEVELOPMENT__: {
            // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
            accountLinks: [createTestMenuConfig('projects')],
          },
        },
        disableAutomaticEntryPointRoutes: true,
      });
      const dropdownMenu = await screen.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);
      // Menu should be open
      await screen.findByRole('button', {
        name: /close user settings menu/i,
      });

      const link = screen.queryByText('Projects');
      fireEvent.click(link);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/account/projects');
      });
      // Menu should be closed
      await screen.findByRole('button', {
        name: /open user settings menu/i,
      });
    });
  });
  describe('when a menu item has a boolean feature toggle set to true', () => {
    it('should render the menu item', async () => {
      const props = createTestProps();
      renderApp(<UserSettingsMenu {...props} />, {
        disableRoutePermissionCheck: true,
        flags: { myBooleanFlag: true },
        environment: {
          __DEVELOPMENT__: {
            // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
            accountLinks: [
              createTestMenuConfig('flagged-item', {
                featureToggle: 'myBooleanFlag',
              }),
            ],
          },
        },
        disableAutomaticEntryPointRoutes: true,
      });
      const dropdownMenu = await screen.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);

      expect(await screen.findByText('Flagged-item')).toBeInTheDocument();
    });
  });
  describe('when a menu item has a long-lived feature toggle with value true', () => {
    it('should render the menu item', async () => {
      const props = createTestProps();
      renderApp(<UserSettingsMenu {...props} />, {
        disableRoutePermissionCheck: true,
        flags: { myLongLivedFlag: { value: true, reason: 'on' } },
        environment: {
          __DEVELOPMENT__: {
            // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
            accountLinks: [
              createTestMenuConfig('long-lived-item', {
                featureToggle: 'myLongLivedFlag',
              }),
            ],
          },
        },
        disableAutomaticEntryPointRoutes: true,
      });
      const dropdownMenu = await screen.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);

      expect(await screen.findByText('Long-lived-item')).toBeInTheDocument();
    });
  });
  describe('when a menu item has a feature toggle set to false', () => {
    it('should not render the menu item', async () => {
      const props = createTestProps();
      renderApp(<UserSettingsMenu {...props} />, {
        disableRoutePermissionCheck: true,
        flags: { myDisabledFlag: false },
        environment: {
          __DEVELOPMENT__: {
            // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
            accountLinks: [
              createTestMenuConfig('disabled-item', {
                featureToggle: 'myDisabledFlag',
              }),
            ],
          },
        },
        disableAutomaticEntryPointRoutes: true,
      });
      const dropdownMenu = await screen.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);
      // Wait for the menu to be open
      await screen.findByRole('button', {
        name: /close user settings menu/i,
      });

      expect(screen.queryByText('Disabled-item')).not.toBeInTheDocument();
    });
  });
  describe('when clicking on the Privacy link', () => {
    it('should close the user menu', async () => {
      const props = createTestProps();
      renderApp(<UserSettingsMenu {...props} />, {
        disableRoutePermissionCheck: true,
        environment: {
          __DEVELOPMENT__: {
            // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
            accountLinks: [createTestMenuConfig('projects')],
          },
        },
        disableAutomaticEntryPointRoutes: true,
      });
      const dropdownMenu = await screen.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);
      // Menu should be open
      await screen.findByRole('button', {
        name: /close user settings menu/i,
      });

      const link = screen.queryByText('Privacy Policy');
      fireEvent.click(link);

      // Menu should be closed
      await screen.findByRole('button', {
        name: /open user settings menu/i,
      });
    });
  });
  describe('when clicking on the Support link', () => {
    it('should close the user menu', async () => {
      const props = createTestProps();
      renderApp(<UserSettingsMenu {...props} />, {
        disableRoutePermissionCheck: true,
        environment: {
          __DEVELOPMENT__: {
            // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
            accountLinks: [createTestMenuConfig('projects')],
          },
        },
        disableAutomaticEntryPointRoutes: true,
      });
      const dropdownMenu = await screen.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);
      // Menu should be open
      await screen.findByRole('button', {
        name: /close user settings menu/i,
      });

      const link = screen.queryByText('Support');
      fireEvent.click(link);

      // Menu should be closed
      await screen.findByRole('button', {
        name: /open user settings menu/i,
      });
    });
  });
});
