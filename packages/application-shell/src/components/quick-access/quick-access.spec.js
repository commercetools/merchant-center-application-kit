import React from 'react';
import {
  renderAppWithRedux,
  fireEvent,
  waitForElement,
} from '../../test-utils';
import QuickAccessQuery from './quick-access.graphql';
import * as gtm from '../../utils/gtm';
import QuickAccess from './index';

jest.mock('../../utils/gtm');

const createMatchlessSearchMock = (searchText, variables = {}) => ({
  request: {
    query: QuickAccessQuery,
    variables: {
      searchText,
      target: 'ctp',
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

const managePermissions = { canManageProject: true };

const flags = {
  pimSearch: true,
  customerGroups: true,
  projectSettings: true,
  developerSettings: true,
  projectSettingsChannels: true,
  canViewOrders: true,
  canViewCategories: true,
  canViewDashboard: true,
  canViewDiscounts: true,
};

const createTestProps = custom => ({
  project: {
    key: 'test-with-big-data-44',
    languages: ['en', 'de'],
    permissions: managePermissions,
    owner: {
      id: 'foo-id',
    },
  },
  projectDataLocale: 'en',
  history: { push: jest.fn() },
  // client prop is provided by withApollo
  user: {
    projects: {
      results: [
        {
          key: 'test-with-big-data-44',
          name: 'Test with big data',
          owner: {
            id: 'test-with-foo-id',
          },
        },
      ],
    },
  },
  environment: { useFullRedirectsForLinks: false },
  ...custom,
});

const createPimAvailabilityCheckSdkMock = (projectDataLocale = 'en') => ({
  action: {
    type: 'SDK',
    payload: {
      method: 'POST',
      uri: '/proxy/pim-search/test-with-big-data-44/search/products',
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
      uri: '/proxy/pim-search/test-with-big-data-44/search/products',
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
    const { getByTestId } = renderAppWithRedux(
      <QuickAccess {...createTestProps()} />,
      { sdkMocks: [createPimAvailabilityCheckSdkMock()] }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    // Value should be empty. The "f" should not end up as part of the value.
    expect(getByTestId('quick-access-search-input')).toHaveAttribute(
      'value',
      ''
    );
  });

  it('should open when pressing "f" on an element with tabIndex="-1" (like a modal)', async () => {
    const { getByTestId } = renderAppWithRedux(
      <div>
        <QuickAccess {...createTestProps()} />
        <div tabIndex="-1" data-testid="modal">
          Modal
        </div>
      </div>,
      { sdkMocks: [createPimAvailabilityCheckSdkMock()] }
    );

    // open quick-access
    fireEvent.keyDown(getByTestId('modal'), { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    // Value should be empty. The "f" should not end up as part of the value.
    expect(getByTestId('quick-access-search-input')).toHaveAttribute(
      'value',
      ''
    );
  });

  it('should not close when the search input is clicked', async () => {
    const { getByTestId } = renderAppWithRedux(
      <QuickAccess {...createTestProps()} />,
      { sdkMocks: [createPimAvailabilityCheckSdkMock()] }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    fireEvent.click(getByTestId('quick-access-search-input'));

    // It should not close, so the element should still be around
    expect(getByTestId('quick-access-search-input')).toBeVisible();
  });

  it('should not open when pressing "f" not directly on other focusable elements', async () => {
    const { queryByTestId } = renderAppWithRedux(
      <QuickAccess {...createTestProps()} />,
      { sdkMocks: [createPimAvailabilityCheckSdkMock()] }
    );

    // open quick-access
    fireEvent.keyDown(document.body.firstChild, { key: 'f' });
    expect(queryByTestId('quick-access')).toBeNull();
  });

  it('should track when QuickAccess is opened', async () => {
    const { getByTestId } = renderAppWithRedux(
      <QuickAccess {...createTestProps()} />,
      { sdkMocks: [createPimAvailabilityCheckSdkMock()] }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    expect(gtm.track).toHaveBeenCalledTimes(1);
    expect(gtm.track).toHaveBeenCalledWith(
      'keydown',
      'QuickAccess',
      'quick_access_open'
    );
  });

  it('should close when pressing Escape', async () => {
    const { getByTestId, queryByTestId } = renderAppWithRedux(
      <QuickAccess {...createTestProps()} />,
      { sdkMocks: [createPimAvailabilityCheckSdkMock()] }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access'));

    expect(getByTestId('quick-access')).toBeInTheDocument();

    // close quick-access
    fireEvent.keyDown(getByTestId('quick-access-search-input'), {
      key: 'Escape',
    });
    expect(queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should show results when searching for Dashboard', async () => {
    const mocks = [createMatchlessSearchMock('Open dshbrd')];
    const { getByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...createTestProps()} />,
      {
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await waitForElement(() => getByText('Open Dashboard'));
    expect(getByText('Open Dashboard')).toBeInTheDocument();
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
      const { getByTestId, getByText, queryByText } = renderAppWithRedux(
        <QuickAccess {...createTestProps()} />,
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
      await waitForElement(() => getByTestId('quick-access-search-input'));

      const searchInput = getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, {
        target: { value: 'A thing which does not exist' },
      });
      await waitForElement(() => getByText(noResultsText));
      // it should show the no results text
      expect(getByText(noResultsText)).toBeVisible();

      // when input is cleared again
      fireEvent.change(searchInput, { target: { value: '' } });

      // the no results text should be removed
      expect(queryByText(noResultsText)).toBeNull();
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
      const { getByTestId, getByText, queryByText } = renderAppWithRedux(
        <QuickAccess {...createTestProps()} />,
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
      await waitForElement(() => getByTestId('quick-access-search-input'));

      const searchInput = getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, {
        target: { value: 'Open dshbrd-offline' },
      });
      await waitForElement(() => getByText(offlineText));
      // it should show the offline warning
      expect(getByText(offlineText)).toBeVisible();

      // when input is cleared again
      fireEvent.change(searchInput, { target: { value: '' } });

      // the offline warning should be removed
      expect(queryByText(offlineText)).toBeNull();
    });
  });

  it('should open (route to) dashboard when chosing the "Open Dashboard" command', async () => {
    const mocks = [createMatchlessSearchMock('Open dshbrd')];
    const props = createTestProps();
    const { getByTestId, queryByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...props} />,
      {
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await waitForElement(() => getByText('Open Dashboard'));
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    expect(props.history.push).toHaveBeenCalledWith(
      '/test-with-big-data-44/dashboard'
    );

    // should close quick access
    expect(queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should open (reload to) dashboard when chosing the "Open Dashboard" command when using full redirects for links', async () => {
    const mocks = [createMatchlessSearchMock('Open dshbrd')];
    const props = createTestProps({
      environment: { useFullRedirectsForLinks: true },
    });
    const { getByTestId, queryByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...props} />,
      {
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await waitForElement(() => getByText('Open Dashboard'));
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    expect(global.location.replace).toHaveBeenCalledWith(
      '/test-with-big-data-44/dashboard'
    );

    // should close quick access
    expect(queryByTestId('quick-access')).not.toBeInTheDocument();
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
      const props = createTestProps();
      const { getByTestId, queryByTestId, getByText } = renderAppWithRedux(
        <QuickAccess {...props} />,
        {
          mocks,
          flags,
          sdkMocks: [
            createPimAvailabilityCheckSdkMock(),
            createPimSearchSdkMock('Open dshbrd'),
          ],
        }
      );

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() => getByTestId('quick-access-search-input'));

      const searchInput = getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await waitForElement(() => getByText('Open Dashboard'));
      fireEvent.keyDown(searchInput, { key: 'Enter', metaKey: true });
      fireEvent.keyUp(searchInput, { key: 'Enter', metaKey: true });

      expect(global.open).toHaveBeenCalledWith(
        '/test-with-big-data-44/dashboard',
        '_blank'
      );

      // should close quick access
      expect(queryByTestId('quick-access')).not.toBeInTheDocument();
    });

    it('should open dashboard in new tab when chosing the "Open Dashboard" command by cmd+click', async () => {
      const mocks = [createMatchlessSearchMock('Open dshbrd')];
      const props = createTestProps();
      const { getByTestId, queryByTestId, getByText } = renderAppWithRedux(
        <QuickAccess {...props} />,
        {
          mocks,
          flags,
          sdkMocks: [
            createPimAvailabilityCheckSdkMock(),
            createPimSearchSdkMock('Open dshbrd'),
          ],
        }
      );

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() => getByTestId('quick-access-search-input'));

      const searchInput = getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await waitForElement(() => getByText('Open Dashboard'));
      fireEvent.click(getByTestId('quick-access-result(go/dashboard)'), {
        metaKey: true,
      });

      expect(global.open).toHaveBeenCalledWith(
        '/test-with-big-data-44/dashboard',
        '_blank'
      );

      // should close quick access
      expect(queryByTestId('quick-access')).not.toBeInTheDocument();
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
      const props = createTestProps();
      const { getByTestId, queryByTestId, getByText } = renderAppWithRedux(
        <QuickAccess {...props} />,
        {
          mocks,
          flags,
          sdkMocks: [
            createPimAvailabilityCheckSdkMock(),
            createPimSearchSdkMock('Open dshbrd'),
          ],
        }
      );

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() => getByTestId('quick-access-search-input'));

      const searchInput = getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await waitForElement(() => getByText('Open Dashboard'));
      fireEvent.keyDown(searchInput, { key: 'Enter', ctrlKey: true });
      fireEvent.keyUp(searchInput, { key: 'Enter', ctrlKey: true });

      expect(global.open).toHaveBeenCalledWith(
        '/test-with-big-data-44/dashboard',
        '_blank'
      );

      // should close quick access
      expect(queryByTestId('quick-access')).not.toBeInTheDocument();
    });

    it('should open dashboard in new tab when chosing the "Open Dashboard" command by ctrl+click', async () => {
      const mocks = [createMatchlessSearchMock('Open dshbrd')];
      const props = createTestProps();
      const { getByTestId, queryByTestId, getByText } = renderAppWithRedux(
        <QuickAccess {...props} />,
        {
          mocks,
          flags,
          sdkMocks: [
            createPimAvailabilityCheckSdkMock(),
            createPimSearchSdkMock('Open dshbrd'),
          ],
        }
      );

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() => getByTestId('quick-access-search-input'));

      const searchInput = getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
      await waitForElement(() => getByText('Open Dashboard'));
      fireEvent.click(getByTestId('quick-access-result(go/dashboard)'), {
        ctrlKey: true,
      });

      expect(global.open).toHaveBeenCalledWith(
        '/test-with-big-data-44/dashboard',
        '_blank'
      );

      // should close quick access
      expect(queryByTestId('quick-access')).not.toBeInTheDocument();
    });
  });

  it('should open dashboard in new tab when chosing the "Open Dashboard" command by click', async () => {
    const mocks = [createMatchlessSearchMock('Open dshbrd')];
    const props = createTestProps();
    const { getByTestId, queryByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...props} />,
      {
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await waitForElement(() => getByText('Open Dashboard'));
    fireEvent.click(getByTestId('quick-access-result(go/dashboard)'));

    expect(props.history.push).toHaveBeenCalledWith(
      '/test-with-big-data-44/dashboard'
    );

    // should close quick access
    expect(queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should cycle through the history', async () => {
    const mocks = [
      createMatchlessSearchMock('Open dshbrd'),
      createMatchlessSearchMock('Open prdcts'),
    ];
    const props = createTestProps();
    const { getByTestId, queryByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...props} />,
      {
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('Open dshbrd'),
          createPimSearchSdkMock('Open prdcts'),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    let searchInput = getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await waitForElement(() => getByText('Open Dashboard'));
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    expect(props.history.push).toHaveBeenCalledWith(
      '/test-with-big-data-44/dashboard'
    );
    expect(queryByTestId('quick-access')).not.toBeInTheDocument();

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    // create second history entry
    // we have to get the new search input
    searchInput = getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open prdcts' } });
    await waitForElement(() => getByText('Open Products'));
    fireEvent.keyUp(searchInput, { key: 'Enter' });
    expect(props.history.push).toHaveBeenCalledWith(
      '/test-with-big-data-44/products'
    );
    expect(queryByTestId('quick-access')).not.toBeInTheDocument();

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    // press ArrowUp to cycle through history
    searchInput = getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    const value = 'Open prdcts';
    expect(searchInput).toHaveAttribute('value', value);
    // It should select the search text
    expect(searchInput.selectionStart).toBe(0);
    expect(searchInput.selectionEnd).toBe(value.length);

    // press ArrowUp to cycle through history again
    searchInput = getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    expect(searchInput).toHaveAttribute('value', 'Open dshbrd');

    // press ArrowUp to cycle through history again, but this time
    // no more results will exist, so the value stays
    searchInput = getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    expect(searchInput).toHaveAttribute('value', 'Open dshbrd');

    // when now pressing key down the selection should jump down
    searchInput = getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
    fireEvent.keyUp(searchInput, { key: 'ArrowDown' });

    expect(getByTestId('quick-access-result(go/orders)')).toHaveClass(
      'result activeResult'
    );

    // when pressing up, it should jump up again
    searchInput = getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    expect(getByTestId('quick-access-result(go/dashboard)')).toHaveClass(
      'result activeResult'
    );
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
    const { getByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...createTestProps()} />,
      {
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('party-parrot-sku'),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: 'party-parrot-sku' } });
    await waitForElement(() =>
      getByText('Show Product Variant "party-parrot-sku"')
    );

    expect(
      getByTestId(
        'quick-access-result(go/product-variant-by-sku/product(party-parrot-id)/variant(1))'
      )
    ).toHaveClass('result activeResult');
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
    const { getByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...createTestProps()} />,
      {
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(productId),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: productId } });
    await waitForElement(() => getByText('Show Product "Party Parrot"'));

    expect(
      getByTestId('quick-access-result(go/product-by-id/product(01a1b2c3))')
    ).toHaveClass('result activeResult');
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
    const { getByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...createTestProps()} />,
      {
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock('party-parrot'),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: 'party-parrot' } });
    await waitForElement(() => getByText('Show Product "party-parrot"'));

    expect(
      getByTestId(
        'quick-access-result(go/product-by-key/product(party-parrot-id))'
      )
    ).toHaveClass('result activeResult');
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
    const { getByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...createTestProps({ projectDataLocale: 'de' })} />,
      {
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock('de'),
          createPimSearchSdkMock(productId, { projectDataLocale: 'de' }),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');

    // create first history entry
    fireEvent.change(searchInput, { target: { value: productId } });
    await waitForElement(() => getByText('Show Product "Party Papagei"'));

    expect(
      getByTestId(`quick-access-result(go/product-by-id/product(${productId}))`)
    ).toHaveClass('result activeResult');
  });

  it('should find sub commands', async () => {
    const searchTerm = 'Open producttypesettings';
    const mocks = [createMatchlessSearchMock(searchTerm)];
    const { getByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...createTestProps()} />,
      {
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchTerm),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    await waitForElement(() => getByText('Open Product Types Settings'));
    expect(getByText('Open Product Types Settings')).toBeVisible();
  });

  it('should be possible to navigate to sub commands and back out', async () => {
    const searchTerm = 'Open dshbrd';
    const mocks = [createMatchlessSearchMock(searchTerm)];
    const { getByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...createTestProps()} />,
      {
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchTerm),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    // place cursor at last position - this happens autotmatically when a real
    // user types
    searchInput.setSelectionRange(searchTerm.length, searchTerm.length);
    await waitForElement(() => getByText('Open Orders'));

    // go down to select Open orders
    fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
    fireEvent.keyUp(searchInput, { key: 'ArrowDown' });

    expect(getByTestId('quick-access-result(go/orders)')).toHaveClass(
      'result activeResult'
    );

    // navigate into sub commands
    fireEvent.keyDown(searchInput, { key: 'ArrowRight' });
    fireEvent.keyUp(searchInput, { key: 'ArrowRight' });

    await waitForElement(() => getByText('Open Orders List'));
    expect(getByTestId('quick-access-result(go/orders/list)')).toHaveClass(
      'result activeResult'
    );

    // navigate back out
    fireEvent.keyDown(searchInput, { key: 'ArrowLeft' });
    fireEvent.keyUp(searchInput, { key: 'ArrowLeft' });
    await waitForElement(() => getByText('Open Orders'));

    // it should select the first element in the list
    expect(getByTestId('quick-access-result(go/dashboard)')).toHaveClass(
      'result activeResult'
    );
    expect(getByTestId('quick-access-result(go/orders)')).toHaveClass('result');
  });

  it('should support selection by mouse', async () => {
    const searchTerm = 'Open dshbrd';
    const mocks = [createMatchlessSearchMock(searchTerm)];
    const props = createTestProps();
    const { getByTestId, queryByTestId, getByText } = renderAppWithRedux(
      <QuickAccess {...props} />,
      {
        mocks,
        flags,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchTerm),
        ],
      }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    await waitForElement(() => getByText('Open Orders'));
    const openOrdersResult = getByTestId('quick-access-result(go/orders)');

    // We select the second result
    fireEvent.mouseEnter(openOrdersResult);

    // it should highlight the hovered result
    expect(openOrdersResult).toHaveClass('result activeResult');

    // Click the selected result
    fireEvent.click(openOrdersResult);

    expect(props.history.push).toHaveBeenCalledWith(
      '/test-with-big-data-44/orders'
    );

    // should close quick access
    expect(queryByTestId('quick-access')).not.toBeInTheDocument();
  });

  it('should not show project-based commands when used outside of the project context', async () => {
    const searchTerm = 'Open Dashboard';
    const mocks = [createMatchlessSearchMock(searchTerm)];
    const props = createTestProps({ project: undefined });
    const { getByTestId, queryByText, getByText } = renderAppWithRedux(
      <QuickAccess {...props} />,
      { mocks }
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: searchTerm } });

    // wait for any other result
    await waitForElement(() => getByText('Open Support'));

    // ensure "Open Dashboard" is not visible, as it needs a project context
    expect(queryByText('Open Dashboard')).toBeNull();
  });

  describe('permissions', () => {
    it('should not find "Open Orders" when user has no orders permission', async () => {
      const searchTerm = 'Opn Ordrs';
      const mocks = [createMatchlessSearchMock(searchTerm)];

      const props = createTestProps();
      props.project.permissions = {
        canManageProject: false,
        canViewOrders: false,
        canViewProducts: true,
      };

      const { getByTestId, queryByText, getByText } = renderAppWithRedux(
        <QuickAccess {...props} />,
        {
          mocks,
          sdkMocks: [
            createPimAvailabilityCheckSdkMock(),
            createPimSearchSdkMock(searchTerm),
          ],
          flags,
        }
      );

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() => getByTestId('quick-access-search-input'));

      const searchInput = getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: searchTerm } });
      await waitForElement(() => getByText('Open Dashboard'));

      // results should not contain "Open Orders"
      expect(queryByText('Open Orders')).toBeNull();
    });

    it('should find "Open Orders" when user has the view orders permission', async () => {
      const searchTerm = 'Opn Ordrs';
      const mocks = [createMatchlessSearchMock(searchTerm)];

      const props = createTestProps();
      props.project.permissions = {
        canManageProject: false,
        canViewOrders: true,
        canViewProducts: true,
      };

      const { getByTestId, getByText } = renderAppWithRedux(
        <QuickAccess {...props} />,
        {
          mocks,
          sdkMocks: [
            createPimAvailabilityCheckSdkMock(),
            createPimSearchSdkMock(searchTerm),
          ],
          flags,
        }
      );

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() => getByTestId('quick-access-search-input'));

      const searchInput = getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: searchTerm } });

      // wait for Dashboard option
      await waitForElement(() => getByText('Open Dashboard'));

      // results should contain "Open Orders"
      expect(getByText('Open Orders')).toBeVisible();
    });
  });

  describe('switching project-data-locale', () => {
    describe('when inside a project', () => {
      describe('when project has only one project-data-locale', () => {
        it('should not show the option to change the project-data-locale', async () => {
          const searchTerm = 'setreslan';
          const mocks = [createMatchlessSearchMock(searchTerm)];
          const props = createTestProps({
            project: {
              key: 'test-with-big-data-44',
              languages: ['en'],
              permissions: managePermissions,
              owner: {
                id: 'test-big-data-1',
              },
            },
            user: {
              projects: {
                results: [
                  { key: 'test-with-big-data-44', name: 'Test with big data' },
                  // use project to provide at least one result so that we know
                  // when the test is done
                  { key: searchTerm, name: searchTerm },
                ],
              },
            },
          });
          const { getByTestId, queryByText, getByText } = renderAppWithRedux(
            <QuickAccess {...props} />,
            {
              mocks,
              sdkMocks: [
                createPimAvailabilityCheckSdkMock(),
                createPimSearchSdkMock(searchTerm),
              ],
            }
          );

          // open quick-access
          fireEvent.keyDown(document.body, { key: 'f' });
          await waitForElement(() => getByTestId('quick-access-search-input'));

          const searchInput = getByTestId('quick-access-search-input');
          fireEvent.change(searchInput, { target: { value: searchTerm } });
          await waitForElement(() =>
            getByText(`Switch to project "${searchTerm}"`)
          );

          expect(queryByText('Set Resource Language')).toBeNull();
        });
      });

      // describe('when project has more than one project-data-locale', () => {});
    });

    describe('when outside of a project', () => {
      it('should not show the option to change the project-data-locale', async () => {
        const searchTerm = 'setreslang2';
        const props = createTestProps({
          project: undefined,
          user: {
            projects: {
              results: [
                { key: 'test-with-big-data-44', name: 'Test with big data' },
                // use project to provide at least one result so that we know
                // when the test is done
                { key: searchTerm, name: searchTerm },
              ],
            },
          },
        });
        const { getByTestId, queryByText, getByText } = renderAppWithRedux(
          <QuickAccess {...props} />
        );

        // open quick-access
        fireEvent.keyDown(document.body, { key: 'f' });
        await waitForElement(() => getByTestId('quick-access-search-input'));

        const searchInput = getByTestId('quick-access-search-input');
        fireEvent.change(searchInput, { target: { value: searchTerm } });
        await waitForElement(() =>
          getByText(`Switch to project "${searchTerm}"`)
        );

        expect(queryByText('Set Resource Language')).toBeNull();
      });
    });
  });

  describe('feature toggles', () => {
    it('should not find PIM-Search when the feature is toggled off', async () => {
      const props = createTestProps();
      const searchTerm = 'Opn PIM Srch';
      const mocks = [createMatchlessSearchMock(searchTerm)];
      const {
        getByTestId,
        queryByText,
        getByText,
        queryByTestId,
      } = renderAppWithRedux(<QuickAccess {...props} />, {
        mocks,
        sdkMocks: [
          createPimAvailabilityCheckSdkMock(),
          createPimSearchSdkMock(searchTerm),
        ],
        flags: { ...flags, pimSearch: false },
      });

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() => getByTestId('quick-access-search-input'));

      const searchInput = getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: searchTerm } });
      await waitForElement(() => getByText('Open Discounts'));
      expect(queryByText('Open PIM Search')).toBeNull();
      expect(
        queryByTestId('quick-access-result(go/products/pim-search)')
      ).toBeNull();
    });

    it('should find PIM-Search when the feature is toggled on', async () => {
      const props = createTestProps();
      const searchTerm = 'Opn PIM Srch';
      const mocks = [createMatchlessSearchMock(searchTerm)];
      const { getByTestId, getByText } = renderAppWithRedux(
        <QuickAccess {...props} />,
        {
          mocks,
          sdkMocks: [
            createPimAvailabilityCheckSdkMock(),
            createPimSearchSdkMock(searchTerm),
          ],
          flags: { pimSearch: true },
        }
      );

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() => getByTestId('quick-access-search-input'));

      const searchInput = getByTestId('quick-access-search-input');
      fireEvent.change(searchInput, { target: { value: searchTerm } });
      await waitForElement(() => getByText('Open PIM Search'));
      expect(getByText('Open PIM Search')).toBeVisible();
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
      const { getByTestId, getByText } = renderAppWithRedux(
        <QuickAccess {...createTestProps()} />,
        {
          mocks,
          sdkMocks: [
            createPimAvailabilityCheckSdkMock(),
            {
              action: {
                type: 'SDK',
                payload: {
                  method: 'POST',
                  uri:
                    '/proxy/pim-search/test-with-big-data-44/search/products',
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
        }
      );

      // open quick-access
      fireEvent.keyDown(document.body, { key: 'f' });
      await waitForElement(() => getByTestId('quick-access-search-input'));

      const searchInput = getByTestId('quick-access-search-input');

      // create first history entry
      fireEvent.change(searchInput, { target: { value: 'party' } });
      await waitForElement(() => getByText('Show Product "Party Parrot"'));

      expect(
        getByTestId(
          `quick-access-result(go/product-by-search-text/product(${partyParrotId}))`
        )
      ).toHaveClass('result activeResult');
    });
  });
});
