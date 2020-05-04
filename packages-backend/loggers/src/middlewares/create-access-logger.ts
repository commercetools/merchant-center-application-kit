import type { TAccessLoggerOptions } from '../types';

import winston from 'winston';
import expressWinston from 'express-winston';

const createAccessLoggerMiddleware = (options: TAccessLoggerOptions = {}) => {
  const shouldLog = Boolean(options.silent);
  const ignoreUrls = options.ignoreUrls ?? [];
  const formatters = winston.format.combine(
    winston.format.timestamp(),
    ...(options.formatters ?? []),
    options.json ? winston.format.json() : winston.format.cli()
  );

  return expressWinston.logger({
    level: options.level ?? 'info',
    transports: [new winston.transports.Console()],
    format: formatters,
    meta: true,
    expressFormat: true, // Use default morgan access log formatting
    colorize: !options.json,
    skip: (req) => !shouldLog || ignoreUrls.includes(req.originalUrl),
    dynamicMeta: (req) => ({
      ip: req.ip,
      ips: req.ips,
      hostname: req.hostname,
      ...(req.connection.remoteAddress
        ? { remoteAddress: req.connection.remoteAddress }
        : {}),
    }),
  });
};

export default createAccessLoggerMiddleware;
