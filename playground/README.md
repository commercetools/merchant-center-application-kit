<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png">
  </a>
  <b>Merchant Center Playground Application.</b>
</p>

This is a Custom Application used to help developing features in this repository.

Please read the [documentation](https://docs.commercetools.com/merchant-center-customizations/custom-applications) about Custom Applications before getting started.

## Using the Echo Server view

One of the example views showcases sending requests to a remote server. If you want to use that functionality, you will need to start a local server to echo the response back to the browser.

Since that view uses the `[proxy/forward-to](https://docs.commercetools.com/merchant-center-customizations/concepts/integrate-with-your-own-api)` MC endpoint and it only allows to forward requests to an external service through HTTPS protocol, we need to start that kind of service locally.

You can use a [secure local tunnel](https://docs.commercetools.com/merchant-center-customizations/concepts/integrate-with-your-own-api#local-development-using-a-secure-tunnel) to help with this context. For instance, using **[ngrok](https://docs.commercetools.com/merchant-center-customizations/concepts/integrate-with-your-own-api#ngrok)**.
The local server will listen in port `3003` by default (you can change it with the `PLAYGROUND_SERVER_PORT` environment variable). You will need to use it when starting the local tunnel.

When using the tunnel, you will need to configure some environment variables with the domain assigned.
Once you get the tunnel domain, head over the `.env.local` file (in the root directory) and make sure you use it in these variables:

```
PLAYGROUND_API_AUDIENCE="<tunnel_domain>"
ECHO_SERVER_URL="<tunnel_domain>/api/echo"
```

Once you did that, you also need to start the local server with this command:

```
yarn start:server
```
