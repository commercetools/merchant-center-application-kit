import type { TLoggerOptions } from './types';

import * as winston from 'winston';

const createApplicationLogger = (options: TLoggerOptions = {}) => {
  const formatters = winston.format.combine(
    ...(options.formatters ?? []),
    options.json
      ? winston.format.json()
      : winston.format.combine(winston.format.cli(), winston.format.simple())
  );

  return winston.createLogger({
    level: options.level ?? 'info',
    format: formatters,
    transports: [
      new winston.transports.Console({ silent: Boolean(options.silent) }),
    ],
  });
};

export default createApplicationLogger;
