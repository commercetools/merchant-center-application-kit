import winston from 'winston';
import * as env from './env';
import jsonFormatter from './custom-formats/json';

const shouldLog = !env.isTest || process.env.DEBUG === 'true';

const createApplicationLogger = () => {
  return winston.createLogger({
    level: process.env.DEBUG === 'true' ? 'debug' : 'info',
    format: env.isDev
      ? winston.format.combine(winston.format.cli(), winston.format.simple())
      : jsonFormatter(),
    transports: [
      new winston.transports.Console({
        silent: !shouldLog,
      }),
    ],
  });
};

export default createApplicationLogger;
