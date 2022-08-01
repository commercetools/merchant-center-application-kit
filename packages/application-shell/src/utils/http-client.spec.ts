import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  buildApiUrl,
  createHttpClientOptions,
  executeHttpClientRequest,
} from './http-client';
import * as oidcStorage from './oidc-storage';

jest.mock('./oidc-storage');

const mockServer = setupServer();
afterEach(() => mockServer.resetHandlers());
beforeAll(() => {
  mockServer.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  mockServer.close();
});

describe('Custom HTTP client (fetch)', () => {
  it('should send required headers', async () => {
    mockServer.use(
      rest.get(buildApiUrl('/users'), (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ message: 'Hello' }));
      })
    );

    const defaultOptions = createHttpClientOptions({
      headers: {
        'Content-Type': 'application/json',
      },
      userAgent: 'hello',
    });

    expect(defaultOptions).toEqual({
      credentials: 'include',
      headers: expect.objectContaining({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Correlation-Id': expect.stringContaining('mc/'),
        'X-User-Agent': 'hello',
      }),
    });

    const res = await fetch(buildApiUrl('/users'), {
      ...defaultOptions,
      method: 'GET',
    });
    await res.json();
  });

  it('should execute request and renew token', async () => {
    mockServer.use(
      rest.get(buildApiUrl('/users'), (req, res, ctx) => {
        if (req.headers.get('x-force-token') === 'true') {
          return res(
            ctx.status(200),
            ctx.set('x-refreshed-session-token', '12345'),
            ctx.json({ message: 'Hello' })
          );
        }
        return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
      })
    );

    const data = await executeHttpClientRequest<{ message: string }>(
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      async (options) => {
        const res = await fetch(buildApiUrl('/users'), {
          ...options,
          method: 'GET',
        });
        const data = await res.json();

        return {
          data,
          statusCode: res.status,
          getHeader: (key) => res.headers.get(key),
        };
      }
    );

    expect(data).toEqual({ message: 'Hello' });
    expect(oidcStorage.setActiveSession).toHaveBeenCalledWith('12345');
  });
});
