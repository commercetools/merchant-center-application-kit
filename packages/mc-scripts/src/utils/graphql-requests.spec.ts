import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { TCustomViewType, TCustomViewSize } from '../generated/settings';
import {
  createCustomApplication,
  updateCustomApplication,
  fetchCustomApplication,
  createCustomView,
  updateCustomView,
  fetchCustomView,
  fetchUserOrganizations,
} from './graphql-requests';

const mockServer = setupServer();
afterEach(() => {
  mockServer.resetHandlers();
});
beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'error',
  })
);
afterAll(() => mockServer.close());

const mcApiUrl = 'https://mc-api.europe-west1.gcp.commercetools.com';

describe('fetch user organizations', () => {
  const applicationIdentifier = '__local:test-custom-app';
  beforeEach(() => {
    mockServer.use(
      graphql.query('FetchMyOrganizationsFromCli', (_req, res, ctx) => {
        return res(
          ctx.data({
            myOrganizations: {
              total: 1,
              results: [
                {
                  id: 'test-organization-id',
                  name: 'test-organization-name',
                },
              ],
            },
          })
        );
      })
    );
  });
  it('should match returned data', async () => {
    const data = await fetchUserOrganizations({
      mcApiUrl,
      applicationIdentifier,
    });
    expect(data.results[0].id).toEqual('test-organization-id');
    expect(data.results[0].name).toEqual('test-organization-name');
  });
});

describe('Custom Applications', () => {
  const applicationIdentifier = '__local:test-custom-app';
  describe('fetch custom application data', () => {
    beforeEach(() => {
      mockServer.use(
        graphql.query('FetchCustomApplicationFromCli', (_req, res, ctx) => {
          return res(
            ctx.data({
              organizationExtensionForCustomApplication: {
                organizationId: 'organization-id',
                application: {
                  id: 'application-id',
                  url: 'https://test.com',
                  name: 'Test name',
                  description: 'Test description',
                  entryPointUriPath: 'test-custom-app',
                  icon: '<svg><path fill="#000000"></path></svg>',
                  submenuLinks: [],
                  mainMenuLink: [],
                  permissions: [
                    {
                      oAuthScopes: ['view_products', 'view_customers'],
                      name: 'viewTestCustomApp',
                    },
                    {
                      oAuthScopes: [],
                      name: 'manageTestCustomApp',
                    },
                  ],
                },
              },
            })
          );
        })
      );
    });
    it('should match returned data', async () => {
      const organizationExtensionForCustomApplication =
        await fetchCustomApplication({
          entryPointUriPath: 'test-custom-app',
          mcApiUrl,
          applicationIdentifier,
        });
      expect(
        organizationExtensionForCustomApplication?.application.entryPointUriPath
      ).toEqual('test-custom-app');
      expect(organizationExtensionForCustomApplication?.application.id).toEqual(
        'application-id'
      );
      expect(organizationExtensionForCustomApplication?.organizationId).toEqual(
        'organization-id'
      );
    });
  });

  describe('register custom application', () => {
    beforeEach(() => {
      mockServer.use(
        graphql.mutation('CreateCustomApplicationFromCli', (_req, res, ctx) => {
          return res(
            ctx.data({
              createCustomApplication: {
                id: 'application-id',
                url: 'https://test.com',
                name: 'New Test name',
                description: 'Test description',
                entryPointUriPath: 'new-test-custom-app',
                icon: '<svg><path fill="#000000"></path></svg>',
                submenuLinks: [],
                mainMenuLink: [],
                permissions: [
                  {
                    oAuthScopes: ['view_products', 'view_customers'],
                    name: 'viewNewTestCustomApp',
                  },
                  {
                    oAuthScopes: [],
                    name: 'manageNewTestCustomApp',
                  },
                ],
              },
            })
          );
        })
      );
    });
    it('should match returned data', async () => {
      const createdCustomAppsData = await createCustomApplication({
        mcApiUrl,
        organizationId: 'organization-id',
        data: {
          url: 'https://test.com',
          name: 'New Test name',
          description: 'Test description',
          entryPointUriPath: 'new-test-custom-app',
          icon: '<svg><path fill="#000000"></path></svg>',
          submenuLinks: [],
          mainMenuLink: {
            defaultLabel: 'Test',
            labelAllLocales: [],
            permissions: [],
          },
          permissions: [
            {
              oAuthScopes: ['view_products', 'view_customers'],
              name: 'viewNewTestCustomApp',
            },
            {
              oAuthScopes: [],
              name: 'manageNewTestCustomApp',
            },
          ],
        },
        applicationIdentifier,
      });
      expect(createdCustomAppsData?.id).toEqual('application-id');
    });
  });

  describe('update custom application', () => {
    beforeEach(() => {
      mockServer.use(
        graphql.mutation('UpdateCustomApplicationFromCli', (_req, res, ctx) => {
          return res(
            ctx.data({
              updateCustomApplication: {
                id: 'application-id',
              },
            })
          );
        })
      );
    });
    it('should match returned data', async () => {
      const updatedCustomAppsData = await updateCustomApplication({
        mcApiUrl,
        organizationId: 'organization-id',
        applicationId: 'application-id',
        data: {
          url: 'https://test.com',
          name: 'New Test name',
          description: 'Test description',
          entryPointUriPath: 'new-test-custom-app',
          icon: '<svg><path fill="#000000"></path></svg>',
          submenuLinks: [],
          mainMenuLink: {
            defaultLabel: 'Test',
            labelAllLocales: [],
            permissions: [],
          },
          permissions: [
            {
              oAuthScopes: ['view_products', 'view_customers'],
              name: 'viewNewTestCustomApp',
            },
            {
              oAuthScopes: [],
              name: 'manageNewTestCustomApp',
            },
          ],
        },
        applicationIdentifier,
      });
      expect(updatedCustomAppsData?.id).toEqual('application-id');
    });
  });
});
describe('Custom Views', () => {
  const customViewId = 'custom-view-id';
  const applicationIdentifier = '__local:@@custom-view-host@@';
  describe('fetch custom view data', () => {
    beforeEach(() => {
      mockServer.use(
        graphql.query('FetchCustomViewFromCli', (_req, res, ctx) => {
          return res(
            ctx.data({
              organizationExtensionForCustomView: {
                organizationId: 'organization-id',
                customView: {
                  id: customViewId,
                  url: 'https://test.com',
                  defaultLabel: 'Test name',
                  description: 'Test description',
                  type: 'CustomPanel',
                  typeSettings: {
                    size: 'SMALL',
                  },
                  locators: [
                    'products.product_variant_details.images',
                    'customers.customer_details.custom_fields',
                  ],
                  permissions: [
                    {
                      oAuthScopes: ['view_products', 'view_customers'],
                      name: 'view',
                    },
                    {
                      oAuthScopes: [],
                      name: 'manage',
                    },
                  ],
                  labelAllLocales: [{ locale: 'en', value: 'custom-view' }],
                },
              },
            })
          );
        })
      );
    });
    it('should match returned data', async () => {
      const organizationExtensionForCustomView = await fetchCustomView({
        customViewId,
        mcApiUrl,
        applicationIdentifier,
      });
      expect(organizationExtensionForCustomView?.customView?.id).toEqual(
        customViewId
      );
      expect(organizationExtensionForCustomView?.organizationId).toEqual(
        'organization-id'
      );
    });
  });

  describe('register custom view', () => {
    beforeEach(() => {
      mockServer.use(
        graphql.mutation('CreateCustomViewFromCli', (_req, res, ctx) => {
          return res(
            ctx.data({
              createCustomView: {
                id: customViewId,
                url: 'https://test.com',
                defaultLabel: 'New Test name',
                description: 'Test description',
                locators: [
                  'products.product_variant_details.images',
                  'customers.customer_details.custom_fields',
                ],
                type: 'CustomPanel',
                typeSettings: {
                  size: 'LARGE',
                },
                permissions: [
                  {
                    oAuthScopes: ['view_products', 'view_customers'],
                    name: 'view',
                  },
                  {
                    oAuthScopes: [],
                    name: 'manage',
                  },
                ],
              },
            })
          );
        })
      );
    });
    it('should match returned data', async () => {
      const createdCustomViewData = await createCustomView({
        mcApiUrl,
        organizationId: 'organization-id',
        data: {
          url: 'https://test.com',
          defaultLabel: 'New Test name',
          description: 'Test description',
          locators: [
            'products.product_variant_details.images',
            'customers.customer_details.custom_fields',
          ],
          type: TCustomViewType['CustomPanel'],
          typeSettings: {
            size: TCustomViewSize.Large,
          },
          permissions: [
            {
              oAuthScopes: ['view_products', 'view_customers'],
              name: 'view',
            },
            {
              oAuthScopes: [],
              name: 'manage',
            },
          ],
          labelAllLocales: [{ locale: 'en', value: 'custom-view' }],
        },
        applicationIdentifier,
      });
      expect(createdCustomViewData?.id).toEqual(customViewId);
    });
  });

  describe('update custom view', () => {
    beforeEach(() => {
      mockServer.use(
        graphql.mutation('UpdateCustomViewFromCli', (_req, res, ctx) => {
          return res(
            ctx.data({
              updateCustomView: {
                id: customViewId,
              },
            })
          );
        })
      );
    });
    it('should match returned data', async () => {
      const updatedCustomAppsData = await updateCustomView({
        mcApiUrl,
        organizationId: 'organization-id',
        customViewId,
        data: {
          url: 'https://test.com',
          defaultLabel: 'New Test name',
          description: 'Test description',
          locators: [
            'products.product_variant_details.images',
            'customers.customer_details.custom_fields',
          ],
          type: TCustomViewType['CustomPanel'],
          typeSettings: {
            size: TCustomViewSize.Small,
          },
          permissions: [
            {
              oAuthScopes: ['view_products', 'view_customers'],
              name: 'view',
            },
            {
              oAuthScopes: [],
              name: 'manage',
            },
          ],
          labelAllLocales: [{ locale: 'en', value: 'custom-view' }],
        },
        applicationIdentifier,
      });
      expect(updatedCustomAppsData?.id).toEqual(customViewId);
    });
  });
});
