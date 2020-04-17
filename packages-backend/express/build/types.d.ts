import type { Request } from 'express';
import { CLOUD_IDENTIFIERS } from './constants';
export declare type TCloudIdentifier = typeof CLOUD_IDENTIFIERS[keyof typeof CLOUD_IDENTIFIERS];
export declare type TSessionMiddlewareOptions = {
    mcApiUrl: TCloudIdentifier | string;
    inferMcApiUrlFromHeader?: boolean;
    jwksUseCache?: boolean;
    jwksUseRateLimit?: boolean;
    jwksRequestsPerMinute?: number;
};
export declare type TSession = {
    userId: string;
    projectKey: string;
};
export declare type TRequestWithSession = Request & {
    session: TSession;
};
