import qs from 'query-string';
import * as storage from '@commercetools-local/utils/storage';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';

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
  /* eslint-disable no-console */
  const groupName = `%c${method} %c${uriParts.pathname}`;
  console.groupCollapsed(
    groupName,
    `color: ${error ? 'red' : 'black'}; font-weight: bold;`,
    'color: gray; font-weight: lighter;'
  );
  console.log('%caction', 'color: cadetblue; font-weight: bold;', action);
  console.log('%crequest', `color: cornflowerblue; font-weight: bold;`, {
    headers: request.headers,
    uri: request.uri,
    params: uriParts.search,
    ...(method === 'POST' ? { body: action.payload.payload } : {}),
  });
  if (response)
    console.log('%cresponse', `color: green; font-weight: bold;`, response);
  if (error) console.log('%cerror', `color: red; font-weight: bold;`, error);
  console.groupEnd(groupName);
  /* eslint-enable no-console */
};

// NOTE in case we create the middleware into a factory, these could come in
// as options
export const selectProjectKey = () =>
  storage.get(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
