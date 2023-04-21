// Used from MSW
import { rest } from 'msw';
import type { Headers } from 'headers-polyfill';
import { setupServer } from 'msw/node';
import { SUPPORTED_HEADERS } from '../constants';
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

const throwIfMissingHeader = (
  headers: Headers,
  expectedHeaderName: string,
  expectedHeaderValue: string
) => {
  const matchingHeader = headers.get(expectedHeaderName);
  if (!matchingHeader) {
    throw new Error(`Missing "${expectedHeaderName}" header`);
  }
  if (matchingHeader !== expectedHeaderValue) {
    throw new Error(
      `Invalid "${expectedHeaderName}" header value "${expectedHeaderValue}"`
    );
  }
};

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
    await expect(res.json()).resolves.toEqual({ message: 'Hello' });
  });

  it('should send required headers (for /forward-to)', async () => {
    mockServer.use(
      rest.get(buildApiUrl('/proxy/forward-to'), (req, res, ctx) => {
        try {
          throwIfMissingHeader(req.headers, 'x-forward-header-foo', 'bar');
          throwIfMissingHeader(
            req.headers,
            'x-forward-to',
            'https://my-api.com'
          );
          throwIfMissingHeader(req.headers, 'accept-version', 'v2');
          throwIfMissingHeader(
            req.headers,
            'x-forward-to-audience-policy',
            'forward-url-full-path'
          );
          expect(req.headers.get(SUPPORTED_HEADERS.X_FORWARD_TO_CLAIMS)).toBe(
            null
          );
        } catch (error) {
          if (error instanceof Error)
            return res(ctx.status(400), ctx.json({ message: error.message }));
        }

        return res(ctx.status(200), ctx.json({ message: 'Hello' }));
      })
    );

    const defaultOptions = createHttpClientOptions({
      headers: {
        'Content-Type': 'application/json',
      },
      userAgent: 'hello',
      forwardToConfig: {
        uri: 'https://my-api.com',
        headers: {
          foo: 'bar',
        },
      },
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

    const res = await fetch(buildApiUrl('/proxy/forward-to'), {
      ...defaultOptions,
      method: 'GET',
    });
    await expect(res.json()).resolves.toEqual({ message: 'Hello' });
  });

  it('should include "X-Forward-To-Claims" header when config is provided (for /forward-to)', async () => {
    const mockResponseData = { message: 'Hello' };
    mockServer.use(
      rest.get(buildApiUrl('/proxy/forward-to'), (req, res, ctx) => {
        throwIfMissingHeader(
          req.headers,
          SUPPORTED_HEADERS.X_FORWARD_TO_CLAIMS,
          'permissions'
        );

        return res(ctx.status(200), ctx.json(mockResponseData));
      })
    );

    const httpRequestOptions = createHttpClientOptions({
      headers: {
        'Content-Type': 'application/json',
      },
      userAgent: 'hello',
      forwardToConfig: {
        uri: 'https://my-api.com',
        includeUserPermissions: true,
      },
    });

    const res = await fetch(buildApiUrl('/proxy/forward-to'), {
      ...httpRequestOptions,
      method: 'GET',
    });
    await expect(res.json()).resolves.toEqual(mockResponseData);
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
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    expect(data).toEqual({ message: 'Hello' });
    expect(oidcStorage.setActiveSession).toHaveBeenCalledWith('12345');
  });

  it('should throw an error if the "uri" option of "forwardToConfig" is missing', async () => {
    expect(() =>
      createHttpClientOptions({
        headers: {
          'Content-Type': 'application/json',
        },

        userAgent: 'hello',
        forwardToConfig: {
          uri: '',
        },
      })
    ).toThrowErrorMatchingInlineSnapshot(`"Missing required "uri" option."`);
  });
});
