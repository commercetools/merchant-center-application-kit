// From https://github.com/acdlite/recompose/blob/master/src/packages/recompose/getDisplayName.js
const getDisplayName = Component => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

export default getDisplayName;
