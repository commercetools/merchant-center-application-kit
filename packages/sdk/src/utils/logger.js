/* eslint-disable no-console */

const isLoggerEnabled = () => {
  if (process.env.DEBUG === 'true') return true;
  if (process.env.NODE_ENV === 'development') return true;

  const queryParams = new URL(window.location.href);
  if (
    process.env.NODE_ENV === 'production' &&
    queryParams.searchParams.get('debug') === 'true'
  )
    return true;

  return false;
};

export default {
  groupCollapsed: (...args) =>
    isLoggerEnabled() && console.groupCollapsed(...args),
  groupEnd: (...args) => isLoggerEnabled() && console.groupEnd(...args),
  info: (...args) => isLoggerEnabled() && console.info(...args),
  log: (...args) => isLoggerEnabled() && console.log(...args),
  error: (...args) => isLoggerEnabled() && console.error(...args),
  warn: (...args) => isLoggerEnabled() && console.warn(...args),
};
