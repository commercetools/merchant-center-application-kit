import {
  GRAPHQL_TARGETS,
  MC_API_PROXY_TARGETS,
} from '@commercetools-frontend/constants';
import {
  screen,
  renderAppWithRedux,
  fireEvent,
  waitFor,
  denormalizePermissions,
} from '../../test-utils';
import * as gtm from '../../utils/gtm';
import { location } from '../../utils/location';
import QuickAccessQuery from './quick-access.ctp.graphql';
import QuickAccessProductQuery from './quick-access-product.ctp.graphql';
import QuickAccess from './index';

jest.mock('../../utils/gtm');
jest.mock('../../utils/location');

const createMatchlessSearchMock = ({ variables = {}, resultData = {} }) => ({
  request: {
    query: QuickAccessQuery,
    variables: {
      searchText: '',
      canViewProducts: true,
      productsWhereClause: 'id in ()',
      includeProductsByIds: false,
      ...variables,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  },
  result: {
    data: {
      productsById: null,
      productById: null,
      productByKey: null,
      productByVariantSku: null,
      productByVariantKey: null,
      ...resultData,
    },
  },
});

const createAccessProductVariantsQueryMock = ({
  variables = {},
  resultData = {},
}) => ({
  request: {
    query: QuickAccessProductQuery,
    variables: {
      productId: '',
      ...variables,
    },
    context: {
      target: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  },
  result: {
    data: {
      product: {
        id: variables.productId,
        masterData: {
          staged: {
            allVariants: [
              { id: 1, key: 'variant-key-1', sku: 'variant-sku-1' },
            ],
          },
        },
      },
      ...resultData,
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

const renderQuickAccess = (options = {}, ui) => {
  const { history } = renderAppWithRedux(ui || <QuickAccess />, {
    sdkMocks: [createPimAvailabilityCheckSdkMock()],
    enableApolloMocks: true,
    disableAutomaticEntryPointRoutes: true,
    ...options,
    // Manually override `project`
    project:
      options.project === null
        ? null
        : {
            ...options.project,
            allAppliedPermissions: denormalizePermissions(
              options.permissions ?? managePermissions
            ),
          },
  });

  const findCurrentItem = ({ input, inputKey, itemTestId }) => {
    let attempts = 4;
    // Select the "next" item in the results until it finds the "Orders" match.
    while (attempts > 0) {
      fireEvent.keyDown(input, { key: inputKey });
      fireEvent.keyUp(input, { key: inputKey });
      const el = screen.queryByTestId(itemTestId);
      if (el.getAttribute('aria-current') === 'true') {
        attempts = 0;
      } else {
        attempts -= 1;
      }
    }
    expect(screen.queryByTestId(itemTestId)).toHaveAttribute(
      'aria-current',
      'true'
    );
  };

  return {
    findCurrentItem,
    history,
  };
};

beforeEach(() => {
  gtm.track.mockReset();
  global.open = jest.fn();
  location.replace.mockClear();
});

describe('QuickAccess', () => {
  it('should open when pressing "f" on document body', async () => {
    renderQuickAccess();

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    // Value should be empty. The "f" should not end up as part of the value.
    expect(screen.queryByTestId('quick-access-search-input')).toHaveAttribute(
      'value',
      ''
    );
  });

  it('should open when pressing "f" on an element with tabIndex="-1" (like a modal)', async () => {
    renderQuickAccess(
      undefined,
      <div>
        <QuickAccess />
        <div tabIndex="-1" data-testid="modal">
          Modal
        </div>
      </div>
    );

    // open quick-access
    fireEvent.keyDown(screen.getByTestId('modal'), { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    // Value should be empty. The "f" should not end up as part of the value.
    expect(screen.queryByTestId('quick-access-search-input')).toHaveAttribute(
      'value',
      ''
    );
  });

  it('should not close when the search input is clicked', async () => {
    renderQuickAccess();

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    fireEvent.click(screen.getByTestId('quick-access-search-input'));

    // It should not close, so the element should still be around
    expect(screen.queryByTestId('quick-access-search-input')).toBeVisible();
  });

  it('should not open when pressing "f" not directly on other focusable elements', async () => {
    renderQuickAccess();

    // open quick-access
    fireEvent.keyDown(document.body.firstChild, { key: 'f' });
    await waitFor(() => {
      expect(screen.queryByTestId('quick-access')).toBeNull();
    });
  });

  it('should track when QuickAccess is opened', async () => {
    renderQuickAccess();

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    expect(gtm.track).toHaveBeenCalledTimes(1);
    expect(gtm.track).toHaveBeenCalledWith(
      'keydown',
      'QuickAccess',
      'quick_access_open'
    );
  });

  it('should close when pressing Escape', async () => {
    renderQuickAccess();

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access');

    expect(screen.getByTestId('quick-access')).toBeInTheDocument();

    // close quick-access
    fireEvent.keyDown(screen.getByTestId('quick-access-search-input'), {
      key: 'Escape',
    });
    expect(screen.queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should show results when searching for Dashboard', async () => {
    const mocks = [
      createMatchlessSearchMock({ variables: { searchText: 'Open dshbrd' } }),
    ];
    renderQuickAccess({
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('Open dshbrd'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    const searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await screen.findByText('Open Dashboard');
    expect(screen.getByText('Open Dashboard')).toBeInTheDocument();
  });
  describe('when there are no results', () => {
    it('should show information message when searching does not yield results', async () => {
      const mocks = [
        createMatchlessSearchMock({
          variables: {
            searchText: 'A thing which does not exist',
          },
        }),
      ];
      renderQuickAccess(
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
      await screen.findByTestId('quick-access-search-input');

      const searchInput = screen.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, {
        target: { value: 'A thing which does not exist' },
      });
      await screen.findByText(noResultsText);
      // it should show the no results text
      expect(screen.getByText(noResultsText)).toBeInTheDocument();

      // when input is cleared again
      fireEvent.change(searchInput, { target: { value: '' } });

      expect(screen.queryByText(noResultsText)).not.toBeInTheDocument();
    });
  });
  describe('when there is an error', () => {
    const originalConsoleError = console.error;
    beforeEach(() => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
    });
    afterEach(() => {
      // eslint-disable-next-line no-console
      console.error = originalConsoleError;
    });
    it('should show error message when searching while offline', async () => {
      const searchMock = createMatchlessSearchMock({
        variables: {
          searchText: 'Open dshbrd-offline',
        },
      });
      const mocks = [
        {
          ...searchMock,
          result: null,
          error: new Error('no internet'),
        },
      ];
      renderQuickAccess(
        // Note that this test setup isn't perfect as the sdk request
        // currently succeeds while the Apollo request fails
        // Under real conditions both requests would fail.
        {
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
      await screen.findByTestId('quick-access-search-input');

      const searchInput = screen.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, {
        target: { value: 'Open dshbrd-offline' },
      });
      await screen.findByText(offlineText);
      // it should show the offline warning
      expect(screen.getByText(offlineText)).toBeInTheDocument();
      expect(console.error).toHaveBeenCalledWith(
        expect.objectContaining({ networkError: new Error('no internet') })
      );

      // when input is cleared again
      fireEvent.change(searchInput, { target: { value: '' } });

      expect(screen.queryByText(offlineText)).not.toBeInTheDocument();
    });
  });

  it('should open (route to) dashboard when chosing the "Open Dashboard" command', async () => {
    const mocks = [
      createMatchlessSearchMock({ variables: { searchText: 'Open dshbrd' } }),
    ];
    const { history } = renderQuickAccess({
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('Open dshbrd'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    const searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await screen.findByText('Open Dashboard');
    fireEvent.keyUp(searchInput, { key: 'Enter' });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/test-with-big-data/dashboard');
    });
    // should close quick access
    expect(screen.queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should open (reload to) dashboard when chosing the "Open Dashboard" command when using full redirects for links', async () => {
    const mocks = [
      createMatchlessSearchMock({ variables: { searchText: 'Open dshbrd' } }),
    ];
    renderQuickAccess({
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
    await screen.findByTestId('quick-access-search-input');

    const searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await screen.findByText('Open Dashboard');
    fireEvent.keyUp(searchInput, { key: 'Enter' });

    await waitFor(() => {
      expect(location.replace).toHaveBeenCalledWith(
        '/test-with-big-data/dashboard'
      );
    });
    // should close quick access
    expect(screen.queryByTestId('quick-access')).not.toBeInTheDocument();
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
      const mocks = [
        createMatchlessSearchMock({ variables: { searchText: 'Open dshbrd' } }),
      ];
      renderQuickAccess({
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await screen.findByTestId('quick-access-search-input');

      const searchInput = screen.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await screen.findByText('Open Dashboard');
      fireEvent.keyDown(searchInput, { key: 'Enter', metaKey: true });
      fireEvent.keyUp(searchInput, { key: 'Enter', metaKey: true });

      await waitFor(() => {
        expect(global.open).toHaveBeenCalledWith(
          '/test-with-big-data/dashboard',
          '_blank'
        );
      });
      // should close quick access
      expect(screen.queryByTestId('quick-access')).not.toBeInTheDocument();
    });

    it('should open dashboard in new tab when chosing the "Open Dashboard" command by cmd+click', async () => {
      const mocks = [
        createMatchlessSearchMock({ variables: { searchText: 'Open dshbrd' } }),
      ];
      renderQuickAccess({
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await screen.findByTestId('quick-access-search-input');

      const searchInput = screen.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await screen.findByText('Open Dashboard');
      fireEvent.click(screen.getByTestId('quick-access-result(go/dashboard)'), {
        metaKey: true,
      });

      await waitFor(() => {
        expect(global.open).toHaveBeenCalledWith(
          '/test-with-big-data/dashboard',
          '_blank'
        );
      });
      // should close quick access
      expect(screen.queryByTestId('quick-access')).not.toBeInTheDocument();
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
      const mocks = [
        createMatchlessSearchMock({ variables: { searchText: 'Open dshbrd' } }),
      ];
      renderQuickAccess({
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await screen.findByTestId('quick-access-search-input');

      const searchInput = screen.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await screen.findByText('Open Dashboard');
      fireEvent.keyDown(searchInput, { key: 'Enter', ctrlKey: true });
      fireEvent.keyUp(searchInput, { key: 'Enter', ctrlKey: true });

      await waitFor(() => {
        expect(global.open).toHaveBeenCalledWith(
          '/test-with-big-data/dashboard',
          '_blank'
        );
      });
      // should close quick access
      expect(screen.queryByTestId('quick-access')).not.toBeInTheDocument();
    });

    it('should open dashboard in new tab when chosing the "Open Dashboard" command by ctrl+click', async () => {
      const mocks = [
        createMatchlessSearchMock({ variables: { searchText: 'Open dshbrd' } }),
      ];
      renderQuickAccess({
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await screen.findByTestId('quick-access-search-input');

      const searchInput = screen.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await screen.findByText('Open Dashboard');
      fireEvent.click(screen.getByTestId('quick-access-result(go/dashboard)'), {
        ctrlKey: true,
      });

      await waitFor(() => {
        expect(global.open).toHaveBeenCalledWith(
          '/test-with-big-data/dashboard',
          '_blank'
        );
      });
      // should close quick access
      expect(screen.queryByTestId('quick-access')).not.toBeInTheDocument();
    });
  });

  it('should open dashboard in new tab when chosing the "Open Dashboard" command by click', async () => {
    const mocks = [
      createMatchlessSearchMock({ variables: { searchText: 'Open dshbrd' } }),
    ];
    const { history } = renderQuickAccess({
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('Open dshbrd'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    const searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await screen.findByText('Open Dashboard');
    fireEvent.click(screen.getByTestId('quick-access-result(go/dashboard)'));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/test-with-big-data/dashboard');
    });
    // should close quick access
    expect(screen.queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should cycle through the history', async () => {
    const mocks = [
      createMatchlessSearchMock({ variables: { searchText: 'Open dshbrd' } }),
      createMatchlessSearchMock({ variables: { searchText: 'Open prdcts' } }),
    ];
    const { history, findCurrentItem } = renderQuickAccess({
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
    await screen.findByTestId('quick-access-search-input');

    let searchInput = screen.getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await screen.findByText('Open Dashboard');
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    await waitFor(() => {
      expect(history.location.pathname).toBe('/test-with-big-data/dashboard');
    });
    // should close quick access
    expect(screen.queryByTestId('quick-access')).not.toBeInTheDocument();

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    // create second history entry
    // we have to get the new search input
    searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open prdcts' } });
    await screen.findByText('Open Products');
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    await waitFor(() => {
      expect(history.location.pathname).toBe(
        '/test-with-big-data/products/pim-search'
      );
    });
    // should close quick access
    expect(screen.queryByTestId('quick-access')).not.toBeInTheDocument();

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    // press ArrowUp to cycle through history
    searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    expect(searchInput).toHaveAttribute('value', 'Open prdcts');
    // It should select the search text
    expect(searchInput.selectionStart).toBe(0);
    expect(searchInput.selectionEnd).toBe('Open prdcts'.length);

    // press ArrowUp to cycle through history again
    searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    expect(searchInput).toHaveAttribute('value', 'Open dshbrd');

    // press ArrowUp to cycle through history again, but this time
    // no more results will exist, so the value stays
    searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    expect(searchInput).toHaveAttribute('value', 'Open dshbrd');

    // when now pressing key down the selection should jump down
    searchInput = screen.getByTestId('quick-access-search-input');

    findCurrentItem({
      input: searchInput,
      inputKey: 'ArrowDown',
      itemTestId: 'quick-access-result(go/orders)',
    });

    // when pressing up, it should jump up again
    searchInput = screen.getByTestId('quick-access-search-input');

    findCurrentItem({
      input: searchInput,
      inputKey: 'ArrowUp',
      itemTestId: 'quick-access-result(go/dashboard)',
    });
  });

  it('should find a product by sku', async () => {
    const mocks = [
      createMatchlessSearchMock({
        variables: {
          searchText: 'party-parrot-sku',
        },
        resultData: {
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
        },
      }),
    ];
    renderQuickAccess({
      mocks,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('party-parrot-sku'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    const searchInput = screen.getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: 'party-parrot-sku' } });
    await screen.findByText('Show Product Variant "party-parrot-sku"');

    expect(
      screen.queryByTestId(
        'quick-access-result(go/product-variant-by-sku/product(party-parrot-id)/variant(1))'
      )
    ).toHaveAttribute('aria-current', 'true');
  });

  it('should find a product by id', async () => {
    const productId = 'party-parrot-id';
    const mocks = [
      createMatchlessSearchMock({
        variables: {
          searchText: productId,
        },
        resultData: {
          productById: {
            id: productId,
            key: 'party-parrot-key',
            masterData: {
              staged: {
                nameAllLocales: [{ locale: 'en', value: 'Party Parrot' }],
              },
            },
          },
        },
      }),
      createAccessProductVariantsQueryMock({ variables: { productId } }),
    ];
    renderQuickAccess({
      mocks,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock(productId),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');
    const searchInput = screen.getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: productId } });
    await screen.findByText('Show Product "Party Parrot"');

    expect(
      screen.queryByTestId(
        `quick-access-result(go/product-by-id/product(${productId}))`
      )
    ).toHaveAttribute('aria-current', 'true');
  });

  it('should find a product by key', async () => {
    const productId = 'party-parrot-id';
    const mocks = [
      createMatchlessSearchMock({
        variables: {
          searchText: 'party-parrot',
        },
        resultData: {
          productByKey: {
            id: productId,
            key: 'party-parrot',
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
        },
      }),
      createAccessProductVariantsQueryMock({ variables: { productId } }),
    ];
    renderQuickAccess({
      mocks,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock('party-parrot'),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    const searchInput = screen.getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: 'party-parrot' } });
    await screen.findByText('Show Product "party-parrot"');

    expect(
      screen.queryByTestId(
        `quick-access-result(go/product-by-key/product(${productId}))`
      )
    ).toHaveAttribute('aria-current', 'true');
  });

  it('should show products in the projectDataLocale', async () => {
    const productId = 'party-parrot-product-id';
    const mocks = [
      createMatchlessSearchMock({
        variables: {
          searchText: productId,
        },
        resultData: {
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
        },
      }),
      createAccessProductVariantsQueryMock({ variables: { productId } }),
    ];
    renderQuickAccess({
      dataLocale: 'de',
      mocks,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock('de'),
        createPimSearchSdkMock(productId, { projectDataLocale: 'de' }),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    const searchInput = screen.getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: productId } });
    await screen.findByText('Show Product "Party Papagei"');

    expect(
      screen.queryByTestId(
        `quick-access-result(go/product-by-id/product(${productId}))`
      )
    ).toHaveAttribute('aria-current', 'true');
  });

  it('should find sub commands', async () => {
    const searchText = 'Open producttypesettings';
    const mocks = [createMatchlessSearchMock({ variables: { searchText } })];
    renderQuickAccess({
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock(searchText),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    const searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchText } });
    await screen.findByText('Open Product Types Settings');
    expect(screen.queryByText('Open Product Types Settings')).toBeVisible();
  });

  it('should be possible to navigate to sub commands and back out', async () => {
    const searchText = 'Open dshbrd';
    const mocks = [createMatchlessSearchMock({ variables: { searchText } })];
    const { findCurrentItem } = renderQuickAccess({
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock(searchText),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    const searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchText } });
    // place cursor at last position - this happens autotmatically when a real
    // user types
    searchInput.setSelectionRange(searchText.length, searchText.length);
    await screen.findByText('Open Orders');

    findCurrentItem({
      input: searchInput,
      inputKey: 'ArrowDown',
      itemTestId: 'quick-access-result(go/orders)',
    });

    // navigate into sub commands
    fireEvent.keyDown(searchInput, { key: 'ArrowRight' });
    fireEvent.keyUp(searchInput, { key: 'ArrowRight' });

    await screen.findByText('Open Orders List');
    expect(
      screen.queryByTestId('quick-access-result(go/orders/list)')
    ).toHaveAttribute('aria-current', 'true');

    // navigate back out
    fireEvent.keyDown(searchInput, { key: 'ArrowLeft' });
    fireEvent.keyUp(searchInput, { key: 'ArrowLeft' });
    await screen.findByText('Open Orders');

    // it should select the first element in the list
    expect(
      screen.queryByTestId('quick-access-result(go/dashboard)')
    ).toHaveAttribute('aria-current', 'true');
    expect(
      screen.queryByTestId('quick-access-result(go/orders)')
    ).toHaveAttribute('aria-current', 'false');
  });

  it('should support selection by mouse', async () => {
    const searchText = 'Open dshbrd';
    const mocks = [createMatchlessSearchMock({ variables: { searchText } })];
    const { history } = renderQuickAccess({
      mocks,
      flags,
      sdkMocks: [
        createPimAvailabilityCheckSdkMock(),
        createPimSearchSdkMock(searchText),
      ],
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    const searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchText } });
    await screen.findByText('Open Orders');
    const openOrdersResult = screen.getByTestId(
      'quick-access-result(go/orders)'
    );

    // We select the second result
    fireEvent.mouseEnter(openOrdersResult);

    // it should highlight the hovered result
    expect(openOrdersResult).toHaveAttribute('aria-current', 'true');

    // Click the selected result
    fireEvent.click(openOrdersResult);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/test-with-big-data/orders');
    });
    // should close quick access
    expect(screen.queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should not show project-based commands when used outside of the project context', async () => {
    const searchText = 'Open Dashboard';
    const mocks = [createMatchlessSearchMock({ variables: { searchText } })];
    renderQuickAccess({
      project: null,
      mocks,
    });

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await screen.findByTestId('quick-access-search-input');

    const searchInput = screen.getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchText } });

    // wait for any other result
    await screen.findByText('Open Support');

    // ensure "Open Dashboard" is not visible, as it needs a project context
    expect(screen.queryByText('Open Dashboard')).toBeNull();
  });

  describe('permissions', () => {
    it('should not find "Open Orders" when user has no orders permission', async () => {
      const searchText = 'Opn Ordrs';
      const mocks = [createMatchlessSearchMock({ variables: { searchText } })];
      renderQuickAccess({
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchText),
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
      const searchInput = await screen.findByTestId(
        'quick-access-search-input'
      );
      fireEvent.change(searchInput, { target: { value: searchText } });
      await screen.findAllByText(/^Open/);

      // results should not contain "Open Orders"
      expect(screen.queryByText('Open Orders')).not.toBeInTheDocument();
    });

    it('should find "Open Orders" when user has the view orders permission', async () => {
      const searchText = 'Opn Ordrs';
      const mocks = [createMatchlessSearchMock({ variables: { searchText } })];
      renderQuickAccess({
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchText),
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
      const searchInput = await screen.findByTestId(
        'quick-access-search-input'
      );
      fireEvent.change(searchInput, { target: { value: searchText } });

      // wait for Dashboard option
      await screen.findByText('Open Dashboard');

      // results should contain "Open Orders"
      expect(screen.queryByText('Open Orders')).toBeVisible();
    });
  });

  describe('switching project-data-locale', () => {
    describe('when inside a project', () => {
      describe('when project has only one project language', () => {
        it('should not show the option to change the project-data-locale', async () => {
          const searchText = 'setreslan';
          const mocks = [
            createMatchlessSearchMock({ variables: { searchText } }),
          ];
          renderQuickAccess({
            project: {
              key: 'test-with-big-data',
              version: 43,
              name: 'Test with big data',
              countries: ['de', 'en'],
              currencies: ['EUR', 'GBP'],
              languages: ['en'],
              owner: {
                id: 'organization-id-1',
                name: 'Organization Name',
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
                      id: 'organization-id-1',
                      name: 'Organization Name',
                    },
                    suspension: { isActive: false },
                    expiry: { isActive: false },
                  },
                  {
                    key: searchText,
                    version: 1,
                    name: searchText,
                    countries: ['de'],
                    currencies: ['EUR'],
                    languages: ['de'],
                    owner: {
                      id: 'organization-id-1',
                      name: 'Organization Name',
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
              createPimSearchSdkMock(searchText),
            ],
          });

          // open quick-access
          fireEvent.keyDown(document.body, { key: 'f' });
          await screen.findByTestId('quick-access-search-input');

          const searchInput = screen.getByTestId('quick-access-search-input');
          fireEvent.change(searchInput, { target: { value: searchText } });
          await screen.findByText(`Switch to project "${searchText}"`);

          expect(screen.queryByText('Set Resource Language')).toBeNull();
        });
      });

      // describe('when project has more than one project-data-locale', () => {});
    });

    describe('when outside of a project', () => {
      it('should not show the option to change the project-data-locale', async () => {
        const searchText = 'setreslang2';
        renderQuickAccess({
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
                    id: 'organization-id-1',
                    name: 'Organization Name',
                  },
                  suspension: { isActive: false },
                  expiry: { isActive: false },
                },
                {
                  key: searchText,
                  version: 1,
                  name: searchText,
                  countries: ['de'],
                  currencies: ['EUR'],
                  languages: ['de'],
                  owner: {
                    id: 'organization-id-1',
                    name: 'Organization Name',
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
        await screen.findByTestId('quick-access-search-input');

        const searchInput = screen.getByTestId('quick-access-search-input');
        fireEvent.change(searchInput, { target: { value: searchText } });
        await screen.findByText(`Switch to project "${searchText}"`);

        expect(screen.queryByText('Set Resource Language')).toBeNull();
      });
    });
  });

  describe('feature toggles', () => {
    it('should not find PIM-Search when the feature is toggled off', async () => {
      const searchText = 'Opn PIM Srch';
      const mocks = [createMatchlessSearchMock({ variables: { searchText } })];
      renderQuickAccess({
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchText),
        ],
        flags: { ...flags, pimSearch: false },
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await screen.findByTestId('quick-access-search-input');

      const searchInput = screen.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: searchText } });
      await screen.findByText('Open Discounts');
      expect(screen.queryByText('Open PIM Search')).toBeNull();
      expect(
        screen.queryByTestId('quick-access-result(go/products/pim-search)')
      ).toBeNull();
    });

    it('should find PIM-Search when the feature is toggled on', async () => {
      const searchText = 'Opn PIM Srch';
      const mocks = [createMatchlessSearchMock({ variables: { searchText } })];
      renderQuickAccess({
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchText),
        ],
        flags: { pimSearch: true },
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await screen.findByTestId('quick-access-search-input');

      const searchInput = screen.getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: searchText } });
      await screen.findByText('Open PIM Search');
      expect(screen.queryByText('Open PIM Search')).toBeVisible();
    });
  });

  describe('when searching for a product with enabled pim-search', () => {
    it('should find a product by full-text pim search', async () => {
      const searchText = 'party';
      const productId = '7a66d631-0e52-44f8-bb5d-2212839a2519';
      const mocks = [
        createMatchlessSearchMock({
          variables: {
            searchText,
            productsWhereClause: `id in ("${productId}")`,
            includeProductsByIds: true,
          },
          resultData: {
            productsByIds: {
              results: [
                {
                  id: productId,
                  masterData: {
                    staged: {
                      nameAllLocales: [{ locale: 'en', value: 'Party Parrot' }],
                    },
                  },
                },
              ],
            },
          },
        }),
        createAccessProductVariantsQueryMock({ variables: { productId } }),
      ];
      renderQuickAccess({
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
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
              hits: [{ id: productId, version: 709, relevance: null }],
              facets: null,
              suggestions: null,
            },
          },
        ],
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await screen.findByTestId('quick-access-search-input');

      const searchInput = screen.getByTestId('quick-access-search-input');

      // create first history entry
      fireEvent.change(searchInput, { target: { value: searchText } });
      await screen.findByText('Show Product "Party Parrot"');

      expect(
        screen.queryByTestId(
          `quick-access-result(go/product-by-search-text/product(${productId}))`
        )
      ).toHaveAttribute('aria-current', 'true');
    });
  });
});
