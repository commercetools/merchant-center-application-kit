/**
 * https://emotion.sh/docs/emotion-11#css-prop-types
 *
 * However, if you are stuck with older version of TypeScript or using the
 * classic runtime implicitly by using our `@emotion/babel-preset-css-prop`
 * then it’s not possible to leverage `css` prop support being added conditionally
 * based on a type of rendered component.
 * For those cases we have added a special file that can be imported once
 * to add support for the `css` prop globally, for all components.
 *
 * TODO: remove this once we switch to automatic jsx runtime
 */
/// <reference types="@emotion/react/types/css-prop" />

export { default as ApplicationShell } from './components/application-shell';
export { default as ApplicationShellProvider } from './components/application-shell-provider';
export { default as createApolloClient } from './configure-apollo';
export { applyDefaultMiddlewares } from './configure-store';
export { default as InjectReducers } from './components/inject-reducers';
export { default as RouteCatchAll } from './components/route-catch-all';
export { default as setupGlobalErrorListener } from './utils/setup-global-error-listener';
export {
  selectUserId,
  selectProjectKeyFromUrl,
  createApolloContextForProxyForwardTo,
} from './utils';
export { GtmContext } from './components/gtm-booter';
export { default as GtmUserLogoutTracker } from './components/gtm-user-logout-tracker';
export { default as SetupFlopFlipProvider } from './components/setup-flop-flip-provider';
export { default as version } from './version';
export {
  useMcQuery,
  useMcLazyQuery,
  useMcMutation,
} from './hooks/apollo-hooks';

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
  useAdapterStatus,
  useAdapterReconfiguration,
} from '@flopflip/react-broadcast';

export { default as ldAdapter } from '@flopflip/launchdarkly-adapter';
