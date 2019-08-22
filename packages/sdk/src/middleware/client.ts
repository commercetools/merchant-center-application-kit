import {
  createClient as createSdkClient,
  MiddlewareRequest,
  MiddlewareResponse,
  Next,
} from '@commercetools/sdk-client';
import { createHttpMiddleware as createSdkHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createCorrelationIdMiddleware as createSdkCorrelationIdMiddleware } from '@commercetools/sdk-middleware-correlation-id';
import createHttpUserAgent from '@commercetools/http-user-agent';
import { ApplicationWindow } from '@commercetools-frontend/constants';
import version from '../version';

declare let window: ApplicationWindow;

const userAgent = createHttpUserAgent({
  name: '@commercetools/sdk-client',
  libraryName: [window.app.applicationName || 'unknown', 'sdk'].join('/'),
  libraryVersion: version,
  contactUrl: 'https://git.io/fjuyC', // points to the appkit repo issues
  contactEmail: 'mc@commercetools.com',
});

const customUserAgentMiddleware = (next: Next): Next => (
  request: MiddlewareRequest,
  response: MiddlewareResponse
) => {
  const requestWithCustomUserAgent = {
    ...request,
    headers: {
      ...request.headers,
      'X-User-Agent': userAgent,
    },
  };
  next(requestWithCustomUserAgent, response);
};

// NOTE we should not use these directly but rather have them passed in from
// the application
const httpMiddleware = createSdkHttpMiddleware({
  host: window.app.mcApiUrl,
  includeResponseHeaders: true,
  credentialsMode: 'include',
  fetch,
});

const createCorrelationIdMiddleware = ({
  getCorrelationId,
}: {
  getCorrelationId: () => string;
}) =>
  createSdkCorrelationIdMiddleware({
    generate: getCorrelationId,
  });

const createClient = ({
  getCorrelationId,
}: {
  getCorrelationId: () => string;
}) =>
  createSdkClient({
    middlewares: [
      createCorrelationIdMiddleware({ getCorrelationId }),
      customUserAgentMiddleware,
      httpMiddleware,
    ],
  });

export default createClient;
