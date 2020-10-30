import type { ApplicationWindow } from '@commercetools-frontend/constants';

const removeMcPrefix = (host: string) =>
  host.replace(/^mc(-(\d){4,})?\.(.*)$/, '$3');

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
 *    2. MC: mc.europe-west1.gcp.commercetools.com with API: mc-api.commercetools.com
 *       -> Will not work as urls differ
 *
 *    Using the origin ensures that urls always match with the cookie sent. Otherwise,
 *    the application shell will rightfully redirect to the logout page.
 */

type TApplicationContextEnvironment = ApplicationWindow['app'];
type TPartialWindow = Pick<Window, 'origin'>;

const getMcApiUrlFromOrigin = (partialWindow: TPartialWindow) => {
  const url = new URL(partialWindow.origin);
  const originTld = removeMcPrefix(url.host);
  return `${url.protocol}//mc-api.${originTld}`;
};

function getMcApiUrl(
  environment: TApplicationContextEnvironment,
  partialWindow: TPartialWindow
): string {
  const isServedByProxy = environment.servedByProxy;
  if (isServedByProxy && partialWindow.origin)
    return getMcApiUrlFromOrigin(partialWindow);

  return environment.mcApiUrl;
}

export default getMcApiUrl;
