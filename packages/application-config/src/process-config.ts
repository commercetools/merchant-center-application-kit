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
  configJson?: JSONSchemaForCustomApplicationConfigurationFiles | undefined;
};

const developmentAppUrl = 'http://localhost:3001';

// Keep a reference to the config so that requiring the module
// again will result in returning the cached value.
let cachedConfig: ApplicationConfig;

const processConfig = ({
  disableCache = false,
  processEnv = process.env,
  configJson,
}: ProcessConfigOptions = {}): ApplicationConfig => {
  if (cachedConfig && !disableCache) return cachedConfig;

  const appEnvKey =
    processEnv.MC_APP_ENV ?? processEnv.NODE_ENV ?? 'development';
  const isProd = getIsProd(processEnv);

  const loadedAppConfig = configJson ?? loadConfig();
  validateConfig(loadedAppConfig);
  const validatedLoadedAppConfig = loadedAppConfig as JSONSchemaForCustomApplicationConfigurationFiles;

  const appConfig = substituteEnvVariablePlaceholders<JSONSchemaForCustomApplicationConfigurationFiles>(
    validatedLoadedAppConfig,
    { processEnv }
  );
  const additionalAppEnv = appConfig.additionalEnv ?? {};
  const revision = (additionalAppEnv.revision as string) ?? '';

  // Feature flags
  const isOidcForDevelopmentEnabled =
    processEnv.ENABLE_OIDC_FOR_DEVELOPMENT === 'true' ||
    // @ts-expect-error
    processEnv.ENABLE_OIDC_FOR_DEVELOPMENT === true;

  // Parse all the supported URLs, which gets implicitly validated

  const envAppUrl = isProd ? appConfig.env.production.url : developmentAppUrl;
  const appUrl = getOrThrow(
    () => new URL(envAppUrl),
    `Invalid application URL: "${envAppUrl}"`
  );

  // Use `||` instead of `??` to include empty string values.
  const envCdnUrl = isProd
    ? appConfig.env.production.cdnUrl || appUrl.href
    : developmentAppUrl;
  const cdnUrl = getOrThrow(
    () => new URL(envCdnUrl),
    `Invalid application CDN URL: "${envCdnUrl}"`
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

  // The real application ID is only used in production.
  // In development, we prefix the entry point with the "__local" prefix.
  // This is important to determine to which URL the MC should redirect to
  // after successful login.
  let applicationId: string | undefined = isOidcForDevelopmentEnabled
    ? `__local:${appConfig.entryPointUriPath}`
    : undefined;
  if (isProd) {
    // TODO: decide if we do require the application ID or not.
    if (appConfig.env.production.applicationId) {
      applicationId = `${appConfig.env.production.applicationId}:${appConfig.entryPointUriPath}`;
    } else {
      // As long as we don't require the application ID in production, we should
      // fall back to unset the value.
      applicationId = undefined;
    }
  }

  cachedConfig = {
    env: {
      ...omitEmpty(additionalAppEnv),
      // TODO: how else should we provide the app identifier?
      applicationId,
      applicationName: appConfig.name,
      entryPointUriPath: appConfig.entryPointUriPath,
      ...(!isProd && isOidcForDevelopmentEnabled
        ? {
            __DEVELOPMENT__: omitEmpty({
              authorizeUrl: `${mcApiUrl.protocol}//${mcApiUrl.host.replace(
                'mc-api',
                'mc'
              )}`,
              initialProjectKey: appConfig.env.development?.initialProjectKey,
              teamId: appConfig.env.development?.teamId,
              permissions: appConfig.permissions,
            }),
          }
        : {}),
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
