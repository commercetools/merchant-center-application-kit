export * from './export-types';
export { default as version } from './version';
export { default as ApplicationShell } from './components/application-shell';
export { default as ApplicationShellProvider } from './components/application-shell-provider';
export { default as ApplicationPageTitle } from './components/application-page-title';
export { default as createApolloClient } from './configure-apollo';
export { applyDefaultMiddlewares } from './configure-store';
export { default as InjectReducers } from './components/inject-reducers';
export { default as RouteCatchAll } from './components/route-catch-all';
export { default as setupGlobalErrorListener } from './utils/setup-global-error-listener';
export {
  getMcApiUrl,
  selectUserId,
  selectProjectKeyFromUrl,
  createApolloContextForProxyForwardTo,
} from './utils';
export { GtmContext } from './components/gtm-booter';
export { default as GtmUserLogoutTracker } from './components/gtm-user-logout-tracker';
export { default as SetupFlopFlipProvider } from './components/setup-flop-flip-provider';
export { default as ConfigureIntlProvider } from './components/configure-intl-provider';
export { default as SuspendedRoute } from './components/suspended-route';
export {
  useMcQuery,
  useMcLazyQuery,
  useMcMutation,
} from './hooks/apollo-hooks';
export {
  buildApiUrl,
  createHttpClientOptions,
  executeHttpClientRequest,
} from './utils/http-client';

export {
  entryPointUriPathToPermissionKeys,
  entryPointUriPathToResourceAccesses,
} from '@commercetools-frontend/application-config/ssr';

/**
 * NOTE:
 *    These are library re-exports which are shared between app-kit and
 *    MC apps. Not having them re-exported here often leads to bundling
 *    them twice given app-kit and any MC app require different versions.
 *    Something they never should anyways and causes breakage.
 *
 *    More information can be found here: https://github.com/commercetools/fe-chapter-notes/issues/61
 */
export {
  // NOTE: do not re-export the `version` field, otherwise it will break the bundle as it conflicts
  // with our own exported `version` field.
  //    TypeError: Cannot set property version of [object Object] which has only a getter
  ToggleFeature,
  injectFeatureToggle,
  injectFeatureToggles,
  branchOnFeatureToggle,
  ConfigureFlopFlip,
  ReconfigureFlopFlip,
  useFeatureToggle,
  useFeatureToggles,
  useFlagVariation,
  useFlagVariations,
  useAdapterStatus,
  useAdapterReconfiguration,
} from '@flopflip/react-broadcast';

export { default as ldAdapter } from '@flopflip/launchdarkly-adapter';
