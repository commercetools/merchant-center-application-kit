import type { Request, Response, NextFunction } from 'express';

import * as Sentry from '@sentry/node';
import * as env from './env';
import redactInsecureRequestHeaders from './utils/redact-insecure-request-headers';

const shouldLog = !env.isTest || process.env.DEBUG === 'true';

type LoggerOptions = {
  sentry?: {
    DSN: string;
    role: string;
    environment: string;
  };
  errorMessageBlacklist?: Array<string | RegExp>;
};

function createErrorReportLogger(options: LoggerOptions = {}) {
  // Sentry
  if (options.sentry) {
    Sentry.init({ dsn: options.sentry.DSN });
    Sentry.configureScope((scope) => {
      scope.setLevel(Sentry.Severity.Error);
    });
    Sentry.setTag('role', options.sentry.role);
    Sentry.setTag('environment', options.sentry.environment);
  }

  // Filter out errors that contains those strings either as name or message
  const errorMessageBlacklist = options.errorMessageBlacklist ?? [];

  const shouldErrorBeTracked = (error: Error) =>
    !errorMessageBlacklist.some(
      // The match can be either the error code as well as a part of
      // the error message (in case the error code is not enough).
      // Since it can be a mix of both, we need to match it
      // to either the name or message.
      (match) => {
        if (typeof match === 'string') {
          return match === error.name || match === error.message;
        }
        return match.test(error.name) || match.test(error.message);
      }
    );

  function trackError(
    error: Error,
    meta: { request: Request; userId?: string },
    getErrorId: (errorId?: string | null) => void
  ) {
    if (!shouldLog) {
      getErrorId(null);
      return;
    }
    if (options.sentry && shouldErrorBeTracked(error)) {
      if (meta.userId) {
        Sentry.setUser({ id: meta.userId });
      }
      const { method, originalUrl, httpVersion } = meta.request;
      Sentry.setExtra('request', {
        method,
        originalUrl,
        httpVersion,
        headers: redactInsecureRequestHeaders(meta.request),
      });
      const errorId = Sentry.captureException(error);
      getErrorId(errorId);
    } else {
      getErrorId();
    }
  }

  const passThroughMiddleware = (
    _req: Request,
    _res: Response,
    next: NextFunction
  ) => next();

  function sentryRequestHandler() {
    if (shouldLog && options.sentry) {
      return Sentry.Handlers.requestHandler({ request: false });
    }
    return passThroughMiddleware;
  }

  return { sentryRequestHandler, trackError };
}

export default createErrorReportLogger;
