# @commercetools-frontend/server-express

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/server-express"><img src="https://badgen.net/npm/v/@commercetools-frontend/server-express" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/server-express"><img src="https://badgen.net/npm/v/@commercetools-frontend/server-express/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/server-express"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/server-express" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Zero-config HTTP server as Express.js for working with Merchant Center Custom Applications

This package is primarily built for HTTP servers used by Custom Applications and it provides a set of components to facilitate the development of the HTTP server.

## Install

```bash
$ npm install --save @commercetools-frontend/server-express
```

## Session middleware

This middleware should be used to handle the authentication exchange between the server and the `/proxy/forward-to` endpoint of the Merchant Center API.

> You can read more about the "Proxy to External API" concepts [here](https://docs.commercetools.com/custom-applications/main-concepts/proxy-to-external-api).

```js
const {
  createSessionMiddleware,
  CLOUD_IDENTIFIERS,
} = require('@commercetools-frontend/server-express');

app.use(createSessionMiddleware({ mcApiUrl: CLOUD_IDENTIFIERS.GCP_EU }));
app.use((request, response, next) => {
  // `request.session` contains the useful information
});
```

### Middleware options

- `issuer` (_string_): either a cloud identifier or a valid URL to the Merchant Center API Gateway. The cloud identifier maps to the Merchant Center API URL of the related [cloud region](https://docs.commercetools.com/custom-applications/main-concepts/api-gateway#cloud-regions).

  - `gcp-au`: `https://mc-api.australia-southeast1.gcp.commercetools.com`
  - `gcp-eu`: `https://mc-api.europe-west1.gcp.commercetools.com`
  - `gcp-us`: `https://mc-api.us-central1.gcp.commercetools.com`
  - `aws-fra`: `https://mc-api.eu-central-1.aws.commercetools.com`
  - `aws-ohio`: `https://mc-api.us-east-2.aws.commercetools.com`

- `inferIssuer` (_boolean_): determines whether the issuer should be inferred from the custom request HTTP header `x-mc-api-cloud-identifier` which is sent by the MC API when forwarding the request. This might be useful in case the server is used in multiple regions.
