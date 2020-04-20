import type { Request } from 'express';
import type { ExpressJwtOptions } from 'jwks-rsa';

import { CLOUD_IDENTIFIERS } from './constants';

export type TCloudIdentifier = typeof CLOUD_IDENTIFIERS[keyof typeof CLOUD_IDENTIFIERS];

export type TSessionMiddlewareOptions = {
  // The cloud identifier (see `CLOUD_IDENTIFIERS`) that maps to the MC API URL
  // of the related cloud region or the MC API URL.
  issuer: TCloudIdentifier | string;
  // Determines whether the issuer should be inferred from the custom request
  // HTTP header `x-mc-api-cloud-identifier` which is sent by the MC API when
  // forwarding the request.
  // This might be useful in case the server is used in multiple regions.
  inferIssuer?: boolean;

  /* Options for the `jwksRsa.expressJwtSecret` */
  jwks?: Omit<ExpressJwtOptions, 'jwksUri'>;
};

export type TSession = {
  userId: string;
  projectKey: string;
};

export type TRequestWithSession = Request & { session: TSession };
