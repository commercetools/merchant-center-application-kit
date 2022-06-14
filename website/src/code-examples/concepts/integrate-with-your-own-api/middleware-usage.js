const express = require('express');
const {
  createSessionMiddleware,
  CLOUD_IDENTIFIERS,
} = require('@commercetools-backend/express');

const app = express();
app.use(
  createSessionMiddleware({
    audience: 'https://my-api-server.com',
    issuer: CLOUD_IDENTIFIERS.GCP_EU,
  })
);
app.use((request, response, next) => {
  // `request.session` contains the useful information
});
