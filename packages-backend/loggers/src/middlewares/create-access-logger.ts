import type { Request } from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import type { TAccessLoggerOptions } from '../types';

type TAccessLoggerMiddleware = ReturnType<typeof expressWinston.logger>;

const parseIps = (request: Request) => {
  const forwardedFor = request.headers['x-forwarded-for'];

  if (!forwardedFor) {
    return [];
  }

  const remoteAddresses = Array.isArray(forwardedFor)
    ? forwardedFor
    : forwardedFor.split(',');

  return remoteAddresses;
};

const createAccessLoggerMiddleware = (
  options: TAccessLoggerOptions = {}
): TAccessLoggerMiddleware => {
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
    skip: (req) =>
      Boolean(options.silent) || ignoreUrls.includes(req.originalUrl),
    dynamicMeta: (req) => {
      const remoteAddress = req.socket?.remoteAddress;
      const proxyIps = parseIps(req);
      const [clientIp] = proxyIps;
      return {
        clientIp: clientIp ?? remoteAddress,
        proxyIps,
        hostname: req.hostname,
        ...(remoteAddress ? { remoteAddress } : {}),
      };
    },
  });
};

export default createAccessLoggerMiddleware;
