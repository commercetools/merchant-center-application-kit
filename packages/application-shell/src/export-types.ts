// Re-export types for backwards compatibility
import type {
  TApolloContext as ApolloContext,
  THttpClientFetcher as TFetcher,
  THttpClientFetcherResponse as TFetcherResponse,
  THttpClientHeaders as THeaders,
  THttpClientConfig as TConfig,
  THttpClientOptions as TOptions,
  TForwardToAudiencePolicy as ForwardToAudiencePolicy,
} from '@commercetools-frontend/application-shell-connectors';

export type TApolloContext = ApolloContext;
export type TForwardToAudiencePolicy = ForwardToAudiencePolicy;

export type THttpClientFetcher<Data> = TFetcher<Data>;
export type THttpClientFetcherResponse<Data> = TFetcherResponse<Data>;
export type THttpClientHeaders = THeaders;
export type THttpClientConfig = TConfig;
export type THttpClientOptions = TOptions;
