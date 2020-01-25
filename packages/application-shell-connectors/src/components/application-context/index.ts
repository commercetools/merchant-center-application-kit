import {
  ProviderProps,
  TApplicationContext as ApplicationContext,
} from './application-context';

export type TProviderProps<
  AdditionalEnvironmentProperties extends {}
> = ProviderProps<AdditionalEnvironmentProperties>;
export type TApplicationContext<
  AdditionalEnvironmentProperties extends {}
> = ApplicationContext<AdditionalEnvironmentProperties>;

export {
  Context,
  ApplicationContext,
  ApplicationContextProvider,
  withApplicationContext,
  useApplicationContext,
} from './application-context';
