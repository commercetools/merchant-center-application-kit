import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';
import type { ApplicationConfig, CloudIdentifier } from './types';

// Loads the configuration file and parse the environment and header values.
// Most of the resulting values are inferred from the config.
import omitEmpty from 'omit-empty-es';
import loadConfig from './load-config';
import validateConfig from './validate-config';
import {
  mapCloudIdentifierToApiUrl,
  getUniqueValues,
  getIsProd,
  getOrThrow,
} from './utils';
import substituteEnvVariablePlaceholders from './substitute-env-variable-placeholders';

type ProcessConfigOptions = {
  // Options useful for testing
  disableCache?: boolean;
  processEnv?: NodeJS.ProcessEnv;
};

const developmentConfig: JSONSchemaForCustomApplicationConfigurationFiles['env']['production'] = {
  url: 'http://localhost:3001',
};

// Keep a reference to the config so that requiring the module
// again will result in returning the cached value.
let cachedConfig: ApplicationConfig;

const processConfig = ({
  disableCache = false,
  processEnv = process.env,
}: ProcessConfigOptions = {}): ApplicationConfig => {
  if (cachedConfig && !disableCache) return cachedConfig;

  const appEnvKey =
    processEnv.MC_APP_ENV ?? processEnv.NODE_ENV ?? 'development';
  const isProd = getIsProd(processEnv);

  const loadedAppConfig = loadConfig();
  validateConfig(loadedAppConfig);
  const validatedLoadedAppConfig = loadedAppConfig as JSONSchemaForCustomApplicationConfigurationFiles;

  const appConfig = substituteEnvVariablePlaceholders<JSONSchemaForCustomApplicationConfigurationFiles>(
    validatedLoadedAppConfig,
    { processEnv }
  );
  const additionalAppEnv = appConfig.additionalEnv ?? {};
  const revision = (additionalAppEnv.revision as string) ?? '';

  const appEnvConfig = isProd ? appConfig.env.production : developmentConfig;
  // Parse all the supported URLs, which gets implicitly validated
  const appUrl = getOrThrow(
    () => new URL(appEnvConfig.url),
    `Invalid application URL: "${appEnvConfig.url}"`
  );
  const cdnUrl = getOrThrow(
    () => new URL(appEnvConfig.cdnUrl || appUrl.href),
    `Invalid application CDN URL: "${appEnvConfig.cdnUrl || appUrl.href}"`
  );
  const mcApiUrl = getOrThrow(
    () =>
      new URL(
        appConfig.mcApiUrl ??
          mapCloudIdentifierToApiUrl(
            appConfig.cloudIdentifier as CloudIdentifier
          )
      ),
    `Invalid MC API URL: "${appConfig.mcApiUrl}"`
  );
  // TODO: make the `id` required once we release the new model.
  const applicationId =
    appConfig.id && appConfig.entryPointUriPath
      ? `${appConfig.id}:${appConfig.entryPointUriPath}`
      : undefined;

  cachedConfig = {
    env: {
      ...omitEmpty(additionalAppEnv),
      ...(applicationId ? { applicationId } : {}),
      applicationName: appConfig.name,
      cdnUrl: cdnUrl.href,
      env: appEnvKey,
      frontendHost: appUrl.host,
      location: appConfig.cloudIdentifier,
      mcApiUrl: mcApiUrl.origin,
      revision,
      servedByProxy: isProd,
    },
    headers: {
      ...appConfig.headers,
      csp: {
        ...appConfig.headers?.csp,
        'connect-src': getUniqueValues(
          appConfig.headers?.csp['connect-src'],
          [mcApiUrl.origin].concat(isProd ? [appUrl.href] : [])
        ),
        'script-src': getUniqueValues(
          appConfig.headers?.csp['script-src'],
          isProd ? [appUrl.href, cdnUrl.href] : []
        ),
        'style-src': getUniqueValues(
          appConfig.headers?.csp['style-src'],
          isProd ? [appUrl.href, cdnUrl.href] : []
        ),
      },
    },
  };

  return cachedConfig;
};

export default processConfig;
