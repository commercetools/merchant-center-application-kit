import * as winston from 'winston';
import type { TLoggerOptions } from './types';

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
