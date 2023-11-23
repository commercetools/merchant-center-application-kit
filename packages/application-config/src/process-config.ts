// Loads the configuration file and parse the environment and header values.
// Most of the resulting values are inferred from the config.
import fs from 'node:fs';
import { parse as parseFilePath } from 'node:path';
import omitEmpty from 'omit-empty-es';
import {
  type ApplicationOidcForDevelopmentConfig,
  type ApplicationRuntimeEnvironmentForDevelopment,
  type ApplicationRuntimeEnvironment,
  CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH,
} from '@commercetools-frontend/constants';
import { LOADED_CONFIG_TYPES } from './constants';
import loadConfig from './load-config';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schemas/generated/custom-application.schema';
import type { JSONSchemaForCustomViewConfigurationFiles } from './schemas/generated/custom-view.schema';
import substituteVariablePlaceholders from './substitute-variable-placeholders';
import { transformConfigurationToData } from './transformers';
import type {
  ApplicationRuntimeConfig,
  CloudIdentifier,
  CustomApplicationData,
  CustomViewData,
  LoadedConfigType,
  LoadingConfigOptions,
} from './types';
import {
  mapCloudIdentifierToApiUrl,
  getUniqueValues,
  getIsProd,
  getOrThrow,
} from './utils';
import { validateConfig } from './validations';

type ProcessConfigOptions = Partial<LoadingConfigOptions> & {
  // Options useful for testing
  disableCache?: boolean;
};

// TODO: make it configurable.
const developmentPort = 3001;
const developmentAppUrl = `http://localhost:${developmentPort}`;

const getLoadedConfigurationType = (
  configFileName: string
): LoadedConfigType => {
  if (configFileName.includes('custom-view-config')) {
    return LOADED_CONFIG_TYPES.CUSTOM_VIEW;
  }
  return LOADED_CONFIG_TYPES.CUSTOM_APPLICATION;
};

const trimTrailingSlash = (value: string) => value.replace(/\/$/, '');

const omitDevConfigIfEmpty = <Config>(devConfig: Config) => {
  if (
    devConfig &&
    (Object.hasOwn(devConfig, 'accountLinks') ||
      Object.hasOwn(devConfig, 'menuLinks') ||
      Object.hasOwn(devConfig, 'customViewHostUrl') ||
      Object.hasOwn(devConfig, 'oidc'))
  ) {
    return devConfig;
  }
  return undefined;
};

const isCustomViewData = (
  data: CustomApplicationData | CustomViewData
): data is CustomViewData =>
  (data as CustomApplicationData).entryPointUriPath === undefined;

const getRuntimeEnvironmentConfigForDevelopment = ({
  isProd,
  configurationData,
  mcApiUrl,
  appConfig,
  entryPointUriPath,
}: {
  isProd: boolean;
  configurationData: CustomApplicationData | CustomViewData;
  mcApiUrl: URL;
  appConfig:
    | JSONSchemaForCustomApplicationConfigurationFiles
    | JSONSchemaForCustomViewConfigurationFiles;
  entryPointUriPath: string;
}): ApplicationRuntimeEnvironmentForDevelopment | undefined => {
  if (isProd) {
    return undefined;
  }

  const oidcConfig = omitEmpty<ApplicationOidcForDevelopmentConfig>({
    authorizeUrl: [
      // In case the MC API url points to localhost, we need to point
      // to a local running dev login page to handle the workflow properly.
      mcApiUrl.hostname === 'localhost'
        ? mcApiUrl.origin.replace(mcApiUrl.port, String(developmentPort))
        : mcApiUrl.origin.replace('mc-api', 'mc'),
      '/login/authorize',
    ].join(''),
    initialProjectKey:
      // For the `account` application, we should unset the projectKey.
      entryPointUriPath === 'account'
        ? undefined
        : appConfig.env.development.initialProjectKey,
    ...(appConfig.env.development?.teamId && {
      teamId: appConfig.env.development.teamId,
      // When using a teamId we need to send the actual application of view identifier.
      ...(isCustomViewData(configurationData)
        ? { customViewId: configurationData.id }
        : { applicationId: configurationData.id }),
    }),
    oAuthScopes: appConfig.oAuthScopes,
    additionalOAuthScopes: appConfig?.additionalOAuthScopes,
  });

  if (isCustomViewData(configurationData)) {
    const hostUriPath = (appConfig as JSONSchemaForCustomViewConfigurationFiles)
      .env.development.hostUriPath;
    const defaultHostUriPath = oidcConfig.initialProjectKey
      ? `/${oidcConfig.initialProjectKey}/${entryPointUriPath}`
      : `/${entryPointUriPath}`;
    const hostUrl = new URL(
      hostUriPath || defaultHostUriPath,
      developmentAppUrl
    );
    return omitDevConfigIfEmpty<ApplicationRuntimeEnvironmentForDevelopment>({
      oidc: oidcConfig,
      customViewConfig: configurationData,
      customViewHostUrl: hostUrl.href,
    });
  }

  return omitDevConfigIfEmpty<ApplicationRuntimeEnvironmentForDevelopment>({
    oidc: oidcConfig,
    menuLinks: {
      icon: configurationData.icon,
      ...configurationData.mainMenuLink,
      submenuLinks: configurationData.submenuLinks,
    },
    // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
    accountLinks: appConfig.accountLinks,
  });
};

const getRuntimeEnvironmentConfig = ({
  isProd,
  configurationData,
  additionalAppEnv,
  mcApiUrl,
  cdnUrl,
  appUrl,
  appEnvKey,
  revision,
  appConfig,
}: {
  isProd: boolean;
  configurationData: CustomApplicationData | CustomViewData;
  additionalAppEnv: Record<string, unknown>;
  mcApiUrl: URL;
  cdnUrl: URL;
  appUrl: URL;
  appEnvKey: string;
  revision: string;
  appConfig:
    | JSONSchemaForCustomApplicationConfigurationFiles
    | JSONSchemaForCustomViewConfigurationFiles;
}): ApplicationRuntimeEnvironment => {
  const entryPointUriPath = isCustomViewData(configurationData)
    ? // When the application acts as the host for Custom Views, there is no real
      // entry point to be used, therefore we use a special identifier.
      CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH
    : configurationData.entryPointUriPath;

  // The real application ID is only used in production.
  // In development, we prefix the entry point with the "__local" prefix.
  // This is important to determine to which URL the MC should redirect to
  // after successful login.
  const applicationIdentifier = isProd
    ? `${configurationData.id}:${entryPointUriPath}`
    : `__local:${entryPointUriPath}`;

  const developmentConfig = getRuntimeEnvironmentConfigForDevelopment({
    isProd,
    configurationData,
    mcApiUrl,
    appConfig,
    entryPointUriPath,
  });

  return {
    // Common config
    ...omitEmpty<Record<string, unknown>>(additionalAppEnv),
    cdnUrl: cdnUrl.href,
    env: appEnvKey,
    frontendHost: appUrl.host,
    location: appConfig.cloudIdentifier,
    mcApiUrl: mcApiUrl.origin,
    revision,
    servedByProxy: isProd,

    // Application config
    applicationId: applicationIdentifier,
    applicationIdentifier,
    applicationName: isCustomViewData(configurationData)
      ? configurationData.defaultLabel
      : configurationData.name,
    entryPointUriPath,

    // Custom view config
    ...(isCustomViewData(configurationData)
      ? { customViewId: configurationData.id }
      : {}),

    // Development config
    ...(developmentConfig ? { __DEVELOPMENT__: developmentConfig } : {}),
  };
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
  const { filepath, config: rawConfig } = loadConfig(applicationPath);
  const configType = getLoadedConfigurationType(parseFilePath(filepath).name);

  validateConfig(configType, rawConfig);
  const appConfig = substituteVariablePlaceholders<
    | JSONSchemaForCustomApplicationConfigurationFiles
    | JSONSchemaForCustomViewConfigurationFiles
  >(rawConfig, { applicationPath, processEnv });

  const configurationData = transformConfigurationToData(configType, appConfig);

  const appEnvKey =
    processEnv.MC_APP_ENV ?? processEnv.NODE_ENV ?? 'development';
  const isProd = getIsProd(processEnv);

  const additionalAppEnv = appConfig.additionalEnv ?? {};
  const revision = (additionalAppEnv.revision as string) ?? '';

  // Parse all the supported URLs, which gets implicitly validated

  const envAppUrl = isProd ? configurationData.url : developmentAppUrl;
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

  cachedConfig = {
    data: configurationData,
    env: getRuntimeEnvironmentConfig({
      isProd,
      configurationData,
      additionalAppEnv,
      appConfig,
      appEnvKey,
      appUrl,
      cdnUrl,
      mcApiUrl,
      revision,
    }),
    headers: {
      ...appConfig.headers,
      csp: {
        ...appConfig.headers?.csp,
        // We need to make sure the URL we use in these CSP headers have a slash in the end,
        // otherwise it might create an invalid value when application/CDN URL points to a
        // non-root directory (ex: https://www.my-domain.com/app). This is a valid URL but from
        // the CSP point of view, it will say only the file `app` can be used as a source, so
        // any other file from that domain will be forbidden. Using the slash (ex: https://www.my-domain.com/app/)
        // at the end it's like using a wildcard so anything 'below' `app` will be allowed.
        'connect-src': getUniqueValues(
          appConfig.headers?.csp?.['connect-src'],
          [mcApiUrl.origin].concat(
            isProd ? [`${trimTrailingSlash(appUrl.href)}/`] : []
          )
        ),
        'script-src': getUniqueValues(
          appConfig.headers?.csp?.['script-src'],
          isProd
            ? [
                `${trimTrailingSlash(appUrl.href)}/`,
                `${trimTrailingSlash(cdnUrl.href)}/`,
              ]
            : []
        ),
        'style-src': getUniqueValues(
          appConfig.headers?.csp?.['style-src'],
          isProd
            ? [
                `${trimTrailingSlash(appUrl.href)}/`,
                `${trimTrailingSlash(cdnUrl.href)}/`,
              ]
            : []
        ),
      },
    },
  };

  return cachedConfig;
};

export default processConfig;
