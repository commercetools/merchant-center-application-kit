import getMcApiUrl from './get-mc-api-url';

export type TApolloContext = {
  uri?: string;
  forwardToConfig?: { version: string; uri: string };
  skipGraphQlTargetCheck?: boolean;
  headers?: { [key: string]: string };
  skipTokenRetry?: boolean;
};

type TApolloContextProxyForwardTo = {
  // The GraphQL endpoint of the external server
  uri: string;
};

const createApolloContextForProxyForwardTo = (
  context: TApolloContextProxyForwardTo
): TApolloContext => ({
  // Send the request to the forward-to endpoint.
  uri: `${getMcApiUrl()}/proxy/forward-to`,
  // Custom properties to be used by the "header-link".
  forwardToConfig: {
    version: 'v2',
    uri: context.uri,
  },
  skipGraphQlTargetCheck: true,
});

export { createApolloContextForProxyForwardTo };
