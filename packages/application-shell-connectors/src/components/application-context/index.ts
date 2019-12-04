import { ProviderProps } from './application-context';

export type TProviderProps<
  AdditionalEnvironmentProperties extends {}
> = ProviderProps<AdditionalEnvironmentProperties>;

export {
  Context,
  ApplicationContext,
  ApplicationContextProvider,
  withApplicationContext,
  useApplicationContext,
} from './application-context';
