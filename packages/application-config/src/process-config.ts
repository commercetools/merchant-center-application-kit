// Loads the configuration file and parse the environment and header values.
// Most of the resulting values are inferred from the config.
import fs from 'fs';
import { parse as parseFilePath } from 'path';
import omitEmpty from 'omit-empty-es';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './custom-application.schema';
import loadConfig from './load-config';
import substituteVariablePlaceholders from './substitute-variable-placeholders';
import { transformConfigurationToData } from './transformers';
import {
  ApplicationRuntimeConfig,
  CloudIdentifier,
  ConfigType,
  CustomApplicationData,
  CustomViewData,
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

const getConfigurationType = (configFileName: string): ConfigType => {
  if (configFileName.includes('custom-application-config')) {
    return ConfigType.CUSTOM_APPLICATION;
  } else if (configFileName.includes('custom-view-config')) {
    return ConfigType.CUSTOM_VIEW;
  } else {
    throw new Error(`Invalid config filename: ${configFileName}`);
  }
};

const trimTrailingSlash = (value: string) => value.replace(/\/$/, '');

const omitDevConfigIfEmpty = (
  devConfig: ApplicationRuntimeConfig['env']['__DEVELOPMENT__']
) => {
  // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
  if (devConfig?.accountLinks || devConfig?.menuLinks || devConfig?.oidc)
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

  const rawConfig = loadConfig(applicationPath);
  const configType = getConfigurationType(
    parseFilePath(rawConfig.filepath).name
  );
  console.log({ configType });
  validateConfig(configType, rawConfig.config);

  const appConfig =
    substituteVariablePlaceholders<JSONSchemaForCustomApplicationConfigurationFiles>(
      rawConfig.config,
      { applicationPath, processEnv }
    );

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

  // The real application ID is only used in production.
  // In development, we prefix the entry point with the "__local" prefix.
  // This is important to determine to which URL the MC should redirect to
  // after successful login.
  const applicationId = isProd
    ? `${configurationData.id}:${
        (configurationData as CustomApplicationData).entryPointUriPath ||
        'custom-view'
      }`
    : `__local:${
        (configurationData as CustomApplicationData).entryPointUriPath ||
        configurationData.id
      }`;

  const developmentConfig: ApplicationRuntimeConfig['env']['__DEVELOPMENT__'] =
    isProd
      ? undefined
      : omitDevConfigIfEmpty({
          oidc: omitEmpty({
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
            initialProjectKey:
              // For the `account` application, we should unset the projectKey.
              (configurationData as CustomApplicationData).entryPointUriPath ===
              'account'
                ? undefined
                : appConfig.env.development.initialProjectKey,
            ...(appConfig.env.development?.teamId && {
              teamId: appConfig.env.development.teamId,
              applicationId: appConfig.env.production.applicationId,
            }),
            oAuthScopes: appConfig.oAuthScopes,
            additionalOAuthScopes: appConfig?.additionalOAuthScopes,
          }),
          ...(configType === ConfigType.CUSTOM_APPLICATION
            ? {
                menuLinks: {
                  icon: (configurationData as CustomApplicationData).icon,
                  ...(configurationData as CustomApplicationData).mainMenuLink,
                  submenuLinks: (configurationData as CustomApplicationData)
                    .submenuLinks,
                },
              }
            : {}),
          ...(configType === ConfigType.CUSTOM_VIEW
            ? {
                customViewType: (configurationData as CustomViewData).type,
                customViewTypeSettings: (configurationData as CustomViewData)
                  .typeSettings,
              }
            : {}),
          // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
          accountLinks: appConfig.accountLinks,
        });

  cachedConfig = {
    data: configurationData,
    env: {
      ...omitEmpty(additionalAppEnv),
      applicationId,
      applicationName: configurationData.name,
      entryPointUriPath: (configurationData as CustomApplicationData)
        .entryPointUriPath,
      customViewId: (configurationData as CustomViewData).id,
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
    },
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
