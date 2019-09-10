import React from 'react';
import { customProperties } from '@commercetools-frontend/ui-kit';
import {
  GRAPHQL_TARGETS,
  MC_API_PROXY_TARGETS,
} from '@commercetools-frontend/constants';
import {
  renderAppWithRedux,
  fireEvent,
  waitForElement,
  wait,
} from '../../test-utils';
import * as gtm from '../../utils/gtm';
import QuickAccessQuery from './quick-access.ctp.graphql';
import QuickAccess from './index';

jest.mock('../../utils/gtm');

const createMatchlessSearchMock = (searchText, variables = {}) => ({
  request: {
    query: QuickAccessQuery,
    variables: {
      searchText,
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      canViewProducts: true,
      productsWhereClause: 'id in ()',
      includeProductsByIds: false,
      ...variables,
    },
  },
  result: {
    data: {
      productsById: null,
      productById: null,
      productByKey: null,
      productByVariantSku: null,
      productByVariantKey: null,
    },
  },
});

const managePermissions = {
  canManageProducts: true,
  canViewProducts: true,
  canManageCategories: true,
  canViewCategories: true,
  canManageCustomers: true,
  canViewCustomers: true,
  canManageCustomerGroups: true,
  canViewCustomerGroups: true,
  canManageOrders: true,
  canViewOrders: true,
  canManageProductDiscounts: true,
  canViewProductDiscounts: true,
  canManageCartDiscounts: true,
  canViewCartDiscounts: true,
  canManageDiscountCodes: true,
  canViewDiscountCodes: true,
  canManageProjectSettings: true,
  canViewProjectSettings: true,
  canManageProductTypes: true,
  canViewProductTypes: true,
  canManageDeveloperSettings: true,
  canViewDeveloperSettings: true,
};

const flags = {
  pimSearch: true,
  customApplications: true,
  canViewDashboard: true,
};

const createPimAvailabilityCheckSdkMock = (projectDataLocale = 'en') => ({
  action: {
    type: 'SDK',
    payload: {
      method: 'POST',
      uri: '/test-with-big-data/search/products',
      mcApiProxyTarget: MC_API_PROXY_TARGETS.PIM_SEARCH,
      payload: {
        query: {
          fullText: {
            field: 'name',
            language: projectDataLocale,
            value: 'availability-check',
          },
        },
        limit: 0,
        offset: 0,
      },
    },
  },
  response: {},
});

const createPimSearchSdkMock = (
  searchText,
  { projectDataLocale = 'en' } = {}
) => ({
  action: {
    type: 'SDK',
    payload: {
      method: 'POST',
      uri: '/test-with-big-data/search/products',
      mcApiProxyTarget: MC_API_PROXY_TARGETS.PIM_SEARCH,
      payload: {
        query: {
          fullText: {
            field: 'name',
            language: projectDataLocale,
            value: searchText,
          },
        },
        sort: [
          {
            field: 'name',
            language: projectDataLocale,
            order: 'desc',
          },
        ],
        limit: 9,
        offset: 0,
      },
    },
  },
  response: {},
});

describe('QuickAccess', () => {
  beforeEach(() => {
    gtm.track.mockReset();
    global.open = jest.fn();
    global.location.replace = jest.fn();
  });

  it('should open when pressing "f" on document body', async () => {
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      sdkMocks: [createPimAvailabilityCheckSdkMock()],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    // Value should be empty. The "f" should not end up as part of the value.
    expect(rendered.queryByTestId('quick-access-search-input')).toHaveAttribute(
      'value',
      ''
    );
  });

  it('should open when pressing "f" on an element with tabIndex="-1" (like a modal)', async () => {
    const rendered = renderAppWithRedux(
      <div>
        <QuickAccess />
        <div tabIndex="-1" data-testid="modal">
          Modal
        </div>
      </div>,
      {
        sdkMocks: [createPimAvailabilityCheckSdkMock()],
      }
    );

    // open quick-access
    fireEvent.keyDown(rendered.getByTestId('modal'), { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    // Value should be empty. The "f" should not end up as part of the value.
    expect(rendered.queryByTestId('quick-access-search-input')).toHaveAttribute(
      'value',
      ''
    );
  });

  it('should not close when the search input is clicked', async () => {
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      sdkMocks: [createPimAvailabilityCheckSdkMock()],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    fireEvent.click(rendered.getByTestId('quick-access-search-input'));

    // It should not close, so the element should still be around
    expect(rendered.queryByTestId('quick-access-search-input')).toBeVisible();
  });

  it('should not open when pressing "f" not directly on other focusable elements', () => {
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      sdkMocks: [createPimAvailabilityCheckSdkMock()],
    });

    // open quick-access
    fireEvent.keyDown(document.body.firstChild, { key: 'f' });
    expect(rendered.queryByTestId('quick-access')).toBeNull();
  });

  it('should track when QuickAccess is opened', async () => {
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      sdkMocks: [createPimAvailabilityCheckSdkMock()],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    expect(gtm.track).toHaveBeenCalledTimes(1);
    expect(gtm.track).toHaveBeenCalledWith(
      'keydown',
      'QuickAccess',
      'quick_access_open'
    );
  });

  it('should close when pressing Escape', async () => {
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      sdkMocks: [createPimAvailabilityCheckSdkMock()],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => rendered.getByTestId('quick-access'));

    expect(rendered.queryByTestId('quick-access')).toBeInTheDocument();

    // close quick-access
    fireEvent.keyDown(rendered.getByTestId('quick-access-search-input'), {
      key: 'Escape',
    });
    expect(rendered.queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should show results when searching for Dashboard', async () => {
    const mocks = [createMatchlessSearchMock('Open dshbrd')];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('Open dshbrd'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await waitForElement(() => rendered.getByText('Open Dashboard'));
    expect(rendered.queryByText('Open Dashboard')).toBeInTheDocument();
  });
  describe('when there are no results', () => {
    it('should show information message when searching does not yield results', async () => {
      const mocks = [
        {
          request: {
            query: QuickAccessQuery,
            variables: {
              searchText: 'A thing which does not exist',
              canViewProducts: true,
              target: 'ctp',
              productsWhereClause: 'id in ()',
              includeProductsByIds: false,
            },
          },
          result: {
            data: {
              productsByIds: null,
              productById: null,
              productByKey: null,
              productByVariantSku: null,
              productByVariantKey: null,
            },
          },
        },
      ];
      const rendered = renderAppWithRedux(
        <QuickAccess />,
        // Note that this test setup isn't perfect as the sdk request
        // currently succeeds while the Apollo request fails
        // Under real conditions both requests would fail.
        {
          mocks,
          sdkMocks: [
            createPimAvailabilityCheckSdkMock(),
            createPimSearchSdkMock('A thing which does not exist'),
          ],
        }
      );
      const noResultsText = 'No results found';

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() =>
        rendered.getByTestId('quick-access-search-input')
      );

      const searchInput = rendered.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, {
        target: { value: 'A thing which does not exist' },
      });
      await waitForElement(() => rendered.getByText(noResultsText));
      // it should show the no results text
      expect(rendered.queryByText(noResultsText)).toBeVisible();

      // when input is cleared again
      fireEvent.change(searchInput, { target: { value: '' } });

      // the no results text should be removed
      expect(rendered.queryByText(noResultsText)).toBeNull();
    });
  });
  describe('when there is an error', () => {
    beforeEach(() => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
    });
    it('should show error message when searching while offline', async () => {
      const mocks = [
        {
          request: {
            query: QuickAccessQuery,
            variables: {
              searchText: 'Open dshbrd-offline',
              canViewProducts: true,
              target: 'ctp',
              productsWhereClause: 'id in ()',
              includeProductsByIds: false,
            },
          },
          error: new Error('aw shucks'),
        },
      ];
      const rendered = renderAppWithRedux(
        <QuickAccess />,
        // Note that this test setup isn't perfect as the sdk request
        // currently succeeds while the Apollo request fails
        // Under real conditions both requests would fail.
        {
          permissions: managePermissions,
          mocks,
          sdkMocks: [
            createPimAvailabilityCheckSdkMock(),
            createPimSearchSdkMock('Open dshbrd-offline'),
          ],
        }
      );
      const offlineText = 'Offline';

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() =>
        rendered.getByTestId('quick-access-search-input')
      );

      const searchInput = rendered.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, {
        target: { value: 'Open dshbrd-offline' },
      });
      await waitForElement(() => rendered.getByText(offlineText));
      // it should show the offline warning
      expect(rendered.queryByText(offlineText)).toBeVisible();

      // when input is cleared again
      fireEvent.change(searchInput, { target: { value: '' } });

      // the offline warning should be removed
      expect(rendered.queryByText(offlineText)).toBeNull();
    });
  });

  it('should open (route to) dashboard when chosing the "Open Dashboard" command', async () => {
    const mocks = [createMatchlessSearchMock('Open dshbrd')];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('Open dshbrd'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await waitForElement(() => rendered.getByText('Open Dashboard'));
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    expect(rendered.history.location.pathname).toBe(
      '/test-with-big-data/dashboard'
    );

    // should close quick access
    expect(rendered.queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should open (reload to) dashboard when chosing the "Open Dashboard" command when using full redirects for links', async () => {
    const mocks = [createMatchlessSearchMock('Open dshbrd')];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      environment: { useFullRedirectsForLinks: true },
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('Open dshbrd'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await waitForElement(() => rendered.getByText('Open Dashboard'));
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    expect(global.location.replace).toHaveBeenCalledWith(
      '/test-with-big-data/dashboard'
    );

    // should close quick access
    expect(rendered.queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  describe('on MacOS', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'appVersion', {
        value:
          '5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
        configurable: true,
      });
    });
    it('should open dashboard in new tab when chosing the "Open Dashboard" command by cmd+enter', async () => {
      const mocks = [createMatchlessSearchMock('Open dshbrd')];
      const rendered = renderAppWithRedux(<QuickAccess />, {
        permissions: managePermissions,
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() =>
        rendered.getByTestId('quick-access-search-input')
      );

      const searchInput = rendered.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await waitForElement(() => rendered.getByText('Open Dashboard'));
      fireEvent.keyDown(searchInput, { key: 'Enter', metaKey: true });
      fireEvent.keyUp(searchInput, { key: 'Enter', metaKey: true });

      expect(global.open).toHaveBeenCalledWith(
        '/test-with-big-data/dashboard',
        '_blank'
      );

      // should close quick access
      expect(rendered.queryByTestId('quick-access')).not.toBeInTheDocument();
    });

    it('should open dashboard in new tab when chosing the "Open Dashboard" command by cmd+click', async () => {
      const mocks = [createMatchlessSearchMock('Open dshbrd')];
      const rendered = renderAppWithRedux(<QuickAccess />, {
        permissions: managePermissions,
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() =>
        rendered.getByTestId('quick-access-search-input')
      );

      const searchInput = rendered.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await waitForElement(() => rendered.getByText('Open Dashboard'));
      fireEvent.click(
        rendered.getByTestId('quick-access-result(go/dashboard)'),
        {
          metaKey: true,
        }
      );

      expect(global.open).toHaveBeenCalledWith(
        '/test-with-big-data/dashboard',
        '_blank'
      );

      // should close quick access
      expect(rendered.queryByTestId('quick-access')).not.toBeInTheDocument();
    });
  });

  describe('on Windows', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'appVersion', {
        value: 'Windows Holzkiste',
        configurable: true,
      });
    });
    it('should open dashboard in new tab when chosing the "Open Dashboard" command by ctrl+enter', async () => {
      const mocks = [createMatchlessSearchMock('Open dshbrd')];
      const rendered = renderAppWithRedux(<QuickAccess />, {
        permissions: managePermissions,
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() =>
        rendered.getByTestId('quick-access-search-input')
      );

      const searchInput = rendered.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await waitForElement(() => rendered.getByText('Open Dashboard'));
      fireEvent.keyDown(searchInput, { key: 'Enter', ctrlKey: true });
      fireEvent.keyUp(searchInput, { key: 'Enter', ctrlKey: true });

      expect(global.open).toHaveBeenCalledWith(
        '/test-with-big-data/dashboard',
        '_blank'
      );

      // should close quick access
      expect(rendered.queryByTestId('quick-access')).not.toBeInTheDocument();
    });

    it('should open dashboard in new tab when chosing the "Open Dashboard" command by ctrl+click', async () => {
      const mocks = [createMatchlessSearchMock('Open dshbrd')];
      const rendered = renderAppWithRedux(<QuickAccess />, {
        permissions: managePermissions,
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() =>
        rendered.getByTestId('quick-access-search-input')
      );

      const searchInput = rendered.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await waitForElement(() => rendered.getByText('Open Dashboard'));
      fireEvent.click(
        rendered.getByTestId('quick-access-result(go/dashboard)'),
        {
          ctrlKey: true,
        }
      );

      expect(global.open).toHaveBeenCalledWith(
        '/test-with-big-data/dashboard',
        '_blank'
      );

      // should close quick access
      expect(rendered.queryByTestId('quick-access')).not.toBeInTheDocument();
    });
  });

  it('should open dashboard in new tab when chosing the "Open Dashboard" command by click', async () => {
    const mocks = [createMatchlessSearchMock('Open dshbrd')];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('Open dshbrd'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await waitForElement(() => rendered.getByText('Open Dashboard'));
    fireEvent.click(rendered.getByTestId('quick-access-result(go/dashboard)'));

    expect(rendered.history.location.pathname).toBe(
      '/test-with-big-data/dashboard'
    );

    // should close quick access
    expect(rendered.queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should cycle through the history', async () => {
    const mocks = [
      createMatchlessSearchMock('Open dshbrd'),
      createMatchlessSearchMock('Open prdcts'),
    ];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('Open dshbrd'),
        createPimSearchSdkMock('Open prdcts'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    let searchInput = rendered.getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await waitForElement(() => rendered.getByText('Open Dashboard'));
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    expect(rendered.history.location.pathname).toBe(
      '/test-with-big-data/dashboard'
    );
    expect(rendered.queryByTestId('quick-access')).not.toBeInTheDocument();

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    // create second history entry
    // we have to get the new search input
    searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open prdcts' } });
    await waitForElement(() => rendered.getByText('Open Products'));
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    expect(rendered.history.location.pathname).toBe(
      '/test-with-big-data/products'
    );
    expect(rendered.queryByTestId('quick-access')).not.toBeInTheDocument();

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    // press ArrowUp to cycle through history
    searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    const value = 'Open prdcts';
    expect(searchInput).toHaveAttribute('value', value);
    // It should select the search text
    expect(searchInput.selectionStart).toBe(0);
    expect(searchInput.selectionEnd).toBe(value.length);

    // press ArrowUp to cycle through history again
    searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    expect(searchInput).toHaveAttribute('value', 'Open dshbrd');

    // press ArrowUp to cycle through history again, but this time
    // no more results will exist, so the value stays
    searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    expect(searchInput).toHaveAttribute('value', 'Open dshbrd');

    // when now pressing key down the selection should jump down
    searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
    fireEvent.keyUp(searchInput, { key: 'ArrowDown' });

    expect(
      rendered.queryByTestId('quick-access-result(go/orders)')
    ).toHaveStyle(`color: ${customProperties.colorSurface};`);

    // when pressing up, it should jump up again
    searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    expect(
      rendered.queryByTestId('quick-access-result(go/dashboard)')
    ).toHaveStyle(`color: ${customProperties.colorSurface};`);
  });

  it('should find a product by sku', async () => {
    const mocks = [
      {
        request: {
          query: QuickAccessQuery,
          variables: {
            searchText: 'party-parrot-sku',
            canViewProducts: true,
            target: 'ctp',
            productsWhereClause: 'id in ()',
            includeProductsByIds: false,
          },
        },
        result: {
          data: {
            productsById: null,
            productById: null,
            productByKey: null,
            productByVariantSku: {
              id: 'party-parrot-id',
              key: 'party-parrot-key',
              masterData: {
                staged: {
                  nameAllLocales: [
                    {
                      locale: 'en',
                      value: 'Party Parrot',
                    },
                  ],
                  variant: {
                    sku: 'party-parrot-sku',
                    key: 'party-parrot-variant-one-key',
                    id: '1',
                  },
                },
              },
            },
            productByVariantKey: null,
          },
        },
      },
    ];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      mocks,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('party-parrot-sku'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: 'party-parrot-sku' } });
    await waitForElement(() =>
      rendered.getByText('Show Product Variant "party-parrot-sku"')
    );

    expect(
      rendered.queryByTestId(
        'quick-access-result(go/product-variant-by-sku/product(party-parrot-id)/variant(1))'
      )
    ).toHaveStyle(`color: ${customProperties.colorSurface};`);
  });

  it('should find a product by id', async () => {
    const productId = '01a1b2c3';
    const mocks = [
      {
        request: {
          query: QuickAccessQuery,
          variables: {
            searchText: productId,
            canViewProducts: true,
            target: 'ctp',
            productsWhereClause: 'id in ()',
            includeProductsByIds: false,
          },
        },
        result: {
          data: {
            productsById: null,
            productById: {
              id: productId,
              key: 'party-parrot-key',
              masterData: {
                staged: {
                  nameAllLocales: [{ locale: 'en', value: 'Party Parrot' }],
                },
              },
            },
            productByKey: null,
            productByVariantSku: null,
            productByVariantKey: null,
          },
        },
      },
    ];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      mocks,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock(productId),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: productId } });
    await waitForElement(() =>
      rendered.getByText('Show Product "Party Parrot"')
    );

    expect(
      rendered.queryByTestId(
        'quick-access-result(go/product-by-id/product(01a1b2c3))'
      )
    ).toHaveStyle(`color: ${customProperties.colorSurface};`);
  });

  it('should find a product by key', async () => {
    const mocks = [
      {
        request: {
          query: QuickAccessQuery,
          variables: {
            searchText: 'party-parrot',
            canViewProducts: true,
            target: 'ctp',
            productsWhereClause: 'id in ()',
            includeProductsByIds: false,
          },
        },
        result: {
          data: {
            productsById: null,
            productById: null,
            productByKey: {
              key: 'party-parrot',
              id: 'party-parrot-id',
              masterData: {
                staged: {
                  nameAllLocales: [
                    {
                      locale: 'en',
                      value: 'Party Parrot',
                    },
                  ],
                },
              },
            },
            productByVariantSku: null,
            productByVariantKey: null,
          },
        },
      },
    ];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      mocks,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('party-parrot'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: 'party-parrot' } });
    await waitForElement(() =>
      rendered.getByText('Show Product "party-parrot"')
    );

    expect(
      rendered.queryByTestId(
        'quick-access-result(go/product-by-key/product(party-parrot-id))'
      )
    ).toHaveStyle(`color: ${customProperties.colorSurface};`);
  });

  it('should show products in the projectDataLocale', async () => {
    const productId = 'party-parrot-product-id';
    const mocks = [
      {
        request: {
          query: QuickAccessQuery,
          variables: {
            searchText: productId,
            canViewProducts: true,
            target: 'ctp',
            productsWhereClause: 'id in ()',
            includeProductsByIds: false,
          },
        },
        result: {
          data: {
            productsById: null,
            productById: {
              id: productId,
              key: 'party-parrot-key',
              masterData: {
                staged: {
                  nameAllLocales: [
                    { locale: 'en', value: 'Party Parrot' },
                    { locale: 'de', value: 'Party Papagei' },
                  ],
                },
              },
            },
            productByKey: null,
            productByVariantSku: null,
            productByVariantKey: null,
          },
        },
      },
    ];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      dataLocale: 'de',
      mocks,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock('de'),
        createPimSearchSdkMock(productId, { projectDataLocale: 'de' }),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: productId } });
    await waitForElement(() =>
      rendered.getByText('Show Product "Party Papagei"')
    );

    expect(
      rendered.queryByTestId(
        `quick-access-result(go/product-by-id/product(${productId}))`
      )
    ).toHaveStyle(`color: ${customProperties.colorSurface};`);
  });

  it('should find sub commands', async () => {
    const searchTerm = 'Open producttypesettings';
    const mocks = [createMatchlessSearchMock(searchTerm)];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock(searchTerm),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    await waitForElement(() =>
      rendered.getByText('Open Product Types Settings')
    );
    expect(rendered.queryByText('Open Product Types Settings')).toBeVisible();
  });

  it('should be possible to navigate to sub commands and back out', async () => {
    const searchTerm = 'Open dshbrd';
    const mocks = [createMatchlessSearchMock(searchTerm)];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock(searchTerm),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    // place cursor at last position - this happens autotmatically when a real
    // user types
    searchInput.setSelectionRange(searchTerm.length, searchTerm.length);
    await waitForElement(() => rendered.getByText('Open Orders'));

    // go down to select Open orders
    fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
    fireEvent.keyUp(searchInput, { key: 'ArrowDown' });

    expect(
      rendered.queryByTestId('quick-access-result(go/orders)')
    ).toHaveStyle(`color: ${customProperties.colorSurface};`);

    // navigate into sub commands
    fireEvent.keyDown(searchInput, { key: 'ArrowRight' });
    fireEvent.keyUp(searchInput, { key: 'ArrowRight' });

    await waitForElement(() => rendered.getByText('Open Orders List'));
    expect(
      rendered.queryByTestId('quick-access-result(go/orders/list)')
    ).toHaveStyle(`color: ${customProperties.colorSurface};`);

    // navigate back out
    fireEvent.keyDown(searchInput, { key: 'ArrowLeft' });
    fireEvent.keyUp(searchInput, { key: 'ArrowLeft' });
    await waitForElement(() => rendered.getByText('Open Orders'));

    // it should select the first element in the list
    expect(
      rendered.queryByTestId('quick-access-result(go/dashboard)')
    ).toHaveStyle(`color: ${customProperties.colorSurface};`);
    expect(
      rendered.queryByTestId('quick-access-result(go/orders)')
    ).not.toHaveStyle(`color: ${customProperties.colorSurface};`);
  });

  it('should support selection by mouse', async () => {
    const searchTerm = 'Open dshbrd';
    const mocks = [createMatchlessSearchMock(searchTerm)];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock(searchTerm),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    await waitForElement(() => rendered.getByText('Open Orders'));
    const openOrdersResult = rendered.getByTestId(
      'quick-access-result(go/orders)'
    );

    // We select the second result
    fireEvent.mouseEnter(openOrdersResult);

    // it should highlight the hovered result
    expect(openOrdersResult).toHaveStyle(
      `color: ${customProperties.colorSurface};`
    );

    // Click the selected result
    fireEvent.click(openOrdersResult);

    expect(rendered.history.location.pathname).toBe(
      '/test-with-big-data/orders'
    );

    // should close quick access
    expect(rendered.queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should not show project-based commands when used outside of the project context', async () => {
    const searchTerm = 'Open Dashboard';
    const mocks = [createMatchlessSearchMock(searchTerm)];
    const rendered = renderAppWithRedux(<QuickAccess />, {
      permissions: managePermissions,
      project: null,
      mocks,
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() =>
      rendered.getByTestId('quick-access-search-input')
    );

    const searchInput = rendered.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchTerm } });

    // wait for any other result
    await waitForElement(() => rendered.getByText('Open Support'));

    // ensure "Open Dashboard" is not visible, as it needs a project context
    expect(rendered.queryByText('Open Dashboard')).toBeNull();
  });

  describe('permissions', () => {
    it('should not find "Open Orders" when user has no orders permission', async () => {
      const searchTerm = 'Opn Ordrs';
      const mocks = [createMatchlessSearchMock(searchTerm)];
      const rendered = renderAppWithRedux(<QuickAccess />, {
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchTerm),
        ],
        flags,
        permissions: {
          ...managePermissions,
          canViewOrders: false,
          canManageOrders: false,
          canViewProducts: true,
        },
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      const searchInput = await waitForElement(() =>
        rendered.getByTestId('quick-access-search-input')
      );
      fireEvent.change(searchInput, { target: { value: searchTerm } });
      await waitForElement(() => rendered.getAllByText(/^Open/));

      await wait(
        () => {
          // results should not contain "Open Orders"
          expect(rendered.queryByText('Open Orders')).toBeNull();
        },
        { timeout: 1000 }
      );
    });

    it('should find "Open Orders" when user has the view orders permission', async () => {
      const searchTerm = 'Opn Ordrs';
      const mocks = [createMatchlessSearchMock(searchTerm)];
      const rendered = renderAppWithRedux(<QuickAccess />, {
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchTerm),
        ],
        flags,
        permissions: {
          ...managePermissions,
          canViewOrders: true,
          canManageOrders: false,
          canViewProducts: true,
        },
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      const searchInput = await waitForElement(() =>
        rendered.getByTestId('quick-access-search-input')
      );
      fireEvent.change(searchInput, { target: { value: searchTerm } });

      // wait for Dashboard option
      await waitForElement(() => rendered.getByText('Open Dashboard'));

      // results should contain "Open Orders"
      expect(rendered.queryByText('Open Orders')).toBeVisible();
    });
  });

  describe('switching project-data-locale', () => {
    describe('when inside a project', () => {
      describe('when project has only one project language', () => {
        it('should not show the option to change the project-data-locale', async () => {
          const searchTerm = 'setreslan';
          const mocks = [createMatchlessSearchMock(searchTerm)];
          const rendered = renderAppWithRedux(<QuickAccess />, {
            project: {
              key: 'test-with-big-data',
              version: 43,
              name: 'Test with big data',
              countries: ['de', 'en'],
              currencies: ['EUR', 'GBP'],
              languages: ['en'],
              owner: {
                id: 'project-id-1',
              },
              suspension: { isActive: false },
              expiry: { isActive: false },
            },
            user: {
              projects: {
                total: 2,
                results: [
                  {
                    key: 'test-with-big-data',
                    version: 43,
                    name: 'Test with big data',
                    countries: ['de', 'en'],
                    currencies: ['EUR', 'GBP'],
                    languages: ['en'],
                    owner: {
                      id: 'project-id-1',
                    },
                    suspension: { isActive: false },
                    expiry: { isActive: false },
                  },
                  {
                    key: searchTerm,
                    version: 1,
                    name: searchTerm,
                    countries: ['de'],
                    currencies: ['EUR'],
                    languages: ['de'],
                    owner: {
                      id: 'project-id-2',
                    },
                    suspension: { isActive: false },
                    expiry: { isActive: false },
                  },
                ],
              },
            },
            mocks,
            sdkMocks: [
              createPimAvailabilityCheckSdkMock(),
              createPimSearchSdkMock(searchTerm),
            ],
          });

          // open quick-access
          fireEvent.keyDown(document.body, { key: 'f' });
          await waitForElement(() =>
            rendered.getByTestId('quick-access-search-input')
          );

          const searchInput = rendered.getByTestId('quick-access-search-input');
          fireEvent.change(searchInput, { target: { value: searchTerm } });
          await waitForElement(() =>
            rendered.getByText(`Switch to project "${searchTerm}"`)
          );

          expect(rendered.queryByText('Set Resource Language')).toBeNull();
        });
      });

      // describe('when project has more than one project-data-locale', () => {});
    });

    describe('when outside of a project', () => {
      it('should not show the option to change the project-data-locale', async () => {
        const searchTerm = 'setreslang2';
        const rendered = renderAppWithRedux(<QuickAccess />, {
          project: null,
          user: {
            projects: {
              results: [
                {
                  key: 'test-with-big-data',
                  version: 43,
                  name: 'Test with big data',
                  countries: ['de', 'en'],
                  currencies: ['EUR', 'GBP'],
                  languages: ['en'],
                  owner: {
                    id: 'project-id-1',
                  },
                  suspension: { isActive: false },
                  expiry: { isActive: false },
                },
                {
                  key: searchTerm,
                  version: 1,
                  name: searchTerm,
                  countries: ['de'],
                  currencies: ['EUR'],
                  languages: ['de'],
                  owner: {
                    id: 'project-id-2',
                  },
                  suspension: { isActive: false },
                  expiry: { isActive: false },
                },
              ],
            },
          },
        });

        // open quick-access
        fireEvent.keyDown(document.body, { key: 'f' });
        await waitForElement(() =>
          rendered.getByTestId('quick-access-search-input')
        );

        const searchInput = rendered.getByTestId('quick-access-search-input');
        fireEvent.change(searchInput, { target: { value: searchTerm } });
        await waitForElement(() =>
          rendered.getByText(`Switch to project "${searchTerm}"`)
        );

        expect(rendered.queryByText('Set Resource Language')).toBeNull();
      });
    });
  });

  describe('feature toggles', () => {
    it('should not find PIM-Search when the feature is toggled off', async () => {
      const searchTerm = 'Opn PIM Srch';
      const mocks = [createMatchlessSearchMock(searchTerm)];
      const rendered = renderAppWithRedux(<QuickAccess />, {
        permissions: managePermissions,
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchTerm),
        ],
        flags: { ...flags, pimSearch: false },
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() =>
        rendered.getByTestId('quick-access-search-input')
      );

      const searchInput = rendered.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: searchTerm } });
      await waitForElement(() => rendered.getByText('Open Discounts'));
      expect(rendered.queryByText('Open PIM Search')).toBeNull();
      expect(
        rendered.queryByTestId('quick-access-result(go/products/pim-search)')
      ).toBeNull();
    });

    it('should find PIM-Search when the feature is toggled on', async () => {
      const searchTerm = 'Opn PIM Srch';
      const mocks = [createMatchlessSearchMock(searchTerm)];
      const rendered = renderAppWithRedux(<QuickAccess />, {
        permissions: managePermissions,
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchTerm),
        ],
        flags: { pimSearch: true },
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() =>
        rendered.getByTestId('quick-access-search-input')
      );

      const searchInput = rendered.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: searchTerm } });
      await waitForElement(() => rendered.getByText('Open PIM Search'));
      expect(rendered.queryByText('Open PIM Search')).toBeVisible();
    });
  });

  describe('when searching for a product with enabled pim-search', () => {
    it('should find a product by full-text pim search', async () => {
      const searchText = 'party';
      const partyParrotId = '7a66d631-0e52-44f8-bb5d-2212839a2519';
      const mocks = [
        {
          request: {
            query: QuickAccessQuery,
            variables: {
              searchText,
              canViewProducts: true,
              target: 'ctp',
              productsWhereClause: `id in ("${partyParrotId}")`,
              includeProductsByIds: true,
            },
          },
          result: {
            data: {
              productsByIds: {
                results: [
                  {
                    id: partyParrotId,
                    masterData: {
                      staged: {
                        nameAllLocales: [
                          { locale: 'en', value: 'Party Parrot' },
                        ],
                      },
                    },
                  },
                ],
              },
              productById: null,
              productByKey: null,
              productByVariantSku: null,
              productByVariantKey: null,
            },
          },
        },
      ];
      const rendered = renderAppWithRedux(<QuickAccess />, {
        permissions: managePermissions,
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          {
            action: {
              type: 'SDK',
              payload: {
                method: 'POST',
                uri: '/test-with-big-data/search/products',
                mcApiProxyTarget: MC_API_PROXY_TARGETS.PIM_SEARCH,
                payload: {
                  query: {
                    fullText: {
                      field: 'name',
                      language: 'en',
                      value: searchText,
                    },
                  },
                  sort: [{ field: 'name', language: 'en', order: 'desc' }],
                  limit: 9,
                  offset: 0,
                },
              },
            },
            response: {
              total: 1,
              offset: 0,
              limit: 9,
              hits: [{ id: partyParrotId, version: 709, relevance: null }],
              facets: null,
              suggestions: null,
            },
          },
        ],
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() =>
        rendered.getByTestId('quick-access-search-input')
      );

      const searchInput = rendered.getByTestId('quick-access-search-input');

      // create first history entry
      fireEvent.change(searchInput, { target: { value: 'party' } });
      await waitForElement(() =>
        rendered.getByText('Show Product "Party Parrot"')
      );

      expect(
        rendered.queryByTestId(
          `quick-access-result(go/product-by-search-text/product(${partyParrotId}))`
        )
      ).toHaveStyle(`color: ${customProperties.colorSurface};`);
    });
  });
});
