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

  // In order to determine the 'audience' for JWT validation, the middleware needs
  // to resolve the request url.
  // By default, the middleware assumes it receives a Node.js IncomingMessage object
  // as its first parameter.
  // This default behaviour might not work for every scenario as, for example,
  // AWS lambda functions, where that first parameter is an Event object.
  // (Reference: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html)
  // To handle these situations, this option allows the delegation of the URL resolution
  // from the request-like object provided to the middleware as its first parameter.
  urlResolver?: (request: unknown) => string;
};

export type TSession = {
  userId: string;
  projectKey: string;
};
