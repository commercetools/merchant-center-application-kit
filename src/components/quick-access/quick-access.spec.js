import React from 'react';
import { MockedProvider as ApolloMockProvider } from 'react-apollo/test-utils';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import memoryAdapter from '@flopflip/memory-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { IntlProvider } from 'react-intl';
import QuickAccessQuery from './quick-access.graphql';
import * as gtm from '../../utils/gtm';
import QuickAccess from './index';

jest.mock('../../utils/gtm');

const createMatchlessSearchMock = searchText => ({
  request: {
    query: QuickAccessQuery,
    variables: { searchText, target: 'ctp' },
  },
  result: {
    data: {
      productById: null,
      productByKey: null,
      productByVariantSku: null,
      productByVariantKey: null,
    },
  },
});

const managePermissions = { canManageProject: true };

const createTestProps = custom => ({
  project: {
    key: 'test-with-big-data-44',
    languages: ['en', 'de'],
    permissions: managePermissions,
  },
  history: { push: jest.fn() },
  // client prop is provided by withApollo
  user: {
    projects: {
      results: [
        {
          key: 'test-with-big-data-44',
          name: 'Test with big data',
        },
      ],
    },
  },
  ...custom,
});

describe('QuickAccess', () => {
  beforeEach(() => {
    gtm.track.mockReset();
  });

  it('should open when pressing "f" on document body', async () => {
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={[]} addTypename={false}>
          <QuickAccess {...createTestProps()} />
        </ApolloMockProvider>
      </IntlProvider>
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
    const { getByTestId } = render(
      <div>
        <IntlProvider locale="en">
          <ApolloMockProvider mocks={[]} addTypename={false}>
            <QuickAccess {...createTestProps()} />
          </ApolloMockProvider>
        </IntlProvider>
        <div tabIndex="-1" data-testid="modal">
          Modal
        </div>
      </div>
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
    const { getByTestId } = render(
      <div>
        <IntlProvider locale="en">
          <ApolloMockProvider mocks={[]} addTypename={false}>
            <QuickAccess {...createTestProps()} />
          </ApolloMockProvider>
        </IntlProvider>
      </div>
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    fireEvent.click(getByTestId('quick-access-search-input'));

    // It should not close, so the element should still be around
    expect(getByTestId('quick-access-search-input')).toBeVisible();
  });

  it('should not open when pressing "f" not directly on other focusable elements', async () => {
    const { queryByTestId } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={[]} addTypename={false}>
          <QuickAccess {...createTestProps()} />
        </ApolloMockProvider>
      </IntlProvider>
    );

    // open quick-access
    fireEvent.keyDown(document.body.firstChild, { key: 'f' });
    expect(queryByTestId('quick-access')).toBeNull();
  });

  it('should track when QuickAccess is opened', async () => {
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={[]} addTypename={false}>
          <QuickAccess {...createTestProps()} />
        </ApolloMockProvider>
      </IntlProvider>
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
    const { getByTestId, container } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={[]} addTypename={false}>
          <QuickAccess {...createTestProps()} />
        </ApolloMockProvider>
      </IntlProvider>
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access'));

    expect(getByTestId('quick-access')).toBeInTheDocument();

    // close quick-access
    fireEvent.keyDown(getByTestId('quick-access-search-input'), {
      key: 'Escape',
    });

    expect(container).toBeEmpty();
  });

  it('should show results when searching for Dashboard', async () => {
    const mocks = [createMatchlessSearchMock('Open dshbrd')];
    const { getByTestId, getByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...createTestProps()} />
        </ApolloMockProvider>
      </IntlProvider>
    );

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd' } });
    await waitForElement(() => getByText('Open Dashboard'));
    expect(getByText('Open Dashboard')).toBeInTheDocument();
  });

  it('should show error message when searching while offline', async () => {
    const mocks = [
      {
        request: {
          query: QuickAccessQuery,
          variables: { searchText: 'Open dshbrd-offline', target: 'ctp' },
        },
        error: new Error('aw shucks'),
      },
    ];
    const { getByTestId, getByText, queryByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...createTestProps()} />
        </ApolloMockProvider>
      </IntlProvider>
    );
    const offlineText = 'Offline';

    // open quick-access
    fireEvent.keyDown(document.body, { key: 'f' });
    await waitForElement(() => getByTestId('quick-access-search-input'));

    const searchInput = getByTestId('quick-access-search-input');
    fireEvent.change(searchInput, { target: { value: 'Open dshbrd-offline' } });
    await waitForElement(() => getByText(offlineText));
    // it should show the offline warning
    expect(getByText(offlineText)).toBeVisible();

    // when input is cleared again
    fireEvent.change(searchInput, { target: { value: '' } });

    // the offline warning should be removed
    expect(queryByText(offlineText)).toBeNull();
  });

  it('should open dashboard when chosing the "Open Dashboard" command', async () => {
    const mocks = [createMatchlessSearchMock('Open dshbrd')];
    const props = createTestProps();
    const { getByTestId, container, getByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...props} />
        </ApolloMockProvider>
      </IntlProvider>
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
    expect(container).toBeEmpty();
  });

  it('should cycle through the history', async () => {
    const mocks = [
      createMatchlessSearchMock('Open dshbrd'),
      createMatchlessSearchMock('Open prdcts'),
    ];
    const props = createTestProps();
    const { getByTestId, container, getByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...props} />
        </ApolloMockProvider>
      </IntlProvider>
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
    expect(container).toBeEmpty();

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
    expect(container).toBeEmpty();

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

    // when now pressing up again, we should not cycle through history but
    // instead move the selection to the last element in the list
    searchInput = getByTestId('quick-access-search-input');
    fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
    fireEvent.keyUp(searchInput, { key: 'ArrowUp' });

    // The last element in the results
    expect(getByTestId('quick-access-result(go/categories/add)')).toHaveClass(
      'result activeResult'
    );
  });

  it('should find a product by sku', async () => {
    const mocks = [
      {
        request: {
          query: QuickAccessQuery,
          variables: { searchText: 'party-parrot-sku', target: 'ctp' },
        },
        result: {
          data: {
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
    const { getByTestId, getByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...createTestProps()} />
        </ApolloMockProvider>
      </IntlProvider>
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
          variables: { searchText: productId, target: 'ctp' },
        },
        result: {
          data: {
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
    const { getByTestId, getByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...createTestProps()} />
        </ApolloMockProvider>
      </IntlProvider>
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
          variables: { searchText: 'party-parrot', target: 'ctp' },
        },
        result: {
          data: {
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
    const { getByTestId, getByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...createTestProps()} />
        </ApolloMockProvider>
      </IntlProvider>
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
          variables: { searchText: productId, target: 'ctp' },
        },
        result: {
          data: {
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
    const { getByTestId, getByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...createTestProps({ projectDataLocale: 'de' })} />
        </ApolloMockProvider>
      </IntlProvider>
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
    const { getByTestId, getByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...createTestProps()} />
        </ApolloMockProvider>
      </IntlProvider>
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
    const { getByTestId, getByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...createTestProps()} />
        </ApolloMockProvider>
      </IntlProvider>
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
    const { getByTestId, container, getByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...props} />
        </ApolloMockProvider>
      </IntlProvider>
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
    expect(container).toBeEmpty();
  });

  it('should not show project-based commands when used outside of the project context', async () => {
    const searchTerm = 'Open Dashboard';
    const mocks = [createMatchlessSearchMock(searchTerm)];
    const props = createTestProps({ project: undefined });
    const { getByTestId, queryByText, getByText } = render(
      <IntlProvider locale="en">
        <ApolloMockProvider mocks={mocks} addTypename={false}>
          <QuickAccess {...props} />
        </ApolloMockProvider>
      </IntlProvider>
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
      props.project.permissions = {};

      const { getByTestId, queryByText, getByText } = render(
        <IntlProvider locale="en">
          <ApolloMockProvider mocks={mocks} addTypename={false}>
            <QuickAccess {...props} />
          </ApolloMockProvider>
        </IntlProvider>
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

    it('should not "Open Orders" when user has the view orders permission', async () => {
      const searchTerm = 'Opn Ordrs';
      const mocks = [createMatchlessSearchMock(searchTerm)];

      const props = createTestProps();
      props.project.permissions = { canViewOrders: true };

      const { getByTestId, getByText } = render(
        <IntlProvider locale="en">
          <ApolloMockProvider mocks={mocks} addTypename={false}>
            <QuickAccess {...props} />
          </ApolloMockProvider>
        </IntlProvider>
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
          const { getByTestId, queryByText, getByText } = render(
            <IntlProvider locale="en">
              <ApolloMockProvider mocks={mocks} addTypename={false}>
                <QuickAccess {...props} />
              </ApolloMockProvider>
            </IntlProvider>
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
        const searchTerm = 'setreslang';
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
        const { getByTestId, queryByText, getByText } = render(
          <IntlProvider locale="en">
            <ApolloMockProvider mocks={[]} addTypename={false}>
              <QuickAccess {...props} />
            </ApolloMockProvider>
          </IntlProvider>
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

  // These are disabled while we await a new release of flopflip which
  // will allow us to use memoryAdapter for tests by adding the "reset" method,
  // and by not calling setState after the component unmounted.
  describe('feature toggles', () => {
    afterEach(() => {
      memoryAdapter.reset();
    });
    it('should not find PIM-Search when the feature is toggled off', async () => {
      const props = createTestProps();
      const searchTerm = 'Opn PIM Srch';
      const mocks = [createMatchlessSearchMock(searchTerm)];
      const { getByTestId, queryByText, getByText, queryByTestId } = render(
        <IntlProvider locale="en">
          <ConfigureFlopFlip
            adapter={memoryAdapter}
            defaultFlags={{ pimSearch: false }}
          >
            <ApolloMockProvider mocks={mocks} addTypename={false}>
              <QuickAccess {...props} />
            </ApolloMockProvider>
          </ConfigureFlopFlip>
        </IntlProvider>
      );

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
      const { getByTestId, getByText } = render(
        <IntlProvider locale="en">
          <ConfigureFlopFlip
            adapter={memoryAdapter}
            defaultFlags={{ pimSearch: true }}
          >
            <ApolloMockProvider mocks={mocks} addTypename={false}>
              <QuickAccess {...props} />
            </ApolloMockProvider>
          </ConfigureFlopFlip>
        </IntlProvider>
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
});
