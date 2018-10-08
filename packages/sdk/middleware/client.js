import fetch from 'unfetch';
import { createClient as createSdkClient } from '@commercetools/sdk-client';
import { createHttpMiddleware as createSdkHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createUserAgentMiddleware as createSdkUserAgentMiddleware } from '@commercetools/sdk-middleware-user-agent';
import { createCorrelationIdMiddleware as createSdkCorrelationIdMiddleware } from '@commercetools/sdk-middleware-correlation-id';

// NOTE we should not use these directly but rather have them passed in from
// the application
const userAgentMiddleware = createSdkUserAgentMiddleware({
  libraryName: 'merchant-center-frontend',
  libraryVersion: '1.0.0',
  contactUrl: 'https://mc.commercetools.com',
  contactEmail: 'mc@commercetools.com',
});

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
      userAgentMiddleware,
      httpMiddleware,
    ],
  });

export default createClient;
