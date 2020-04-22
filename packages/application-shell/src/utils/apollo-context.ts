import getMcApiUrl from './get-mc-api-url';

export type TApolloContext = {
  uri?: string;
  headers?: { [key: string]: string };
  skipGraphQlTargetCheck?: boolean;
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
  headers: {
    'Accept-version': 'v2',
    'X-Forward-To': context.uri,
  },
  skipGraphQlTargetCheck: true,
});

export { createApolloContextForProxyForwardTo };
