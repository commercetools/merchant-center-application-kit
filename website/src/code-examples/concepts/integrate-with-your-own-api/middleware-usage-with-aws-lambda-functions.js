const {
  createSessionAuthVerifier,
  CLOUD_IDENTIFIERS,
} = require('@commercetools-backend/express');

const sessionAuthVerifier = createSessionAuthVerifier({
  audience: 'https://my-api-server.com',
  issuer: CLOUD_IDENTIFIERS.GCP_EU,
  // This example assumes that the `event` is based on Lambda v2 of the payload format.
  getRequestUrl: (event) =>
    `${event.rawPath}${event.rawQueryString ? '?' + event.rawQueryString : ''}`,
});

exports.handler = async function (event, context) {
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
