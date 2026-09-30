import { getConfigPath } from '@commercetools-frontend/application-config';

/**
 * Whether the app being built is a Custom View rather than a Custom
 * Application.
 *
 * Decided from which configuration file is present, which is the same signal
 * `processConfig` itself branches on. `getConfigPath` only resolves the file's
 * path — it does not read env vars or process the config — so this stays cheap
 * enough for a build-time decision. `loadConfig` rejects a project carrying
 * both files, so the two cases cannot overlap.
 *
 * Fails open: anything unexpected (no config found, a resolution error)
 * answers `false`, so a detection gap leaves Custom Application behaviour
 * intact rather than silently dropping an optimisation from a real app.
 */
const isCustomView = async (): Promise<boolean> => {
  try {
    const configPath = await getConfigPath();
    return configPath?.includes('custom-view-config') ?? false;
  } catch {
    return false;
  }
};

export default isCustomView;
