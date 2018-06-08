const matchLeadingAndTrailingSlashes = /^\/|\/$/g;

export const trimLeadingAndTrailingSlashes = url =>
  url.replace(matchLeadingAndTrailingSlashes, '');

export const joinPaths = (...paths) => {
  const joint = paths
    .map(path => {
      if (typeof path !== 'string')
        throw new Error(
          `Expected path "${path}" to be a "string", but got "${typeof path}"`
        );
      // Trim leading and trailing slash for each single path
      return trimLeadingAndTrailingSlashes(path);
    })
    .join('/');
  return `/${joint}`;
};
