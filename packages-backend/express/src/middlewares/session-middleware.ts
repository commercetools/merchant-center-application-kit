import type { Request, Response, NextFunction } from 'express';
import type { TSessionMiddlewareOptions } from '../types';

import { createSessionAuthVerifier } from '../auth';

function createSessionMiddleware(options: TSessionMiddlewareOptions) {
  const sessionAuthVerifier =
    createSessionAuthVerifier<Request, Response>(options);

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
