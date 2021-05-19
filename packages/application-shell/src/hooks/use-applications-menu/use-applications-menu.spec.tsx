import type { TFetchApplicationsMenuQuery } from '../../types/generated/proxy';
import type {
  MenuKey,
  Config,
  MenuLoaderResult,
} from './use-applications-menu';

import { mocked } from 'ts-jest/utils';
import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { screen, renderApp, waitFor } from '../../test-utils';
import FetchApplicationsMenu from './fetch-applications-menu.proxy.graphql';
import useApplicationsMenu from './use-applications-menu';

jest.mock('@commercetools-frontend/sentry');

type TestProps<Key extends MenuKey> = {
  menuConfig?: Config<Key>;
};

const NavBarTest = (props: TestProps<'navBar'>) => {
  const applicationsMenu = useApplicationsMenu<'navBar'>(
    'navBar',
    props.menuConfig
  );
  if (applicationsMenu) {
    return (
      <>
        {applicationsMenu.map((menu) => (
          <div key={menu.key}>{`Key: ${menu.key}`}</div>
        ))}
      </>
    );
  }
  return <div>{'loading'}</div>;
};
const AppBarTest = (props: TestProps<'appBar'>) => {
  const applicationsMenu = useApplicationsMenu<'appBar'>(
    'appBar',
    props.menuConfig
  );
  if (applicationsMenu) {
    return (
      <>
        {applicationsMenu.map((menu) => (
          <div key={menu.key}>{`Key: ${menu.key}`}</div>
        ))}
      </>
    );
  }
  return <div>{'loading'}</div>;
};

const createTestNavBarMenuConfig = (
  key: string,
  props: Partial<MenuLoaderResult<'navBar'>[0]> = {}
) => ({
  key,
  labelAllLocales: [{ locale: 'en', value: upperFirst(key) }],
  uriPath: key,
  icon: 'UserFilledIcon',
  permissions: [],
  dataFences: [],
  actionRights: [],
  featureToggle: '',
  menuVisibility: `hide${upperFirst(key)}`,
  submenu: [
    {
      key: `${key}-new`,
      labelAllLocales: [{ locale: 'en', value: `${upperFirst(key)} new` }],
      menuVisibility: `hide${upperFirst(key)}New`,
      uriPath: `${key}/new`,
      permissions: [],
      actionRights: [],
      dataFences: [],
      featureToggle: '',
    },
  ],
  shouldRenderDivider: false,
  ...props,
});

const createGraphqlResponse = (
  custom: Partial<TFetchApplicationsMenuQuery> = {}
) => ({
  applicationsMenu: {
    appBar: [],
    navBar: [createTestNavBarMenuConfig('orders')],
  },
  ...custom,
});

describe('fetching the menu query', () => {
  describe('when the query succeeds', () => {
    it('should render menu key', async () => {
      renderApp(<NavBarTest />, {
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
      await screen.findByText('loading');
      await screen.findByText(/Key: orders/i);
    });
  });
  describe('when the query fails', () => {
    it('should report error to sentry', async () => {
      console.error = jest.fn();
      mocked(reportErrorToSentry).mockClear();
      const error = new Error('Oops');
      renderApp(
        <AppBarTest
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
      await screen.findByText('loading');
      await waitFor(() => {
        expect(reportErrorToSentry).toHaveBeenCalled();
      });
    });
  });
});
describe('loading the menu for local development', () => {
  it('should render menu key', async () => {
    renderApp(
      <NavBarTest
        menuConfig={{
          skipRemoteQuery: true,
          loadMenuConfig: () =>
            Promise.all([
              Promise.resolve(createTestNavBarMenuConfig('orders')),
              Promise.resolve(createTestNavBarMenuConfig('products')),
              Promise.resolve(createTestNavBarMenuConfig('customers')),
            ]),
        }}
      />
    );
    await screen.findByText('loading');
    await screen.findByText(/Key: orders/i);
    await screen.findByText(/Key: products/i);
    await screen.findByText(/Key: customers/i);
  });
});
