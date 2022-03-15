const cookie = require('cookie');
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
    const sessionData = cookie.serialize('mcAccessToken', 'hello-world', {
      expires: new Date('2022-01-01'),
      httpOnly: true,
      domain: 'mc.europe-west1.gcp.commercetools.com',
    });
    mockServer.use(
      rest.post(`${mcApiUrl}/tokens`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.set('set-cookie', sessionData));
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
      expiresAt: 'Sat, 01 Jan 2022 00:00:00 GMT',
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
