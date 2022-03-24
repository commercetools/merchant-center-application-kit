const { graphql } = require('msw');
const { setupServer } = require('msw/node');
const {
  createCustomApplication,
  updateCustomApplication,
  fetchCustomApplication,
} = require('./custom-application-requests');

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
      graphql.query(
        'OrganizationExtensionForCustomApplication',
        (req, res, ctx) => {
          return res(
            ctx.data({
              organizationExtensionForCustomApplication: {
                id: 'test-id',
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
        }
      )
    );
  });
  it('should match returned data', async () => {
    const data = await fetchCustomApplication({
      entryPointUriPath: 'test-custom-app',
      mcApiUrl,
      token: 'test-token',
    });
    expect(
      data.organizationExtensionForCustomApplication.application
        .entryPointUriPath
    ).toEqual('test-custom-app');
    expect(data.organizationExtensionForCustomApplication.id).toEqual(
      'test-id'
    );
  });
});

describe('create custom application', () => {
  beforeEach(() => {
    mockServer.use(
      graphql.mutation('RegisterCustomApplication', (req, res, ctx) => {
        return res(
          ctx.data({
            organizationExtensionForCustomApplication: {
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
    const data = await createCustomApplication({
      entryPointUriPath: 'new-test-custom-app',
      mcApiUrl,
      token: 'new-test-token',
    });
    expect(
      data.organizationExtensionForCustomApplication.application
        .entryPointUriPath
    ).toEqual('new-test-custom-app');
    expect(data.organizationExtensionForCustomApplication.id).toEqual(
      'new-test-id'
    );
  });
});

describe('update custom application', () => {
  beforeEach(() => {
    mockServer.use(
      graphql.mutation('UpdateCustomApplication', (req, res, ctx) => {
        return res(
          ctx.data({
            organizationExtensionForCustomApplication: {
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
    const data = await updateCustomApplication({
      entryPointUriPath: 'updated-test-custom-app',
      mcApiUrl,
      token: 'test-token',
    });
    expect(
      data.organizationExtensionForCustomApplication.application.name
    ).toEqual('Updated Test name');
    expect(
      data.organizationExtensionForCustomApplication.application.description
    ).toEqual('Updated Test description');
  });
});
