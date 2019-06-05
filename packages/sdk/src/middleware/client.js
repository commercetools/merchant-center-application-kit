import { createClient as createSdkClient } from '@commercetools/sdk-client';
import { createHttpMiddleware as createSdkHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createCorrelationIdMiddleware as createSdkCorrelationIdMiddleware } from '@commercetools/sdk-middleware-correlation-id';
import createHttpUserAgent from '@commercetools/http-user-agent';
import version from '../version';

const userAgent = createHttpUserAgent({
  name: '@commercetools/sdk-client',
  libraryName: [window.app.name, 'sdk'].join('/'),
  libraryVersion: version,
  contactUrl:
    'https://github.com/commercetools/merchant-center-application-kit/issues/new/choose',
  contactEmail: 'mc@commercetools.com',
});

const customUserAgentMiddleware = next => (request, response) => {
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

const createCorrelationIdMiddleware = ({ getCorrelationId }) =>
  createSdkCorrelationIdMiddleware({
    generate: getCorrelationId,
  });

const createClient = ({ getCorrelationId }) =>
  createSdkClient({
    middlewares: [
      createCorrelationIdMiddleware({ getCorrelationId }),
      customUserAgentMiddleware,
      httpMiddleware,
    ],
  });

export default createClient;
