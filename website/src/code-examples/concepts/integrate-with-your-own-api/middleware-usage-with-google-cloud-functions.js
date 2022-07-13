const {
  createSessionAuthVerifier,
  CLOUD_IDENTIFIERS,
} = require('@commercetools-backend/express');

const sessionAuthVerifier = createSessionAuthVerifier({
  audience: 'https://my-api-server.com',
  issuer: CLOUD_IDENTIFIERS.GCP_EU,
});

exports.handler = async function (request, response) {
  try {
    await sessionAuthVerifier(request, response);
  } catch (error) {
    response.status(401).send(JSON.stringify({ message: 'Unauthorized' }));
    return;
  }
  // `request.session` contains the useful information
};
