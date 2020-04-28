import type { RequestFilter } from 'express-winston';

import expressWinston from 'express-winston';
import winston from 'winston';
import * as env from './env';
import redactInsecureRequestHeaders from './utils/redact-insecure-request-headers';
import jsonFormatter from './custom-formats/json';

const shouldLog = !env.isTest || process.env.DEBUG === 'true';

type LoggerOptions = {
  ignoreUrls?: string[];
};

const defaultIgnoreUrls = ['/', '/health', '/favicon.ico'];
const defaultFormat = winston.format.combine(winston.format.timestamp());

// Inspired by https://github.com/bithavoc/express-winston/issues/62#issuecomment-396906056
const requestFilter: RequestFilter = (req, propName) => {
  if (propName === 'headers') {
    return redactInsecureRequestHeaders(req);
  }
  return req[propName];
};

const createAccessLogger = (options: LoggerOptions = {}) => {
  const ignoreUrls = [...defaultIgnoreUrls, ...(options.ignoreUrls ?? [])];

  return expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      defaultFormat,
      env.isDev ? winston.format.cli() : jsonFormatter()
    ),
    requestFilter,
    meta: true,
    expressFormat: true, // Use default morgan access log formatting
    colorize: env.isDev,
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

export default createAccessLogger;
