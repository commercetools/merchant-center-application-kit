export { default as version } from './version';
import {
  TProviderProps as ProviderProps,
  TApplicationContext as ApplicationContext,
} from './components/application-context';

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
} from './components/application-context';

export {
  GetProjectExtensionImageRegex,
  ProjectExtensionProviderForImageRegex,
  withProjectExtensionImageRegex,
} from './components/project-extension-image-regex';
