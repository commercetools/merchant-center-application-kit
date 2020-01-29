/* eslint-disable no-console */

export const isLoggerEnabled = () => {
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

const logger: {
  groupCollapsed(groupTitle?: string, ...optionalParams: unknown[]): void;
  groupEnd(): void;
  info(message?: unknown, ...optionalParams: unknown[]): void;
  log(message?: unknown, ...optionalParams: unknown[]): void;
  error(message?: unknown, ...optionalParams: unknown[]): void;
  warn(message?: unknown, ...optionalParams: unknown[]): void;
} = {
  groupCollapsed: (...args) =>
    isLoggerEnabled() && console.groupCollapsed(...args),
  groupEnd: () => isLoggerEnabled() && console.groupEnd(),
  info: (...args) => isLoggerEnabled() && console.info(...args),
  log: (...args) => isLoggerEnabled() && console.log(...args),
  error: (...args) => isLoggerEnabled() && console.error(...args),
  warn: (...args) => isLoggerEnabled() && console.warn(...args),
};

export default logger;
