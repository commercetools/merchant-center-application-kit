import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { renderApp, waitForElement, wait } from '../../test-utils';
import FetchApplicationsMenu from './fetch-applications-menu.menus.graphql';
import useApplicationsMenu from './use-applications-menu';

jest.mock('@commercetools-frontend/sentry');

/* eslint-disable react/prop-types */
const Test = props => {
  const applicationsMenu = useApplicationsMenu(props.menuConfig);
  if (applicationsMenu && applicationsMenu.navBar) {
    return applicationsMenu.navBar.map(menu => (
      <div key={menu.key}>{`Key: ${menu.key}`}</div>
    ));
  }
  return <div>{'loading'}</div>;
};
/* eslint-enable react/prop-types */

const createTestMenuConfig = (key, props) => ({
  key,
  labelAllLocales: [{ locale: 'en', value: upperFirst(key) }],
  uriPath: key,
  icon: 'UserFilledIcon',
  permissions: [],
  dataFences: null,
  actionRights: null,
  featureToggle: null,
  menuVisibility: `hide${upperFirst(key)}`,
  submenu: [
    {
      key: `${key}-new`,
      labelAllLocales: [{ locale: 'en', value: `${upperFirst(key)} new` }],
      menuVisibility: `hide${upperFirst(key)}New`,
      uriPath: `${key}/new`,
      permissions: [],
      actionRights: null,
      dataFences: null,
      featureToggle: null,
    },
  ],
  shouldRenderDivider: false,
  ...props,
});

const createGraphqlResponse = custom => ({
  loading: false,
  applicationsMenu: {
    appBar: [],
    navBar: [createTestMenuConfig('orders')],
  },
  ...custom,
});

describe('fetching the menu query', () => {
  describe('when the query succeeds', () => {
    it('should render menu key', async () => {
      const { getByText } = renderApp(<Test />, {
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
      await waitForElement(() => getByText('loading'));
      await waitForElement(() => getByText(/Key: orders/i));
    });
  });
  describe('when the query fails', () => {
    it('should report error to sentry', async () => {
      console.error = jest.fn();
      reportErrorToSentry.mockClear();
      const error = new Error('Oops');
      const { getByText } = renderApp(
        <Test
          menuConfig={{
            queryOptions: { onError: reportErrorToSentry },
          }}
        />,
        {
          mocks: [
            {
              request: {
                query: FetchApplicationsMenu,
              },
              error,
            },
          ],
        }
      );
      await waitForElement(() => getByText('loading'));
      await wait(() => {
        expect(reportErrorToSentry).toHaveBeenCalled();
      });
    });
  });
});
describe('loading the menu for local development', () => {
  it('should render menu key', async () => {
    const { getByText } = renderApp(
      <Test
        menuConfig={{
          skipRemoteQuery: true,
          options: {
            __DEV_CONFIG__: {
              menuLoader: () =>
                Promise.all([
                  Promise.resolve(createTestMenuConfig('orders')),
                  Promise.resolve(createTestMenuConfig('products')),
                  Promise.resolve(createTestMenuConfig('customers')),
                ]),
              menuKey: 'navBar',
            },
          },
        }}
      />
    );
    await waitForElement(() => getByText('loading'));
    await waitForElement(() => getByText(/Key: orders/i));
    await waitForElement(() => getByText(/Key: products/i));
    await waitForElement(() => getByText(/Key: customers/i));
  });
});
