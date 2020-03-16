import { mocked } from 'ts-jest/utils';
import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { renderApp, wait as waitFor } from '../../test-utils';
import { TFetchApplicationsMenuQuery } from '../../types/generated/proxy';
import FetchApplicationsMenu from './fetch-applications-menu.proxy.graphql';
import useApplicationsMenu, {
  MenuKey,
  Config,
  MenuLoaderResult,
} from './use-applications-menu';

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
        {applicationsMenu.map(menu => (
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
        {applicationsMenu.map(menu => (
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
      const rendered = renderApp(<NavBarTest />, {
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
      await rendered.findByText('loading');
      await rendered.findByText(/Key: orders/i);
    });
  });
  describe('when the query fails', () => {
    it('should report error to sentry', async () => {
      console.error = jest.fn();
      mocked(reportErrorToSentry).mockClear();
      const error = new Error('Oops');
      const rendered = renderApp(
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
      await rendered.findByText('loading');
      await waitFor(() => {
        expect(reportErrorToSentry).toHaveBeenCalled();
      });
    });
  });
});
describe('loading the menu for local development', () => {
  it('should render menu key', async () => {
    const rendered = renderApp(
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
    await rendered.findByText('loading');
    await rendered.findByText(/Key: orders/i);
    await rendered.findByText(/Key: products/i);
    await rendered.findByText(/Key: customers/i);
  });
});
