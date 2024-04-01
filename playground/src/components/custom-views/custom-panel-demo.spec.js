import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@commercetools-frontend/application-shell/test-utils';
import { entryPointUriPath } from '../../constants';
import ApplicationPlaygroundRoutes from '../../routes';
import { renderApplicationWithRedux } from '../../test-utils';

const mockServer = setupServer();
afterEach(() => mockServer.resetHandlers());
beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'error',
  })
);
afterAll(() => mockServer.close());

const renderApp = (options = {}) => {
  const route =
    options.route || `/my-project/${entryPointUriPath}/custom-panel`;
  const { history } = renderApplicationWithRedux(
    <ApplicationPlaygroundRoutes />,
    {
      route,
      environment: {
        entryPointUriPath,
      },
      ...options,
    }
  );
  return { history };
};

describe('custom panel demo', () => {
  it('should render selector with list of installed Custom Views', async () => {
    mockServer.use(
      graphql.query('FetchCustomViewsByLocator', () => {
        return HttpResponse.json({
          data: {
            allCustomViewsInstallationsByLocator: [
              {
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
                  locators: ['products.product_details.general'],
                  permissions: [
                    {
                      name: 'view',
                      oAuthScopes: ['view_products'],
                    },
                  ],
                },
              },
              {
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
                  locators: [
                    'products.product_details.general',
                    'products.product_details.variants',
                  ],
                  permissions: [
                    {
                      name: 'view',
                      oAuthScopes: ['view_products'],
                    },
                  ],
                },
              },
            ],
          },
        });
      }),
    );
    renderApp();
    await screen.findByText(/Avengers/i);
    expect(screen.getByText(/Justice League/i)).toBeInTheDocument();
  });
});
