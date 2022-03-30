const { graphql } = require('msw');
const { setupServer } = require('msw/node');
const {
  createCustomApplication,
  updateCustomApplication,
  fetchCustomApplication,
  fetchUserOrganizations,
} = require('./graphql-requests');

const mockServer = setupServer();
afterEach(() => {
  mockServer.resetHandlers();
});
beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'bypass',
  })
);
afterAll(() => mockServer.close());

const mcApiUrl = 'https://mc-api.europe-west1.gcp.commercetools.com';

describe('fetch custom application data', () => {
  beforeEach(() => {
    mockServer.use(
      graphql.query('FetchCustomApplicationFromCli', (req, res, ctx) => {
        return res(
          ctx.data({
            organizationExtensionForCustomApplication: {
              id: 'test-id',
              organizationId: 'org-id',
              application: {
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
        token: 'test-token',
      });
    expect(
      organizationExtensionForCustomApplication.application.entryPointUriPath
    ).toEqual('test-custom-app');
    expect(organizationExtensionForCustomApplication.id).toEqual('test-id');
    expect(organizationExtensionForCustomApplication.organizationId).toEqual(
      'org-id'
    );
  });
});

describe('register custom application', () => {
  beforeEach(() => {
    mockServer.use(
      graphql.mutation('CreateCustomApplicationFromCli', (req, res, ctx) => {
        return res(
          ctx.data({
            createCustomApplication: {
              id: 'new-test-id',
              application: {
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
            },
          })
        );
      })
    );
  });
  it('should match returned data', async () => {
    const createdCustomAppsData = await createCustomApplication({
      entryPointUriPath: 'new-test-custom-app',
      mcApiUrl,
      token: 'new-test-token',
    });
    expect(createdCustomAppsData.application.entryPointUriPath).toEqual(
      'new-test-custom-app'
    );
    expect(createdCustomAppsData.id).toEqual('new-test-id');
  });
});

describe('update custom application', () => {
  beforeEach(() => {
    mockServer.use(
      graphql.mutation('UpdateCustomApplicationFromCli', (req, res, ctx) => {
        return res(
          ctx.data({
            updateCustomApplication: {
              id: 'test-id',
              application: {
                url: 'https://test.com',
                name: 'Updated Test name',
                description: 'Updated Test description',
                entryPointUriPath: 'updated-test-custom-app',
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
            },
          })
        );
      })
    );
  });
  it('should match returned data', async () => {
    const updatedCustomAppsData = await updateCustomApplication({
      entryPointUriPath: 'updated-test-custom-app',
      mcApiUrl,
      token: 'test-token',
    });
    expect(updatedCustomAppsData.application.name).toEqual('Updated Test name');
    expect(updatedCustomAppsData.application.description).toEqual(
      'Updated Test description'
    );
  });
});

describe('fetch user organizations', () => {
  beforeEach(() => {
    mockServer.use(
      graphql.query('FetchCustomApplicationFromCli', (req, res, ctx) => {
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
      token: 'test-token',
    });
    expect(data.results[0].id).toEqual('test-organization-id');
    expect(data.results[0].name).toEqual('test-organization-name');
  });
});
