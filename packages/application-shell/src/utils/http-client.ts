/**
 * This file contains helper functions to configure an HTTP client
 * with the recommended configuration for the Merchant Center API.
 */

import omitEmpty from 'omit-empty-es';
import createHttpUserAgent from '@commercetools/http-user-agent';
import {
  type ApplicationWindow,
  STATUS_CODES,
} from '@commercetools-frontend/constants';
import { SUPPORTED_HEADERS } from '../constants';
import * as oidcStorage from './oidc-storage';
import getCorrelationId from './get-correlation-id';
import getMcApiUrl from './get-mc-api-url';
import selectProjectKeyFromUrl from './select-project-key-from-url';
import selectUserId from './select-user-id';

declare let window: ApplicationWindow;

export type THeaders = Record<string, string>;

export type TConfig = {
  /**
   * A custom user agent to identify the HTTP client.
   * We recommend to use the `@commercetools/http-user-agent` package.
   *
   * @example
   *
   * import createHttpUserAgent from '@commercetools/http-user-agent';
   *
   * const userAgent = createHttpUserAgent({
   *   name: 'fetch-client',
   *   version: '2.6.0',
   *   libraryName: window.app.applicationName,
   *   contactEmail: 'support@my-company.com',
   * });
   */
  userAgent?: string;

  /**
   * Additional headers to be included in the request.
   * The provided recommended headers won't be overwritten.
   * See `TOptions.headers`.
   */
  headers?: THeaders;
};

export type TOptions = {
  credentials: 'include';

  /**
   * The HTTP headers included by default are:
   * - Accept
   * - Authorization (only in development)
   * - X-Application-Id
   * - X-Correlation-Id
   * - X-Project-Key
   * - X-User-Agent
   */
  headers: THeaders;
};

export type TFetcherResponse<Data> = {
  /**
   * The parsed response from the server.
   */
  data: Data;
  /**
   * The HTTP status code from the server response.
   */
  statusCode: number;
  /**
   * Implement a function to access the HTTP headers from the server response.
   */
  getHeader: (headerName: string) => string | null;
};
export type TFetcher<Data> = (
  options: TOptions
) => Promise<TFetcherResponse<Data>>;

const defaultUserAgent = createHttpUserAgent({
  name: 'unknown-http-client',
  libraryName: window.app.applicationName,
});

function buildApiUrl(endpoint: string) {
  const apiUrl = getMcApiUrl().replace(/\/$/, '');
  return `${apiUrl}${endpoint}`;
}

function createHttpClientOptions(config: TConfig = {}): TOptions {
  const sessionToken = oidcStorage.getSessionToken();
  const projectKey = selectProjectKeyFromUrl();
  const userId = selectUserId();
  const userAgent = config?.userAgent || defaultUserAgent;

  return {
    credentials: 'include',
    headers: omitEmpty<THeaders>({
      ...config.headers,
      [SUPPORTED_HEADERS.ACCEPT]: 'application/json',
      [SUPPORTED_HEADERS.AUTHORIZATION]: sessionToken
        ? `Bearer ${sessionToken}`
        : undefined,
      [SUPPORTED_HEADERS.X_APPLICATION_ID]: window.app.applicationId,
      [SUPPORTED_HEADERS.X_CORRELATION_ID]: getCorrelationId({ userId }),
      [SUPPORTED_HEADERS.X_PROJECT_KEY]: projectKey,
      [SUPPORTED_HEADERS.X_USER_AGENT]: userAgent,
    }),
  };
}

class RenewTokenError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', {
      value: 'RenewTokenError',
    });
  }
}

async function executeHttpClientRequest<Data>(
  fetcher: TFetcher<Data>,
  config: TConfig = {}
): Promise<Data> {
  // Wrapper function to be called again (once) on retry.
  async function sendRequest({
    shouldRenewToken,
  }: { shouldRenewToken?: boolean } = {}) {
    const requestOptions = createHttpClientOptions(config);

    const response = await fetcher({
      ...requestOptions,
      headers: omitEmpty({
        ...requestOptions.headers,
        // Passing this header forces a token renewal.
        [SUPPORTED_HEADERS.X_TOKEN_RETRY]: shouldRenewToken,
      }),
    });
    if (response.statusCode === STATUS_CODES.UNAUTHORIZED) {
      throw new RenewTokenError(`Unauthorized response, attempting retry.`);
    }

    // In case a new session token is returned from the server, save it.
    const refreshedSessionToken = response.getHeader(
      'x-refreshed-session-token'
    );
    if (refreshedSessionToken) {
      oidcStorage.setActiveSession(refreshedSessionToken);
    }
    return response.data;
  }

  // Attempt to send the request.
  return sendRequest().catch((error) => {
    if (error instanceof RenewTokenError) {
      // Retry the request and ask to renew the token.
      return sendRequest({ shouldRenewToken: true });
    }
    throw error;
  });
}

export { buildApiUrl, createHttpClientOptions, executeHttpClientRequest };
