---
'@commercetools-backend/express': patch
'@commercetools-website/custom-applications': patch
---

Update express auth verifier to allow it to run in different serverless environments.

In order to determine the 'audience' for JWT validation, the auth verifier needs to resolve the request url.
By default, the verifier assumes it receives a Node.js IncomingMessage object as its first parameter.
This default behaviour might not work for every scenario as, for example, AWS lambda functions, where that first parameter is an Event object.
(Reference: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html)
To handle these situations, this option allows the delegation of the URL resolution from the request-like object provided to the middleware as its first parameter.

Example for AWS Lambda Funtions:

```
const sessionAuthVerifier = createSessionAuthVerifier({
  audience: 'https://my-api-server.com',
  issuer: CLOUD_IDENTIFIERS.GCP_EU,
  getRequestUrl: (event) => `${event.rawPath}${event.rawQueryString ? '?' + event.rawQueryString : ''}`
});
```
