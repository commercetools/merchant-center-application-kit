import { waitFor } from '../../test-utils';
import ApplicationPageTitle from './application-page-title';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

const memoryHistory = (route: string) =>
  createMemoryHistory({ initialEntries: [route] });

describe.each`
  route                                                                         | title
  ${`/almond-40/dashboard`}                                                     | ${`Dashboard - almond-40 - Merchant Center`}
  ${`/almond-40/products`}                                                      | ${`Products - almond-40 - Merchant Center`}
  ${`/almond-40/products/new`}                                                  | ${`Products - almond-40 - Merchant Center`}
  ${`/almond-40/products/<id>`}                                                 | ${`Products - almond-40 - Merchant Center`}
  ${`/almond-40/products/<id>/variants`}                                        | ${`Products - almond-40 - Merchant Center`}
  ${`/almond-40/products/<id>/variants/<id>`}                                   | ${`Products - almond-40 - Merchant Center`}
  ${`/almond-40/products/<id>/variants/<id>/prices`}                            | ${`Products - almond-40 - Merchant Center`}
  ${`/almond-40/orders/<id>`}                                                   | ${`Orders - almond-40 - Merchant Center`}
  ${`/almond-40/settings/project/international`}                                | ${`Settings - almond-40 - Merchant Center`}
  ${`/almond-40/settings/project/stores`}                                       | ${`Settings - almond-40 - Merchant Center`}
  ${`/almond-40/settings/project/stores/<id>`}                                  | ${`Settings - almond-40 - Merchant Center`}
  ${`/almond-40/settings/product-types`}                                        | ${`Settings - almond-40 - Merchant Center`}
  ${`/almond-40/settings/product-types/<id>`}                                   | ${`Settings - almond-40 - Merchant Center`}
  ${`/almond-40/settings/product-types/<id>/attribute-definitions/detail/<id>`} | ${`Settings - almond-40 - Merchant Center`}
  ${`/account/projects`}                                                        | ${`Account - Merchant Center`}
  ${`/account/organizations`}                                                   | ${`Account - Merchant Center`}
  ${`/account/organizations/<id>/teams`}                                        | ${`Account - Merchant Center`}
  ${`/account/organizations/<id>/teams/<id>/permissions/<id>`}                  | ${`Account - Merchant Center`}
  ${`/account/organizations/<id>/custom-applications`}                          | ${`Account - Merchant Center`}
  ${`/account/organizations/<id>/custom-applications/owned/<id>`}               | ${`Account - Merchant Center`}
  ${`/account/organizations/<id>/custom-applications/installations/<id>`}       | ${`Account - Merchant Center`}
  ${`/login`}                                                                   | ${`Login - Merchant Center`}
  ${`/login/new`}                                                               | ${`Login - Merchant Center`}
  ${`/login/sso`}                                                               | ${`Login - Merchant Center`}
  ${`/login/forgot`}                                                            | ${`Login - Merchant Center`}
  ${`/login/choose`}                                                            | ${`Login - Merchant Center`}
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

describe('when using the custom "renderPageTitle" function to override default mapping', () => {
  it('should render the custom value', async () => {
    render(
      <Router history={memoryHistory('/login/new')}>
        <ApplicationPageTitle renderPageTitle={['Create a new account']} />
      </Router>
    );
    await waitFor(() => {
      expect(document.title).toBe(
        'Create A New Account - Login - Merchant Center'
      );
    });
  });

  describe('when the page title is too long', () => {
    it('should render a truncated readable page title', async () => {
      render(
        <Router
          history={memoryHistory(
            '/almond-40/products/productid12345/variants/variantid12345'
          )}
        >
          <ApplicationPageTitle
            renderPageTitle={['Some product very long product name']}
          />
        </Router>
      );
      await waitFor(() => {
        expect(document.title).toBe(
          'Some Product ... Product Name - Products - almond-40 - Merchant Center'
        );
      });
    });
  });
});
