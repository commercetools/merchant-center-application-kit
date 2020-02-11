export interface ApplicationWindow extends Window {
  app: {
    skipInferringOfApiUrlOnProduction: string | boolean;
    servedByProxy: string | boolean;
    mcApiUrl: string;
  };
}

declare let window: ApplicationWindow;

/**
 * NOTE:
 *    Given the Merchant Center or Custom Application runs behind the proxy
 *    then the `mcApiUrl` should be build using the origin on the window.
 *
 *    This allows the Merchant Center (or any Custom Appliction) to automatically
 *    use an `mcApiUrl` which matches the respective url of the deployment.
 *
 *    This is particularily useful with the new and old hostnames for the Merchant Center.
 *    When using the origin, it will be made sure that the authorization cookie will
 *    always be sent as the appropriate API url is used.
 *
 *    1. MC: mc.commercetools.com with API: mc-api.europe-west1.gcp.commercetools.com
 *       -> Will not work as urls differ
 *    2. MC: mc.europe-west1.gcp.commercetools.com with API: mc-api..commercetools.com
 *       -> Will not work as urls differ
 *
 *    Using the origin ensures that urls always match with the cookie sent. Otherwise,
 *    the application shell will rightfully redirect to the logout page.
 */
const getMcApiUrlFromOrigin = (actualWindow: ApplicationWindow) => {
  const url = new URL(actualWindow.origin);
  const mcApiUrlHost = url.host.replace('mc.', 'mc-api.');

  return `${url.protocol}//${mcApiUrlHost}`;
};

const isEnvironmentConfigurationEnabled = (
  environmentConfiguration: string | boolean
) => environmentConfiguration === true || environmentConfiguration === 'true';

export default function getMcApiUrl(actualWindow: ApplicationWindow = window) {
  const isServedByProxy = isEnvironmentConfigurationEnabled(
    actualWindow.app.servedByProxy
  );
  const isSkipInferringOfApiUrlOnProductionEnabled = isEnvironmentConfigurationEnabled(
    actualWindow.app.skipInferringOfApiUrlOnProduction
  );

  if (isServedByProxy && !isSkipInferringOfApiUrlOnProductionEnabled)
    return getMcApiUrlFromOrigin(actualWindow);

  return actualWindow.app.mcApiUrl;
}
