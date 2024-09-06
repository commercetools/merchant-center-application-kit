import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { waitFor } from '../../test-utils';
import ApplicationPageTitle from './application-page-title';

const memoryHistory = (route: string) =>
  createMemoryHistory({ initialEntries: [route] });

describe.each`
  route                                                                              | title
  ${`/my-project-key/dashboard`}                                                     | ${`dashboard - my-project-key - Merchant Center`}
  ${`/my-project-key/products`}                                                      | ${`products - my-project-key - Merchant Center`}
  ${`/my-project-key/products/new`}                                                  | ${`products - my-project-key - Merchant Center`}
  ${`/my-project-key/products/<id>`}                                                 | ${`products - my-project-key - Merchant Center`}
  ${`/my-project-key/products/<id>/variants`}                                        | ${`products - my-project-key - Merchant Center`}
  ${`/my-project-key/products/<id>/variants/<id>`}                                   | ${`products - my-project-key - Merchant Center`}
  ${`/my-project-key/products/<id>/variants/<id>/prices`}                            | ${`products - my-project-key - Merchant Center`}
  ${`/my-project-key/orders/<id>`}                                                   | ${`orders - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/project/international`}                                | ${`settings - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/project/stores`}                                       | ${`settings - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/project/stores/<id>`}                                  | ${`settings - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/product-types`}                                        | ${`settings - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/product-types/<id>`}                                   | ${`settings - my-project-key - Merchant Center`}
  ${`/my-project-key/settings/product-types/<id>/attribute-definitions/detail/<id>`} | ${`settings - my-project-key - Merchant Center`}
  ${`/account/projects`}                                                             | ${`account - Merchant Center`}
  ${`/account/organizations`}                                                        | ${`account - Merchant Center`}
  ${`/account/organizations/<id>/teams`}                                             | ${`account - Merchant Center`}
  ${`/account/organizations/<id>/teams/<id>/permissions/<id>`}                       | ${`account - Merchant Center`}
  ${`/account/organizations/<id>/custom-applications`}                               | ${`account - Merchant Center`}
  ${`/account/organizations/<id>/custom-applications/owned/<id>`}                    | ${`account - Merchant Center`}
  ${`/account/organizations/<id>/custom-applications/installations/<id>`}            | ${`account - Merchant Center`}
  ${`/login`}                                                                        | ${`login - Merchant Center`}
  ${`/login/new`}                                                                    | ${`login - Merchant Center`}
  ${`/login/sso`}                                                                    | ${`login - Merchant Center`}
  ${`/login/forgot`}                                                                 | ${`login - Merchant Center`}
  ${`/login/choose`}                                                                 | ${`login - Merchant Center`}
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
  ${[`Short title`]}                                                                                           | ${`Short title - products - my-project-key - Merchant Center`}
  ${[`Long title, a very long product name`]}                                                                  | ${`Long title, ...product name - products - my-project-key - Merchant Center`}
  ${['Short title1', 'Short title2']}                                                                          | ${`Short title1 - Short title2 - products - my-project-key - Merchant Center`}
  ${['First title of product, a very long product name', 'Second title of product, a very long product name']} | ${`First title ...product name - Second title...product name - products - my-project-key - Merchant Center`}
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
        'Level 3 with...product name - products - my-project-key - Merchant Center'
      );
    });
  });
});
