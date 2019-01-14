import qs from 'query-string';
import logger from './logger';

export const parseUri = uri => {
  const parser = document.createElement('a');
  parser.href = uri;

  return {
    pathname: parser.pathname,
    search: qs.parse(parser.search),
  };
};

export const logRequest = ({ method, request, response, error, action }) => {
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
    ...(method === 'POST' ? { body: action.payload.payload } : {}),
  });
  if (response)
    logger.log('%cresponse', `color: green; font-weight: bold;`, response);
  if (error) logger.log('%cerror', `color: red; font-weight: bold;`, error);
  logger.groupEnd(groupName);
};
