import React from 'react';
import { renderApp, waitFor } from '../../test-utils';
import ApplicationHelmet from './application-helmet';

describe.each`
  route                              | title
  ${`/project-key/products`}         | ${`products - project-key`}
  ${`/project-key/products/new`}     | ${`products > new - project-key`}
  ${`/project-key/products/123`}     | ${`products > 123 - project-key`}
  ${`/account/projects`}             | ${`projects - Account`}
  ${`/account/projects/project-key`} | ${`projects > project-key - Account`}
`(`when location is "$route"`, ({ route, title }) => {
  it('should render page title', async () => {
    renderApp(<ApplicationHelmet>Hello</ApplicationHelmet>, {
      route,
    });
    await waitFor(() => {
      expect(document.title).toBe(title);
    });
  });
});

describe('when the location pathname is long', () => {
  it('should render page title, but with parts of the breadcrumb truncated', async () => {
    renderApp(<ApplicationHelmet>Hello</ApplicationHelmet>, {
      route: `/account/organizations/1234567890/teams/1234567890/permissions/a-long-project-key-value/menu-configuration/1234567890`,
    });
    await waitFor(() => {
      expect(document.title).toBe(
        'organizations > ... > menu-configuration > 1234567890 - Account'
      );
    });
  });
});

describe('when using the custom "renderPageTitle" function', () => {
  it('should render the custom value', async () => {
    renderApp(
      <ApplicationHelmet
        renderPageTitle={() => 'Create a new account - Merchant Center'}
      >
        Hello
      </ApplicationHelmet>,
      {
        route: `/login/new`,
      }
    );
    await waitFor(() => {
      expect(document.title).toBe('Create a new account - Merchant Center');
    });
  });
});
