// Loads the configuration file and parse the environment and header values.
// Most of the resulting values are inferred from the config.
import loadConfig from './load-config';
import validate from './validate';
import { mapCloudIdentifierToApiUrl, getUniqueValues } from './utils';
import substituteEnvVariablePlaceholders from './substitute-env-variable-placeholders';

const appEnvKey = process.env.MC_APP_ENV || process.env.NODE_ENV;
const isProd = process.env.MC_APP_ENV
  ? process.env.MC_APP_ENV === 'production'
  : process.env.NODE_ENV === 'production';

const developmentConfig = {
  url: 'http://localhost:3001',
};

// Keep a reference to the config so that requiring the module
// again will result in returning the cached value.
let cachedConfig;

const buildConfig = async ({ disableCache = false } = {}) => {
  if (cachedConfig && !disableCache) return cachedConfig;

  // TODO: handle legacy configs for backwards compatibility

  const rawAppConfig = loadConfig();
  await validate(rawAppConfig);

  const appConfig = substituteEnvVariablePlaceholders(rawAppConfig);

  const appEnvConfig = appConfig.env[appEnvKey] || developmentConfig;

  // Parse all the supported URLs, which gets implicitly validated
  const appUrl = new URL(appEnvConfig.url);
  const cdnUrl = new URL(appEnvConfig.cdnUrl || appUrl.origin);
  const mcApiUrl = new URL(
    appConfig.mcApiUrl || mapCloudIdentifierToApiUrl(appConfig.cloudIdentifier)
  );
  const headers = appConfig.headers || {};
  const csp = headers.csp || {};

  cachedConfig = {
    env: {
      applicationId: appConfig.id,
      applicationName: appConfig.name,
      frontendHost: appUrl.hostname,
      cdnUrl: cdnUrl.origin,
      env: appEnvKey,
      location: appConfig.cloudIdentifier,
      mcApiUrl: mcApiUrl.origin,
      servedByProxy: isProd,
      ...(appEnvConfig.additionalEnvironment || {}),
    },
    headers: {
      ...headers,
      csp: {
        ...csp,
        'connect-src': getUniqueValues(csp['connect-src'], [
          mcApiUrl.hostname,
          isProd && appUrl.hostname,
        ]),
        'script-src': getUniqueValues(csp['script-src'], [
          isProd && appUrl.hostname,
        ]),
        'style-src': getUniqueValues(csp['style-src'], [
          isProd && appUrl.hostname,
        ]),
      },
    },
  };

  return cachedConfig;
};

export default buildConfig;
