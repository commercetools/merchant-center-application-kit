// From https://github.com/acdlite/recompose/blob/master/src/packages/recompose/getDisplayName.js
const getDisplayName = <Props extends {}>(
  Component: React.ComponentType<Props>
) => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

export default getDisplayName;
