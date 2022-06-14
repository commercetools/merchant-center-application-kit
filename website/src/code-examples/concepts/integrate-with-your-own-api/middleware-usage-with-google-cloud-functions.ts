import {
  createSessionAuthVerifier,
  CLOUD_IDENTIFIERS,
} from '@commercetools-backend/express';
import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';

const sessionAuthVerifier = createSessionAuthVerifier({
  audience: 'https://my-api-server.com',
  issuer: CLOUD_IDENTIFIERS.GCP_EU,
});

export const handler: HttpFunction = async function (request, response) {
  try {
    await sessionAuthVerifier(request, response);
  } catch (error) {
    response.status(401).send(JSON.stringify({ message: 'Unauthorized' }));
    return;
  }
  // `request.session` contains the useful information
};
