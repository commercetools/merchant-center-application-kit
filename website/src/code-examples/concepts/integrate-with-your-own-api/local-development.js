const express = require('express');
const {
  createSessionMiddleware,
  CLOUD_IDENTIFIERS,
} = require('@commercetools-backend/express');

const app = express();
app.use(
  createSessionMiddleware({
    audience: 'https://33ea-87-183-162-9.eu.ngrok.io',
    issuer: CLOUD_IDENTIFIERS.GCP_EU,
  })
);
app.post('/echo', (req, res) => {
  res.send('It works 🙌');
});

app.listen(6000, () => {
  console.log('Running on port 6000.');
});

module.exports = app;
