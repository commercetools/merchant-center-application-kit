import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';

// Extra options passed to the application config that are only used internally.
export type TCustomApplicationRuntimeConfig = ApplicationRuntimeConfig<{
  disableAuthRoutesOfDevServer?: boolean;
}>;
