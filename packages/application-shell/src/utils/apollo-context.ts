import type { TGraphQLTargets } from '@commercetools-frontend/constants';
import type { THeaders, TForwardToConfig } from './http-client';
import { getMcApiUrl } from '@commercetools-frontend/application-shell-connectors';

export type TApolloContext = {
  uri?: string;
  headers?: THeaders;
  forwardToConfig?: TForwardToConfig;
  skipGraphQlTargetCheck?: boolean;
  skipTokenRetry?: boolean;
  target?: TGraphQLTargets;
  projectKey?: string;
  teamId?: string;
  featureFlag?: string;
};

const createApolloContextForProxyForwardTo = (
  proxyForwardTocontext: TForwardToConfig
): TApolloContext => ({
  // Send the request to the forward-to endpoint.
  uri: `${getMcApiUrl()}/proxy/forward-to`,
  // Custom properties to be used by the "header-link".
  forwardToConfig: proxyForwardTocontext,
  skipGraphQlTargetCheck: true,
});

export { createApolloContextForProxyForwardTo };
