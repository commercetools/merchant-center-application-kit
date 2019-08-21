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
