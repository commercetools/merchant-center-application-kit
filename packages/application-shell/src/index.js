/**
 * THIS IS THE MODULE ENTRY POINT!
 */
import './public-path';

export { default as ApplicationShell } from './components/application-shell';
export { default as apolloClient } from './configure-apollo';
export { applyDefaultMiddlewares } from './configure-store';
export { default as MeasureFirstPaint } from './components/performance-timing';
export { default as InjectReducers } from './components/inject-reducers';
export {
  DeprecatedFetchUser as FetchUser,
  deprecatedWithUser as withUser,
} from './components/fetch-user';
export {
  DeprecatedFetchProject as FetchProject,
  deprecatedWithProject as withProject,
} from './components/fetch-project';
export { default as RouteCatchAll } from './components/route-catch-all';
export {
  default as setupGlobalErrorListener,
} from './utils/setup-global-error-listener';
export { selectUserId, selectProjectKeyFromUrl } from './utils';
export { default as AsyncChunkLoader } from './components/async-chunk-loader';
export { GetGtmTracking, withGtmTracking } from './components/gtm-booter';

/**
 * NOTE:
 *    These are library re-exports which are shared between app-kit and
 *    MC apps. Not having them re-exported here often leads to bundling
 *    them twice given app-kit and any MC app require different versions.
 *    Something they never should anyways and causes breakage.
 *
 *    More information can be found here: https://github.com/commercetools/fe-chapter-notes/issues/61
 */
export * from '@flopflip/react-broadcast';
