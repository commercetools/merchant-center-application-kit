import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';
import type { ApplicationRuntimeConfig, CloudIdentifier } from './types';

// Loads the configuration file and parse the environment and header values.
// Most of the resulting values are inferred from the config.
import fs from 'fs';
import omitEmpty from 'omit-empty-es';
import loadConfig from './load-config';
import validateConfig from './validate-config';
import {
  mapCloudIdentifierToApiUrl,
  getUniqueValues,
  getIsProd,
  getOrThrow,
} from './utils';
import substituteVariablePlaceholders from './substitute-variable-placeholders';

type ProcessConfigOptions = {
  // Options useful for testing
  disableCache?: boolean;
  processEnv?: NodeJS.ProcessEnv;
  applicationPath?: string;
  configJson?: JSONSchemaForCustomApplicationConfigurationFiles | undefined;
};

// TODO: make it configurable.
const developmentPort = 3001;
const developmentAppUrl = `http://localhost:${developmentPort}`;

const omitDevConfigIfEmpty = (
  devConfig: ApplicationRuntimeConfig['env']['__DEVELOPMENT__']
) => {
  if (
    // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
    devConfig?.accountLinks ||
    devConfig?.menuLinks ||
    devConfig?.oidc
  )
    return devConfig;
  return undefined;
};

// Keep a reference to the config so that requiring the module
// again will result in returning the cached value.
let cachedConfig: ApplicationRuntimeConfig;

const processConfig = ({
  disableCache = false,
  processEnv = process.env,
  applicationPath = fs.realpathSync(process.cwd()),
}: ProcessConfigOptions = {}): ApplicationRuntimeConfig => {
  if (cachedConfig && !disableCache) return cachedConfig;

  const appEnvKey =
    processEnv.MC_APP_ENV ?? processEnv.NODE_ENV ?? 'development';
  const isProd = getIsProd(processEnv);

  const loadedAppConfig = loadConfig(applicationPath);
  validateConfig(loadedAppConfig);
  const validatedLoadedAppConfig =
    loadedAppConfig as JSONSchemaForCustomApplicationConfigurationFiles;

  const appConfig =
    substituteVariablePlaceholders<JSONSchemaForCustomApplicationConfigurationFiles>(
      validatedLoadedAppConfig,
      { processEnv, applicationPath }
    );

  const additionalAppEnv = appConfig.additionalEnv ?? {};
  const revision = (additionalAppEnv.revision as string) ?? '';

  // Feature flags
  const isOidcForDevelopmentEnabled = Boolean(
    JSON.parse(processEnv.ENABLE_OIDC_FOR_DEVELOPMENT || 'false')
  );

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
        // Use `||` instead of `??` to include empty string values.
        appConfig.mcApiUrl ||
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

  const developmentConfig: ApplicationRuntimeConfig['env']['__DEVELOPMENT__'] =
    isProd
      ? undefined
      : omitDevConfigIfEmpty({
          oidc: isOidcForDevelopmentEnabled
            ? omitEmpty({
                authorizeUrl: [
                  // In case the MC API url points to localhost, we need to point
                  // to a local running dev login page to handle the workflow properly.
                  mcApiUrl.hostname === 'localhost'
                    ? mcApiUrl.origin.replace(
                        mcApiUrl.port,
                        String(developmentPort)
                      )
                    : mcApiUrl.origin.replace('mc-api', 'mc'),
                  '/login/authorize',
                ].join(''),
                initialProjectKey: appConfig.env.development?.initialProjectKey,
                teamId: appConfig.env.development?.teamId,
                oAuthScopes: appConfig.oAuthScopes,
              })
            : undefined,
          menuLinks: appConfig.menuLinks,
          // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
          accountLinks: appConfig.accountLinks,
        });

  cachedConfig = {
    env: {
      ...omitEmpty(additionalAppEnv),
      // TODO: how else should we provide the app identifier?
      applicationId,
      applicationName: appConfig.name,
      entryPointUriPath: appConfig.entryPointUriPath,
      ...(isProd || !developmentConfig
        ? {}
        : { __DEVELOPMENT__: developmentConfig }),
      cdnUrl: cdnUrl.href,
      env: appEnvKey,
      frontendHost: appUrl.host,
      location: appConfig.cloudIdentifier,
      mcApiUrl: mcApiUrl.origin,
      revision,
      servedByProxy: isProd,
      availableLocales: appConfig.availableLocales,
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
