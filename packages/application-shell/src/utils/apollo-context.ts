import type { TGraphQLTargets } from '@commercetools-frontend/constants';

import getMcApiUrl from './get-mc-api-url';

export type THeaders = Record<string, string>;

export type TForwardToAudiencePolicy =
  | 'forward-url-full-path'
  | 'forward-url-origin';

export type TApolloContext = {
  uri?: string;
  headers?: THeaders;
  forwardToConfig?: {
    version: string;
    uri: string;
    headers?: THeaders;
    audiencePolicy: TForwardToAudiencePolicy;
  };
  skipGraphQlTargetCheck?: boolean;
  skipTokenRetry?: boolean;
  target?: TGraphQLTargets;
  projectKey?: string;
  teamId?: string;
  featureFlag?: string;
};

type TApolloContextProxyForwardTo = {
  // The GraphQL endpoint of the external server
  uri: string;
  headers?: THeaders;
  audiencePolicy?: TForwardToAudiencePolicy;
};

const createApolloContextForProxyForwardTo = (
  proxyForwardTocontext: TApolloContextProxyForwardTo
): TApolloContext => ({
  // Send the request to the forward-to endpoint.
  uri: `${getMcApiUrl()}/proxy/forward-to`,
  // Custom properties to be used by the "header-link".
  forwardToConfig: {
    version: 'v2',
    uri: proxyForwardTocontext.uri,
    headers: proxyForwardTocontext.headers,
    audiencePolicy:
      proxyForwardTocontext.audiencePolicy || 'forward-url-full-path',
  },
  skipGraphQlTargetCheck: true,
});

export { createApolloContextForProxyForwardTo };
