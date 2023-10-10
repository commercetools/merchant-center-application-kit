import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import {
  screen,
  renderApp,
} from '@commercetools-frontend/application-shell/test-utils';
import CustomViewsSelector from './custom-views-selector';

const locators = {
  productDetailsGeneral: 'products.product_details.general',
  productDetailsVariants: 'products.product_details.variants',
};

const installedCustomView1 = {
  id: 'installation-id-1',
  customView: {
    id: 'custom-view-id-1',
    defaultLabel: 'Avengers',
    labelAllLocales: [],
    url: 'https://avengers.app',
    type: 'CustomPanel',
    typeSettings: {
      size: 'LARGE',
    },
    locators: [locators.productDetailsGeneral],
    permissions: [
      {
        name: 'view',
        oAuthScopes: ['view_products'],
      },
    ],
  },
};
const installedCustomView2 = {
  id: 'installation-id-2',
  customView: {
    id: 'custom-view-id-2',
    defaultLabel: 'Justice League',
    labelAllLocales: [],
    url: 'https://justice-league.app',
    type: 'CustomPanel',
    typeSettings: {
      size: 'SMALL',
    },
    locators: [locators.productDetailsGeneral, locators.productDetailsVariants],
    permissions: [
      {
        name: 'view',
        oAuthScopes: ['view_products'],
      },
    ],
  },
};

const mockServer = setupServer();

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'error' }));
afterAll(() => mockServer.close());
afterEach(() => {
  mockServer.resetHandlers();
});

describe('CustomViewsSelector', () => {
  it('should render selector with list of installed Custom Views', async () => {
    mockServer.use(
      graphql.query('FetchCustomViewsByLocator', (_req, res, ctx) =>
        res(
          ctx.data({
            allCustomViewsInstallationsByLocator: [
              installedCustomView1,
              installedCustomView2,
            ],
          })
        )
      )
    );
    const onCustomViewsResolved = jest.fn();
    renderApp(
      <CustomViewsSelector
        customViewLocatorCode={locators.productDetailsGeneral}
        onCustomViewsResolved={onCustomViewsResolved}
      />
    );

    await screen.findByLabelText(/Avengers/i);
    expect(screen.getByLabelText(/Justice League/i)).toBeInTheDocument();
    expect(onCustomViewsResolved).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'custom-view-id-1',
        }),
        expect.objectContaining({
          id: 'custom-view-id-2',
        }),
      ])
    );
  });

  it('should not render anything if no custom view locator code is provided', () => {
    renderApp(<CustomViewsSelector />);
    const label = screen.queryByText(/Custom Views/i);
    expect(label).not.toBeInTheDocument();
  });
});
