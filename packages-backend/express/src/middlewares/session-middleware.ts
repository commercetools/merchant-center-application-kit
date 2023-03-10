import type { Response, NextFunction } from 'express';
import { createSessionAuthVerifier } from '../auth';
import type { TBaseRequest, TSessionMiddlewareOptions } from '../types';

function createSessionMiddleware<Request extends TBaseRequest>(
  options: TSessionMiddlewareOptions<Request>
) {
  const sessionAuthVerifier = createSessionAuthVerifier<Request>(options);

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      await sessionAuthVerifier(request, response);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default createSessionMiddleware;
