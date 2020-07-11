import type {
  ApplicationConfig,
  ApplicationConfigResult,
  CloudIdentifier,
} from './types';

// Loads the configuration file and parse the environment and header values.
// Most of the resulting values are inferred from the config.
import loadConfig from './load-config';
import validateConfig from './validate-config';
import { mapCloudIdentifierToApiUrl, getUniqueValues } from './utils';
import substituteEnvVariablePlaceholders from './substitute-env-variable-placeholders';

const developmentConfig: ApplicationConfig['env']['production'] = {
  url: 'http://localhost:3001',
};

// Keep a reference to the config so that requiring the module
// again will result in returning the cached value.
let cachedConfig: ApplicationConfigResult;

const processConfig = async ({
  disableCache = false,
}: { disableCache?: boolean } = {}): Promise<ApplicationConfigResult> => {
  if (cachedConfig && !disableCache) return cachedConfig;

  // TODO: validate that the env key is either prod or dev
  const appEnvKey =
    process.env.MC_APP_ENV ?? process.env.NODE_ENV ?? 'development';
  const isProd = process.env.MC_APP_ENV
    ? process.env.MC_APP_ENV === 'production'
    : process.env.NODE_ENV === 'production';

  // TODO: handle legacy configs for backwards compatibility

  const rawAppConfig = loadConfig();
  await validateConfig(rawAppConfig);
  const validatedRawAppConfig = rawAppConfig as ApplicationConfig;

  const appConfig = substituteEnvVariablePlaceholders<ApplicationConfig>(
    validatedRawAppConfig
  );

  const appEnvConfig = isProd ? appConfig.env.production : developmentConfig;

  // Parse all the supported URLs, which gets implicitly validated
  const appUrl = new URL(appEnvConfig.url);
  const cdnUrl = new URL(appEnvConfig.cdnUrl || appUrl.origin);
  const mcApiUrl = new URL(
    appConfig.mcApiUrl ??
      mapCloudIdentifierToApiUrl(
        appConfig.cloudIdentifier as CloudIdentifier
      ) ??
      'invalid url, this will throw'
  );

  cachedConfig = {
    env: {
      ...(appConfig.additionalEnv || {}),
      applicationId: appConfig.id,
      applicationName: appConfig.name,
      cdnUrl: cdnUrl.origin,
      env: appEnvKey,
      frontendHost: appUrl.host,
      location: appConfig.cloudIdentifier,
      mcApiUrl: mcApiUrl.origin,
      revision: '', // TODO
      servedByProxy: isProd,
    },
    headers: {
      ...appConfig.headers,
      csp: {
        ...appConfig.headers?.csp,
        'connect-src': getUniqueValues(
          appConfig.headers?.csp['connect-src'],
          [mcApiUrl.hostname].concat(isProd ? appUrl.hostname : [])
        ),
        'script-src': getUniqueValues(
          appConfig.headers?.csp['script-src'],
          isProd ? [appUrl.hostname] : []
        ),
        'style-src': getUniqueValues(
          appConfig.headers?.csp['style-src'],
          isProd ? [appUrl.hostname] : []
        ),
      },
    },
  };

  return cachedConfig;
};

export default processConfig;
