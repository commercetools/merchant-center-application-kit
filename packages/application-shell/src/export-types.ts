import type { TApolloContext as ApolloContext } from './utils/apollo-context';
import type {
  TFetcher,
  TFetcherResponse,
  THeaders,
  TConfig,
  TOptions,
  TForwardToAudiencePolicy as ForwardToAudiencePolicy,
} from './utils/http-client';

export type TApolloContext = ApolloContext;
export type TForwardToAudiencePolicy = ForwardToAudiencePolicy;

export type THttpClientFetcher<Data> = TFetcher<Data>;
export type THttpClientFetcherResponse<Data> = TFetcherResponse<Data>;
export type THttpClientHeaders = THeaders;
export type THttpClientConfig = TConfig;
export type THttpClientOptions = TOptions;

export {
  type TCustomView,
  type TCustomViewTypeSettings,
  TCustomViewSize,
  TCustomViewType,
  TCustomViewStatus,
} from './types/generated/settings';
