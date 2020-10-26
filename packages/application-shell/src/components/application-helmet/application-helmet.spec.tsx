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
