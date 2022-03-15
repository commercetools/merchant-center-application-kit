const { rest } = require('msw');
const { setupServer } = require('msw/node');

const getSessionData = require('./get-session-data');

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
        return res(
          ctx.status(200),
          ctx.set(
            'set-cookie',
            'mcAccessToken=hello-world; Expires=Tue, 15 Mar 2022 10:01:09 GMT'
          )
        );
      })
    );
  });
  it('should match returned credentials', async () => {
    const sessionData = await getSessionData({
      email: 'user@email.com',
      password: 'secret',
      mcApiUrl,
    });
    expect(sessionData).toEqual({
      sessionToken: 'hello-world',
      expiresAt: 'Tue, 15 Mar 2022 10:01:09 GMT',
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
        await getSessionData({
          email: 'user@email.com',
          password: 'secret',
          mcApiUrl,
        })
    ).rejects.toThrow('Invalid email or password');
  });
});
