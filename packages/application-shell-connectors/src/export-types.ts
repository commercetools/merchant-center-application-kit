import type {
  TProviderProps as ProviderProps,
  TApplicationContext as ApplicationContext,
  TNormalizedMenuVisibilities as NormalizedMenuVisibilities,
  TNormalizedPermissions as NormalizedPermissions,
  TNormalizedActionRights as NormalizedActionRights,
  TNormalizedDataFences as NormalizedDataFences,
} from './components/application-context';
import type {
  TCustomViewContextProviderProps as CustomViewContextProviderProps,
  TCustomViewContext as CustomViewContext,
} from './components/custom-view-context';
import type { TImageRegexContext as ImageRegexContext } from './components/project-extension-image-regex';
import type { TApolloContext as ApolloContext } from './utils/apollo-context';
import type {
  TFetcher,
  TFetcherResponse,
  THeaders,
  TConfig,
  TOptions,
  TForwardToAudiencePolicy as ForwardToAudiencePolicy,
} from './utils/http-client';

export type TProviderProps<AdditionalEnvironmentProperties extends {}> =
  ProviderProps<AdditionalEnvironmentProperties>;
export type TApplicationContext<AdditionalEnvironmentProperties extends {}> =
  ApplicationContext<AdditionalEnvironmentProperties>;

export type TNormalizedMenuVisibilities = NormalizedMenuVisibilities;
export type TNormalizedPermissions = NormalizedPermissions;
export type TNormalizedActionRights = NormalizedActionRights;
export type TNormalizedDataFences = NormalizedDataFences;

export type TCustomViewContextProviderProps = CustomViewContextProviderProps;
export type TCustomViewContext = CustomViewContext;

export type TImageRegexContext = ImageRegexContext;

export type TApolloContext = ApolloContext;
export type TForwardToAudiencePolicy = ForwardToAudiencePolicy;

export type THttpClientFetcher<Data> = TFetcher<Data>;
export type THttpClientFetcherResponse<Data> = TFetcherResponse<Data>;
export type THttpClientHeaders = THeaders;
export type THttpClientConfig = TConfig;
export type THttpClientOptions = TOptions;
