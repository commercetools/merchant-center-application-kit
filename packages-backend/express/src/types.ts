import type { ExpressJwtOptions } from 'jwks-rsa';

import { CLOUD_IDENTIFIERS } from './constants';

export type TAudience = string;

export type TIssuer = string;

export type TCloudIdentifier =
  (typeof CLOUD_IDENTIFIERS)[keyof typeof CLOUD_IDENTIFIERS];

export type TAudiencePolicy = 'forward-url-full-path' | 'forward-url-origin';

export interface TBaseRequest {
  headers: Record<string, string | string[] | undefined>;
  url?: string;
  originalUrl?: string;
}

export type TSessionMiddlewareOptions<Request extends TBaseRequest> = {
  /**
   * The public-facing URL used to connect to the server / serverless function.
   * The value should only contain the origin URL (protocol, hostname, port),
   * the request path is inferred from the incoming request.
   */
  audience: TAudience;
  /**
   * How the audience value should be exchanged between the server and the client.
   * By default it uses the full URL (origin + pathname).
   */
  audiencePolicy?: TAudiencePolicy;
  /**
   * The cloud identifier (see `CLOUD_IDENTIFIERS`) that maps to the MC API URL
   * of the related cloud region or the MC API URL.
   */
  issuer: TCloudIdentifier | TIssuer;
  /**
   * Determines whether the issuer should be inferred from the custom request
   * HTTP header `x-mc-api-cloud-identifier` which is sent by the MC API when
   * forwarding the request.
   * This might be useful in case the server is used in multiple regions.
   */
  inferIssuer?: boolean;
  /**
   * Options for the `jwksRsa.expressJwtSecret`
   */
  jwks?: Omit<ExpressJwtOptions, 'jwksUri'>;
  /**
   * By default we assume that the `request` is a Node.js-like object having either
   * an `originalUrl` or `url` properties.
   * If that's not the case (for example in AWS Lambda functions) you need to correctly
   * map the URL (URI path + query string) of the `request`.
   */
  getRequestUrl?: (request: Request) => string;
};

export type TSession = {
  userId: string;
  projectKey: string;
  userPermissions?: string[];
};
