import type { THttpMethod, TSdkAction, Json, TSdkActionPost } from '../types';

import { decode } from 'qss';
import logger from './logger';

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
    servedByProxy: string | boolean;
    mcApiUrl: string;
  };
}

declare let window: ApplicationWindow;

const mcHostnameRegex = /^mc(-(\d){4,})?\.(.*)$/;
const mcPreviewHostnameRegex = /^.*\.mc-preview\.(.*)$/;

const getMcOriginTld = (host: string) => {
  if (host.match(mcPreviewHostnameRegex)) {
    return host.replace(mcPreviewHostnameRegex, '$1');
  }
  return host.replace(mcHostnameRegex, '$3');
};

const getMcApiUrlFromOrigin = (actualWindow: ApplicationWindow) => {
  const url = new URL(actualWindow.origin);
  const originTld = getMcOriginTld(url.host);
  return `${url.protocol}//mc-api.${originTld}`;
};

const parseAsBoolean = (value: string | boolean) =>
  value === true || value === 'true';

export function getMcApiUrl(actualWindow: ApplicationWindow = window): string {
  const isServedByProxy = parseAsBoolean(actualWindow.app.servedByProxy);

  /**
   * Prefer using the origin URL for the MC API based on the origin value
   * of the browser's `window.location`.
   * This ensures that the application always uses the correct URL associated
   * with that environment, instead of relying on the config value.
   */
  if (isServedByProxy) {
    return getMcApiUrlFromOrigin(actualWindow);
  }

  return actualWindow.app.mcApiUrl;
}
