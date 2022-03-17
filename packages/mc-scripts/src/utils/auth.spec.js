const { rest } = require('msw');
const { setupServer } = require('msw/node');
const { getAuthToken } = require('./auth');

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

describe('when login details are correct', () => {
  beforeEach(() => {
    mockServer.use(
      rest.post(`${mcApiUrl}/tokens/cli`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            token: 'hello-world',
            expiresIn: 3600,
          })
        );
      })
    );
  });
  it('should match returned credentials', async () => {
    const sessionData = await getAuthToken(mcApiUrl, {
      email: 'user@email.com',
      password: 'secret',
    });
    expect(sessionData).toEqual({
      token: 'hello-world',
      expiresAt: expect.any(Number),
    });
    expect(sessionData.expiresAt).toBeGreaterThan(Date.now());
    expect(sessionData.expiresAt).toBeLessThan(Date.now() + 3600 * 1000);
  });
});

describe('when login details are incorrect', () => {
  beforeEach(() => {
    mockServer.use(
      rest.post(`${mcApiUrl}/tokens/cli`, (req, res, ctx) => {
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
        await getAuthToken(mcApiUrl, {
          email: 'user@email.com',
          password: 'secret',
        })
    ).rejects.toThrow('Invalid email or password');
  });
});
