---
'merchant-center-application-template-starter': major
'@commercetools-frontend/application-config': major
'@commercetools-frontend/application-shell': major
'@commercetools-frontend/application-shell-connectors': major
'@commercetools-frontend/mc-dev-authentication': major
'@commercetools-frontend/mc-html-template': major
'@commercetools-frontend/mc-scripts': major
'playground': major
'@commercetools-local/visual-testing-app': major
'@commercetools-website/custom-applications': major
---

Remove the CLI flag `--use-local-assets`. The default behavior of `mc-scripts compile-html` now is to compile the assets locally, which is the only reasonable thing to do.

Furthermore, the `@commercetools-frontend/mc-http-server` package has been deprecated and won't be published anymore.
With the `compile-html` command there is no need to have a pre-configured HTTP server anymore.

When running the `mc-scripts compile-html` command, the `index.html` is compiled for production usage and it lives in the `public` folder, together with the other static assets. This is all you need to deploy your application.
You can decide to [deploy the Custom Application statically to one of the popular cloud providers](https://docs.commercetools.com/custom-applications/deployment/compiling-a-custom-application#deployment), or serve the files on your own using a static server like [serve](https://www.npmjs.com/package/serve), or any other static server (it does not even have to be Node.js).

For example:

```console
NODE_ENV=production MC_APP_ENV=development dotenv -- mc-scripts compile-html

NODE_ENV=production npx serve -l 3001 public
```
