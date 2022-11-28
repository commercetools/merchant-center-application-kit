import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render } from '@testing-library/react';
import { waitFor } from '../../test-utils';
import ApplicationPageTitle from './application-page-title';

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

describe.each`
  content                                                                                                      | title
  ${[`Short title`]}                                                                                           | ${`Short title - Products - my-project-key - Merchant Center`}
  ${[`Long title, a very long product name`]}                                                                  | ${`Long title, ...product name - Products - my-project-key - Merchant Center`}
  ${['Short title1', 'Short title2']}                                                                          | ${`Short title1 - Short title2 - Products - my-project-key - Merchant Center`}
  ${['First title of product, a very long product name', 'Second title of product, a very long product name']} | ${`First title ...product name - Second title...product name - Products - my-project-key - Merchant Center`}
`(`'when the custom "content" is "$content"`, ({ content, title }) => {
  it('should render the custom value', async () => {
    render(
      <Router
        history={memoryHistory(
          '/my-project-key/products/product-id/variants/variant-id'
        )}
      >
        <ApplicationPageTitle additionalParts={content} />
      </Router>
    );
    await waitFor(() => {
      expect(document.title).toBe(title);
    });
  });
});
describe('when page title component content is nested in another component', () => {
  it('should render a page title from the last child component', async () => {
    render(
      <Router
        history={memoryHistory(
          '/my-project-key/products/product-id/variants/variant-id'
        )}
      >
        <ApplicationPageTitle />
        <div>
          <ApplicationPageTitle
            additionalParts={[
              'Level 1 with some product very long product name',
            ]}
          />
          <div>
            <ApplicationPageTitle
              additionalParts={[
                'Level 2 with some product very long product name',
              ]}
            />
            <div>
              <ApplicationPageTitle
                additionalParts={[
                  'Level 3 with some product very long product name',
                ]}
              />
            </div>
          </div>
        </div>
      </Router>
    );
    await waitFor(() => {
      expect(document.title).toBe(
        'Level 3 with...product name - Products - my-project-key - Merchant Center'
      );
    });
  });
});
