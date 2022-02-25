import type { Response, NextFunction } from 'express';
import type { TBaseRequest, TSessionMiddlewareOptions } from '../types';

import { createSessionAuthVerifier } from '../auth';

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
