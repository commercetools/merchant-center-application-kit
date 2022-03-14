const { rest } = require('msw');
const { setupServer } = require('msw/node');

const authenticator = require('../utils/auth');

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

describe('When login details are correct', () => {
  beforeEach(() => {
    mockServer.use(
      rest.post(`${mcApiUrl}/tokens`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.cookie('mcAccessToken', 'hello-world'));
      })
    );
  });
  it('should match returned credentials', async () => {
    const sessionData = await authenticator({
      email: 'lorem@commercetools.co',
      password: 'pass',
      mcApiUrl,
    });
    expect(sessionData).toEqual({
      sessionToken: 'hello-world',
      expiresAt: undefined,
    });
  });
});

describe('When login details are incorrect', () => {
  beforeEach(() => {
    mockServer.use(
      rest.post(`${mcApiUrl}/tokens`, (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            message: 'Invalid email or password',
          })
        );
      })
    );
  });
  it('should throw error', async () => {
    await expect(
      async () =>
        await authenticator({
          email: 'test@commercetools.co',
          password: 'incorrect-pass',
          mcApiUrl,
        })
    ).rejects.toThrow('Invalid email or password');
  });
});
