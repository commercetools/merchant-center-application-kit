import {
  createSessionAuthVerifier,
  CLOUD_IDENTIFIERS,
} from '@commercetools-backend/express';
import type { Context, APIGatewayProxyEventV2 } from 'aws-lambda';

const sessionAuthVerifier = createSessionAuthVerifier<APIGatewayProxyEventV2>({
  audience: 'https://my-api-server.com',
  issuer: CLOUD_IDENTIFIERS.GCP_EU,
  // This example assumes that the `event` is based on Lambda v2 of the payload format.
  getRequestUrl: (event) =>
    `${event.rawPath}${event.rawQueryString ? '?' + event.rawQueryString : ''}`,
});

export const lambdaHandler = async (
  event: APIGatewayProxyEventV2,
  context: Context
) => {
  try {
    await sessionAuthVerifier(event, context);
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' }),
    };
  }
  // `event.session` contains the useful information
};
