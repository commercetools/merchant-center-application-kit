import uuid from 'uuid/v4';
import { createClient } from '@commercetools/sdk-client';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createUserAgentMiddleware } from '@commercetools/sdk-middleware-user-agent';
import { createCorrelationIdMiddleware } from '@commercetools/sdk-middleware-correlation-id';
import { selectProjectKey } from '../utils';

// NOTE we should not use these directly but rather have them passed in from
// the application
const userAgentMiddleware = createUserAgentMiddleware({
  libraryName: 'merchant-center-frontend',
  libraryVersion: '1.0.0',
  contactUrl: 'https://mc.commercetools.com',
  contactEmail: 'mc@commercetools.com',
});

// NOTE we should not use these directly but rather have them passed in from
// the application
const httpMiddleware = createHttpMiddleware({
  host: window.app.mcApiUrl,
  includeResponseHeaders: true,
  credentialsMode: 'include',
});

const correlationIdMiddleware = createCorrelationIdMiddleware({
  // NOTE: Not all properties are set when performing requests (e.g. /token)
  // does not yet have a `projectKey`. Hence, we filter out the holes of the
  // array.
  generate: () => ['mc', selectProjectKey(), uuid()].filter(Boolean).join('/'),
});

const client = createClient({
  middlewares: [correlationIdMiddleware, userAgentMiddleware, httpMiddleware],
});

export default client;
