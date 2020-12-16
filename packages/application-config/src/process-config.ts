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

const developmentAppUrl = 'http://localhost:3001';

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

  const envCdnUrl = appConfig.env.production.cdnUrl ?? appUrl.href;
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
  let applicationId:
    | string
    | undefined = `__local:${appConfig.entryPointUriPath}`;
  if (isProd) {
    if (appConfig.env.production.applicationId) {
      applicationId = `${appConfig.env.production.applicationId}:${appConfig.entryPointUriPath}`;
    } else {
      // As long as we don't require the applicationId in production, we should
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
            __DEVELOPMENT__: {
              authorizeUrl: `${mcApiUrl.protocol}//${mcApiUrl.host.replace(
                'mc-api',
                'mc'
              )}`,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              projectKey: appConfig.env.development!.projectKey,
              scope: [
                // This is required as per OIDC spec.
                'openid',
                // Custom claims
                `project_key:${appConfig.env.development?.projectKey}`,
                ...(appConfig.permissions?.view || []).map(
                  (scope) => `view:${scope}`
                ),
                ...(appConfig.permissions?.manage || []).map(
                  (scope) => `manage:${scope}`
                ),
              ].join(' '),
            },
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
