export { default as version } from './version';
export * from './export-types';

export {
  Context,
  ApplicationContext,
  ApplicationContextProvider,
  withApplicationContext,
  useApplicationContext,
  normalizeAllAppliedActionRights,
  normalizeAllAppliedDataFences,
  normalizeAllAppliedMenuVisibilities,
  normalizeAllAppliedPermissions,
} from './components/application-context';

export {
  CustomViewContextProvider,
  useCustomViewContext,
} from './components/custom-view-context';

export {
  GetProjectExtensionImageRegex,
  ProjectExtensionProviderForImageRegex,
  withProjectExtensionImageRegex,
  useProjectExtensionImageRegex,
} from './components/project-extension-image-regex';

export { default as createApolloClient } from './configure-apollo';
export {
  getCorrelationId,
  getMcApiUrl,
  isLoggerEnabled,
  logger,
  selectUserId,
  selectProjectKeyFromUrl,
  selectTeamIdFromStorage,
  createApolloContextForProxyForwardTo,
} from './utils';
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
export * as oidcStorage from './utils/oidc-storage';
export {
  setCachedApolloClient,
  getCachedApolloClient,
} from './utils/apollo-client-runtime-cache';

export { default as useAiQuery } from './hooks/use-ai-query';
