import expressWinston from 'express-winston';
import winston from 'winston';
import { createAccessLogSkipper, mapRequestMetadata } from '../helpers';
import type { TAccessLoggerOptions } from '../types';

type TAccessLoggerMiddleware = ReturnType<typeof expressWinston.logger>;

const createAccessLoggerMiddleware = (
  options: TAccessLoggerOptions = {}
): TAccessLoggerMiddleware => {
  const formatters = winston.format.combine(
    winston.format.timestamp(),
    ...(options.formatters ?? []),
    options.json ? winston.format.json() : winston.format.cli()
  );
  const skip = createAccessLogSkipper(options);

  return expressWinston.logger({
    level: options.level ?? 'info',
    transports: [new winston.transports.Console()],
    format: formatters,
    meta: true,
    expressFormat: true, // Use default morgan access log formatting
    colorize: !options.json,
    skip,
    dynamicMeta: mapRequestMetadata,
  });
};

export default createAccessLoggerMiddleware;
