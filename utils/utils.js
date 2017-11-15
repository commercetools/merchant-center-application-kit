import qs from 'query-string';

export const parseUri = uri => {
  const parser = document.createElement('a');
  parser.href = uri;

  return {
    pathname: parser.pathname,
    search: qs.parse(parser.search),
  };
};

export const logRequest = ({ method, action, headers, uriParts }) => {
  /* eslint-disable no-console */
  const groupName = `%c${method} %c${uriParts.pathname}`;
  console.groupCollapsed(
    groupName,
    'color: black; font-weight: bold;',
    'color: gray; font-weight: lighter;'
  );
  console.log('%caction', 'color: dimgrey; font-weight: bold;', action);
  console.log('%cheaders', 'color: brown; font-weight: bold;', headers);
  console.log(
    '%cparams',
    'color: blueviolet; font-weight: bold;',
    uriParts.search
  );
  if (method === 'POST')
    console.log(
      '%cbody',
      'color: cadetblue; font-weight: bold;',
      action.payload.payload
    );
  console.groupEnd(groupName);
  /* eslint-enable no-console */
};
