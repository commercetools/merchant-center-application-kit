import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getAuthToken } from './auth';

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
      rest.post(`${mcApiUrl}/tokens/cli`, (_req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            token: 'hello-world',
            expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 36, // 1,5 days
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
    expect(sessionData.expiresAt).toBeGreaterThan(
      Math.floor(Date.now() / 1000)
    );
    expect(sessionData.expiresAt).toBeLessThanOrEqual(
      Math.floor(Date.now() / 1000) + 60 * 60 * 36
    );
  });
});

describe('when login details are incorrect', () => {
  beforeEach(() => {
    mockServer.use(
      rest.post(`${mcApiUrl}/tokens/cli`, (_req, res, ctx) => {
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
