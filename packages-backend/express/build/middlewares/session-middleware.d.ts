import type { TSessionMiddlewareOptions } from '../types';
import type { Request, Response, NextFunction } from 'express';
declare function createSessionMiddleware(options: TSessionMiddlewareOptions): (request: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("express-serve-static-core").Query>, response: Response<any>, next: NextFunction) => any;
export default createSessionMiddleware;
