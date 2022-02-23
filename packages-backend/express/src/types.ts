import type { ExpressJwtOptions } from 'jwks-rsa';

import { CLOUD_IDENTIFIERS } from './constants';

export type TAudience = string;

export type TIssuer = string;

export type TCloudIdentifier =
  typeof CLOUD_IDENTIFIERS[keyof typeof CLOUD_IDENTIFIERS];

export type TSessionMiddlewareOptions = {
  // The public-facing URL used to connect to the server / serverless function.
  // The value should only contain the origin URL (protocol, hostname, port),
  // the request path is inferred from the incoming request.
  audience: TAudience;
  // The cloud identifier (see `CLOUD_IDENTIFIERS`) that maps to the MC API URL
  // of the related cloud region or the MC API URL.
  issuer: TCloudIdentifier | TIssuer;
  // Determines whether the issuer should be inferred from the custom request
  // HTTP header `x-mc-api-cloud-identifier` which is sent by the MC API when
  // forwarding the request.
  // This might be useful in case the server is used in multiple regions.
  inferIssuer?: boolean;

  /* Options for the `jwksRsa.expressJwtSecret` */
  jwks?: Omit<ExpressJwtOptions, 'jwksUri'>;

  // This middleware needs to resolve the request URL to know about the
  // 'audience' it needs to use for the JWT.
  // By default it assumes a nodejs IncomingMessage object as its first parameter,
  // however this is not always the case (eg; AWS lambda functions).
  // When providing this function you will be delegated to resolve the URL from
  // the first parameter the middleware receives.
  // Form example, in AWS lambda functions it will be an Event object
  // (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a1260a1f3d40f239b53fd29effba594b0d1bee08/types/aws-lambda/trigger/api-gateway-proxy.d.ts#L12)
  urlResolver?: (request: unknown) => string;
};

export type TSession = {
  userId: string;
  projectKey: string;
};
