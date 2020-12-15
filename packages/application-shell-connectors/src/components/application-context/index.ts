import type {
  ProviderProps,
  TApplicationContext as ApplicationContext,
} from './application-context';
import type {
  TMenuVisibilities as NormalizedMenuVisibilities,
  TPermissions as NormalizedPermissions,
  TActionRights as NormalizedActionRights,
  TDataFences as NormalizedDataFences,
} from './normalizers';

export type TProviderProps<
  AdditionalEnvironmentProperties extends {}
> = ProviderProps<AdditionalEnvironmentProperties>;
export type TApplicationContext<
  AdditionalEnvironmentProperties extends {}
> = ApplicationContext<AdditionalEnvironmentProperties>;

export type TNormalizedMenuVisibilities = NormalizedMenuVisibilities;
export type TNormalizedPermissions = NormalizedPermissions;
export type TNormalizedActionRights = NormalizedActionRights;
export type TNormalizedDataFences = NormalizedDataFences;

export {
  Context,
  ApplicationContext,
  ApplicationContextProvider,
  withApplicationContext,
  useApplicationContext,
} from './application-context';
export {
  normalizeAllAppliedActionRights,
  normalizeAllAppliedDataFences,
  normalizeAllAppliedMenuVisibilities,
  normalizeAllAppliedPermissions,
} from './normalizers';
