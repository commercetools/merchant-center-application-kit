import { waitFor } from '../../test-utils';
import ApplicationPageTitle from './application-page-title';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

const memoryHistory = (route: string) =>
  createMemoryHistory({ initialEntries: [route] });

describe.each`
  route              | title
  ${`/login`}        | ${`Login - Merchant Center`}
  ${`/login/new`}    | ${`Login - Merchant Center`}
  ${`/login/sso`}    | ${`Login - Merchant Center`}
  ${`/login/forgot`} | ${`Login - Merchant Center`}
  ${`/login/choose`} | ${`Login - Merchant Center`}
`(`when location is "$route"`, ({ route, title }) => {
  it('should render default page title', async () => {
    render(
      <Router history={memoryHistory(route)}>
        <ApplicationPageTitle />
      </Router>
    );
    await waitFor(() => {
      expect(document.title).toBe(title);
    });
  });
});

describe.each`
  route                                                                         | title
  ${`/almond-40/dashboard`}                                                     | ${`Dashboard - ... chant Center`}
  ${`/almond-40/products`}                                                      | ${`Products - a ... chant Center`}
  ${`/almond-40/products/new`}                                                  | ${`Products - a ... chant Center`}
  ${`/almond-40/products/<id>`}                                                 | ${`Products - a ... chant Center`}
  ${`/almond-40/products/<id>/variants`}                                        | ${`Products - a ... chant Center`}
  ${`/almond-40/products/<id>/variants/<id>`}                                   | ${`Products - a ... chant Center`}
  ${`/almond-40/products/<id>/variants/<id>/prices`}                            | ${`Products - a ... chant Center`}
  ${`/almond-40/orders/<id>`}                                                   | ${`Orders - alm ... chant Center`}
  ${`/almond-40/settings/project/international`}                                | ${`Settings - a ... chant Center`}
  ${`/almond-40/settings/project/stores`}                                       | ${`Settings - a ... chant Center`}
  ${`/almond-40/settings/project/stores/<id>`}                                  | ${`Settings - a ... chant Center`}
  ${`/almond-40/settings/product-types`}                                        | ${`Settings - a ... chant Center`}
  ${`/almond-40/settings/product-types/<id>`}                                   | ${`Settings - a ... chant Center`}
  ${`/almond-40/settings/product-types/<id>/attribute-definitions/detail/<id>`} | ${`Settings - a ... chant Center`}
  ${`/account/projects`}                                                        | ${`Account - M ... chant Center`}
  ${`/account/organizations`}                                                   | ${`Account - M ... chant Center`}
  ${`/account/organizations/<id>/teams`}                                        | ${`Account - M ... chant Center`}
  ${`/account/organizations/<id>/teams/<id>/permissions/<id>`}                  | ${`Account - M ... chant Center`}
  ${`/account/organizations/<id>/custom-applications`}                          | ${`Account - M ... chant Center`}
  ${`/account/organizations/<id>/custom-applications/owned/<id>`}               | ${`Account - M ... chant Center`}
  ${`/account/organizations/<id>/custom-applications/installations/<id>`}       | ${`Account - M ... chant Center`}
`(`'when the page title is too long: "$route"`, ({ route, title }) => {
  it('should render a truncated readable page title', async () => {
    render(
      <Router history={memoryHistory(route)}>
        <ApplicationPageTitle />
      </Router>
    );
    await waitFor(() => {
      expect(document.title).toBe(title);
    });
  });
});

describe('when using the custom "renderPageTitle" function to override default mapping', () => {
  it('should render the custom value', async () => {
    render(
      <Router history={memoryHistory('/login/new')}>
        <ApplicationPageTitle renderPageTitle={['Create a new account']} />
      </Router>
    );
    await waitFor(() => {
      expect(document.title).toBe('Create A New ... chant Center');
    });
  });
});
