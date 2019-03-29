# @commercetools-frontend/mc-html-template

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/mc-html-template"><img src="https://badgen.net/npm/v/@commercetools-frontend/mc-html-template" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/mc-html-template"><img src="https://badgen.net/npm/v/@commercetools-frontend/mc-html-template/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/mc-html-template"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/mc-html-template" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

This package contains utils and scripts related to the `index.html` for a MC application in production.

## Install

```bash
$ npm install --save @commercetools-frontend/mc-html-template
```

## API

#### `generateTemplate({ cssChunks: Array<cssPath>, scriptChunks: Array<scriptPath> }): String`

This method will return the compiled HTML document with the CSS/JS scripts injected.

> NOTE that the HTML document will still have the **placeholders** (see `replaceHtmlPlaceholders`)

#### `replaceHtmlPlaceholders(html: String, env: Object): String`

This method will replace the **placeholders** defined in the HTML document based on the values in the `env.json`. To load the `env.json` config, you can use the `loadEnv` method.

This method should be used as the final step to get the fully compiled `index.html`.

At the moment we define the following placeholders:

- `__CDN_URL__`: the `cdnUrl` value defined in the `env.json`
- `__MC_API_URL__`: the `mcApiUrl` value defined in the `env.json`
- `__LOADING_SCREEN_CSS__`: (_defined internally_) the CSS for the loading animation in case the page takes longer to load
- `__LOADING_SCREEN_JS__`: (_defined internally_) the JS for the loading animation in case the page takes longer to load
- `__APP_ENVIRONMENT__`: the sanitized `env.json`, which will be available at the global variable `window.app`
- `__DATALAYER_JS__`: the initial configuration for GTM, in case the `trackingGtm` is defined in the `env.json`
- `__GTM_SCRIPT__`: the actual GTM script, in case the `trackingGtm` is defined in the `env.json`

#### `loadEnv(configPath: String): Object`

This method will attempt to load and parse the `env.json` file, performing some validation and returning the parsed JSON.

#### `loadEnv(configPath: String): Object`

This method will attempt to load and parse the `env.json` file, performing some validation and returning the parsed JSON.

#### `loadHeaders(env: Object, { cspPath: String }): Object`

This method will return the security headers to be used on the server response, serving the `index.html`.

The `env` argument, is the parsed `env.json` file (see `loadEnv`).

Optionally, you can pass the path to the `csp.json` that contains custom CSP directives. Those will be merged with the default ones.

The final headers object contains the following headers:

```json
{
  "Strict-Transport-Security": "max-age=31536000",
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "..."
}
```

## Bundler entry points

The package exposes some special entry points used by specific bundlers to use the HTML template.

#### Webpack

If you use Webpack with the `HtmlWebpackPlugin`, you can pass the `webpack` entry point that will map the Webpack template params to our generic `generateTemplate` method.

```js
new HtmlWebpackPlugin({
  template: require.resolve(
    '@commercetools-frontend/mc-html-template/webpack'
  ),
  // ...
}),
```
