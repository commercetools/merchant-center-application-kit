import type {
  TApolloContext as ApolloContext,
  TForwardToAudiencePolicy as ForwardToAudiencePolicy,
} from './utils/apollo-context';
import type {
  TFetcher,
  TFetcherResponse,
  THeaders,
  TConfig,
  TOptions,
} from './utils/http-client';

export type TApolloContext = ApolloContext;
export type TForwardToAudiencePolicy = ForwardToAudiencePolicy;

export type THttpClientFetcher<Data> = TFetcher<Data>;
export type THttpClientFetcherResponse<Data> = TFetcherResponse<Data>;
export type THttpClientHeaders = THeaders;
export type THttpClientConfig = TConfig;
export type THttpClientOptions = TOptions;
