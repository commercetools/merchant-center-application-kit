import React from 'react';
import upperFirst from 'lodash/upperFirst';
import {
  LOGOUT_REASONS,
  SUPPORT_PORTAL_URL,
} from '@commercetools-frontend/constants';
import { renderApp, fireEvent, waitFor } from '../../test-utils';
import FetchApplicationsMenu from '../../hooks/use-applications-menu/fetch-applications-menu.proxy.graphql';
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
    navBar: [],
  },
  ...custom,
});
const linkChecker = (rendered) => (label, href) => {
  const link = rendered.queryByText(label);
  expect(link.closest('a')).toHaveAttribute('href', href);
};

describe('rendering', () => {
  describe('when fetching remote menu config', () => {
    it('should open the menu and inspect the links', async () => {
      const props = createTestProps();
      const rendered = renderApp(<UserSettingsMenu {...props} />, {
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
      const dropdownMenu = await rendered.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);
      // Menu should be open
      await rendered.findByRole('button', {
        name: /close user settings menu/i,
      });

      const checkLink = linkChecker(rendered);

      // Projects link
      checkLink('Projects', '/account/projects');
      // Privacy link
      checkLink(
        'Privacy Policy',
        'https://commercetools.com/privacy#suppliers'
      );
      // Support link
      checkLink('Support', SUPPORT_PORTAL_URL);
      // Logout link
      checkLink('Logout', `/logout?reason=${LOGOUT_REASONS.USER}`);
    });
  });
  describe('when fetching dev menu config', () => {
    it('should open the menu and inspect the links', async () => {
      const props = createTestProps({
        DEV_ONLY__loadAppbarMenuConfig: () =>
          Promise.all([Promise.resolve(createTestMenuConfig('projects'))]),
      });
      const rendered = renderApp(<UserSettingsMenu {...props} />);
      const dropdownMenu = await rendered.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);
      // Menu should be open
      await rendered.findByRole('button', {
        name: /close user settings menu/i,
      });

      const checkLink = linkChecker(rendered);

      // Projects link
      checkLink('Projects', '/account/projects');
      // Privacy link
      checkLink(
        'Privacy Policy',
        'https://commercetools.com/privacy#suppliers'
      );
      // Support link
      checkLink('Support', SUPPORT_PORTAL_URL);
      // Logout link
      checkLink('Logout', `/logout?reason=${LOGOUT_REASONS.USER}`);
    });
  });
  describe('when clicking on the projects link', () => {
    it('should navigate to projects route and close the user menu', async () => {
      const props = createTestProps({
        DEV_ONLY__loadAppbarMenuConfig: () =>
          Promise.all([Promise.resolve(createTestMenuConfig('projects'))]),
      });
      const rendered = renderApp(<UserSettingsMenu {...props} />);
      const dropdownMenu = await rendered.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);
      // Menu should be open
      await rendered.findByRole('button', {
        name: /close user settings menu/i,
      });

      const link = rendered.queryByText('Projects');
      fireEvent.click(link);

      // Menu should be closed
      await rendered.findByRole('button', {
        name: /open user settings menu/i,
      });
      await waitFor(() => {
        expect(rendered.history.location.pathname).toBe('/account/projects');
      });
    });
  });
  describe('when clicking on the Privacy link', () => {
    it('should close the user menu', async () => {
      const props = createTestProps({
        DEV_ONLY__loadAppbarMenuConfig: () =>
          Promise.all([Promise.resolve(createTestMenuConfig('projects'))]),
      });
      const rendered = renderApp(<UserSettingsMenu {...props} />);
      const dropdownMenu = await rendered.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);
      // Menu should be open
      await rendered.findByRole('button', {
        name: /close user settings menu/i,
      });

      const link = rendered.queryByText('Privacy Policy');
      fireEvent.click(link);

      // Menu should be closed
      await rendered.findByRole('button', {
        name: /open user settings menu/i,
      });
    });
  });
  describe('when clicking on the Support link', () => {
    it('should close the user menu', async () => {
      const props = createTestProps({
        DEV_ONLY__loadAppbarMenuConfig: () =>
          Promise.all([Promise.resolve(createTestMenuConfig('projects'))]),
      });
      const rendered = renderApp(<UserSettingsMenu {...props} />);
      const dropdownMenu = await rendered.findByRole('button', {
        name: /open user settings menu/i,
      });
      fireEvent.click(dropdownMenu);
      // Menu should be open
      await rendered.findByRole('button', {
        name: /close user settings menu/i,
      });

      const link = rendered.queryByText('Support');
      fireEvent.click(link);

      // Menu should be closed
      await rendered.findByRole('button', {
        name: /open user settings menu/i,
      });
    });
  });
});
