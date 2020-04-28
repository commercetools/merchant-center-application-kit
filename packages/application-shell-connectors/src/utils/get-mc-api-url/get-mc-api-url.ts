import type { ApplicationWindow } from '@commercetools-frontend/constants';

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

type TApplicationContextEnvironment = ApplicationWindow['app'];
type TPartialWindow = Pick<Window, 'origin'>;

const getMcApiUrlFromOrigin = (partialWindow: TPartialWindow) => {
  const url = new URL(partialWindow.origin);
  const mcApiUrlHost = url.host.replace('mc.', 'mc-api.');

  return `${url.protocol}//${mcApiUrlHost}`;
};

export default function getMcApiUrl(
  environment: TApplicationContextEnvironment,
  partialWindow: TPartialWindow
) {
  const isServedByProxy = environment.servedByProxy;
  const isInferringOfMcApiUrlOnProductionDisabled =
    environment.disableInferringOfMcApiUrlOnProduction;

  if (
    isServedByProxy &&
    !isInferringOfMcApiUrlOnProductionDisabled &&
    partialWindow.origin
  )
    return getMcApiUrlFromOrigin(partialWindow);

  return environment.mcApiUrl;
}
