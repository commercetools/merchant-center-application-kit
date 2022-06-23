import type {
  TProviderProps as ProviderProps,
  TApplicationContext as ApplicationContext,
  TNormalizedMenuVisibilities as NormalizedMenuVisibilities,
  TNormalizedPermissions as NormalizedPermissions,
  TNormalizedActionRights as NormalizedActionRights,
  TNormalizedDataFences as NormalizedDataFences,
} from './components/application-context';
import type { TImageRegexContext as ImageRegexContext } from './components/project-extension-image-regex';

export type TProviderProps<AdditionalEnvironmentProperties extends {}> =
  ProviderProps<AdditionalEnvironmentProperties>;
export type TApplicationContext<AdditionalEnvironmentProperties extends {}> =
  ApplicationContext<AdditionalEnvironmentProperties>;

export type TNormalizedMenuVisibilities = NormalizedMenuVisibilities;
export type TNormalizedPermissions = NormalizedPermissions;
export type TNormalizedActionRights = NormalizedActionRights;
export type TNormalizedDataFences = NormalizedDataFences;

export type TImageRegexContext = ImageRegexContext;
