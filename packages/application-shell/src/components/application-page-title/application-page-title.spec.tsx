import { waitFor } from '../../test-utils';
import ApplicationPageTitle from './application-page-title';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

const memoryHistory = (route: string) =>
  createMemoryHistory({ initialEntries: [route] });

describe.each`
  route                                                                              | title
  ${`/my-project-key/dashboard`}                                                     | ${`Dashboard - my-project-key - Merchant Center`}
  ${`/my-project-key/products`}                                                      | ${`Products - my-project-key - Merchant Center`}
  ${`/my-project-key/products/new`}                                                  | ${`Products - my-project-key - Merchant Center`}
  ${`/my-project-key/products/<id>`}                                                 | ${`Products - my-project-key - Merchant Center`}
  ${`/my-project-key/products/<id>/variants`}                                        | ${`Products - my-project-key - Merchant Center`}
  ${`/my-project-key/products/<id>/variants/<id>`}                                   | ${`Products - my-project-key - Merchant Center`}
  ${`/my-project-key/products/<id>/variants/<id>/prices`}                            | ${`Products - my-project-key - Merchant Center`}
  ${`/my-project-key/orders/<id>`}                                                   | ${`Orders - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/project/international`}                                | ${`Settings - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/project/stores`}                                       | ${`Settings - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/project/stores/<id>`}                                  | ${`Settings - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/product-types`}                                        | ${`Settings - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/product-types/<id>`}                                   | ${`Settings - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/product-types/<id>/attribute-definitions/detail/<id>`} | ${`Settings - my-project-key - Merchant Center`}
  ${`/account/projects`}                                                             | ${`Account - Merchant Center`}
  ${`/account/organizations`}                                                        | ${`Account - Merchant Center`}
  ${`/account/organizations/<id>/teams`}                                             | ${`Account - Merchant Center`}
  ${`/account/organizations/<id>/teams/<id>/permissions/<id>`}                       | ${`Account - Merchant Center`}
  ${`/account/organizations/<id>/custom-applications`}                               | ${`Account - Merchant Center`}
  ${`/account/organizations/<id>/custom-applications/owned/<id>`}                    | ${`Account - Merchant Center`}
  ${`/account/organizations/<id>/custom-applications/installations/<id>`}            | ${`Account - Merchant Center`}
  ${`/login`}                                                                        | ${`Login - Merchant Center`}
  ${`/login/new`}                                                                    | ${`Login - Merchant Center`}
  ${`/login/sso`}                                                                    | ${`Login - Merchant Center`}
  ${`/login/forgot`}                                                                 | ${`Login - Merchant Center`}
  ${`/login/choose`}                                                                 | ${`Login - Merchant Center`}
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

describe('when using the custom "content" to override default mapping', () => {
  it('should render the custom value', async () => {
    render(
      <Router history={memoryHistory('/login/new')}>
        <ApplicationPageTitle content={['Create a new account']} />
      </Router>
    );
    await waitFor(() => {
      expect(document.title).toBe(
        'Create a new account - Login - Merchant Center'
      );
    });
  });

  describe('when the page title is too long', () => {
    it('should render a truncated readable page title', async () => {
      render(
        <Router
          history={memoryHistory(
            '/my-project-key/products/productid12345/variants/variantid12345'
          )}
        >
          <ApplicationPageTitle
            content={['Some product very long product name']}
          />
        </Router>
      );
      await waitFor(() => {
        expect(document.title).toBe(
          'Some product...product name - Products - my-project-key - Merchant Center'
        );
      });
    });
  });
});
