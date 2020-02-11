import { decode } from 'qss';
import logger from './logger';
import { THttpMethod, TSdkAction, Json, TSdkActionPost } from '../types';

type LogRequestParams = {
  method: THttpMethod;
  request: { headers: { [key: string]: string }; uri: string };
  response?: Json;
  error?: Error;
  action: TSdkAction;
};

export const parseUri = (uri: string) => {
  const parser = document.createElement('a');
  parser.href = uri;

  return {
    pathname: parser.pathname,
    search: decode(parser.search.substring(1)),
  };
};

const isPostAction = (action: TSdkAction): action is TSdkActionPost =>
  action.payload.method === 'POST';

export const logRequest = ({
  method,
  request,
  response,
  error,
  action,
}: LogRequestParams) => {
  const uriParts = parseUri(request.uri);
  const groupName = `%c${method} %c${uriParts.pathname}`;
  logger.groupCollapsed(
    groupName,
    `color: ${error ? 'red' : 'black'}; font-weight: bold;`,
    'color: gray; font-weight: lighter;'
  );
  logger.log('%caction', 'color: cadetblue; font-weight: bold;', action);
  logger.log('%crequest', `color: cornflowerblue; font-weight: bold;`, {
    headers: request.headers,
    uri: request.uri,
    params: uriParts.search,
    ...(isPostAction(action) ? { body: action.payload.payload } : {}),
  });
  if (response)
    logger.log('%cresponse', `color: green; font-weight: bold;`, response);
  if (error) logger.log('%cerror', `color: red; font-weight: bold;`, error);
  logger.groupEnd();
};

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
 *    Using the origin ensures that urls always match the the cookie is sent. Otherwise,
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

export function getMcApiUrl(actualWindow: ApplicationWindow = window) {
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
