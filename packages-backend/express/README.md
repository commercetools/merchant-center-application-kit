# @commercetools-backend/express

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-backend/express"><img src="https://badgen.net/npm/v/@commercetools-backend/express" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-backend/express"><img src="https://badgen.net/npm/v/@commercetools-backend/express/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-backend/express"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-backend/express" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Zero-config HTTP server as Express.js to facilitate development.

This package is primarily built for HTTP servers used by Custom Applications and it provides a set of components to facilitate the development of the HTTP server.

## Install

```bash
$ npm install --save @commercetools-backend/express
```

## Session middleware

This Express.js middleware should be used to handle the authentication exchange between the server and the `/proxy/forward-to` endpoint of the Merchant Center API Gateway.

> You can read more about the "Proxy to External API" concepts [here](https://docs.commercetools.com/custom-applications/main-concepts/proxy-to-external-api).

```js
const {
  createSessionMiddleware,
  CLOUD_IDENTIFIERS,
} = require('@commercetools-backend/express');

app.use(
  createSessionMiddleware({
    audience: 'https://my-api-server.com',
    issuer: CLOUD_IDENTIFIERS.GCP_EU,
  })
);
app.use((request, response, next) => {
  // `request.session` contains the useful information
});
```

### Middleware options

- `audience` (_string_): The public-facing URL of your API server. The value should only contain the origin URL (protocol, hostname, port), the request path is inferred from the incoming request.

- `issuer` (_string_): Either a cloud identifier or a valid URL to the Merchant Center API Gateway. The cloud identifier maps to the Merchant Center API URL of the related [cloud region](https://docs.commercetools.com/custom-applications/concepts/merchant-center-api#cloud-regions).

  - `gcp-au`: `https://mc-api.australia-southeast1.gcp.commercetools.com`
  - `gcp-eu`: `https://mc-api.europe-west1.gcp.commercetools.com`
  - `gcp-us`: `https://mc-api.us-central1.gcp.commercetools.com`
  - `aws-fra`: `https://mc-api.eu-central-1.aws.commercetools.com`
  - `aws-ohio`: `https://mc-api.us-east-2.aws.commercetools.com`

- `inferIssuer` (_boolean_): Determines whether the issuer should be inferred from the custom request HTTP header `x-mc-api-cloud-identifier` which is sent by the Merchant Center API Gateway when forwarding the request. This might be useful in case the server is used in multiple regions.

- `jwks` (_object_): See options of `jwks-rsa`.

### Usage in Serverless Functions

If your HTTP server runs as a Serverless Function, the Express.js middleware should not be needed. Instead you can use the underlying function that does not require the `next` callback.

**Example for Google Cloud Functions**

```js
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
```

> The same concept applies for serverless functions in other cloud providers.
