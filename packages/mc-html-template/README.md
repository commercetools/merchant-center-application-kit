# @commercetools-frontend/mc-html-template

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/mc-html-template"><img src="https://badgen.net/npm/v/@commercetools-frontend/mc-html-template" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/mc-html-template"><img src="https://badgen.net/npm/v/@commercetools-frontend/mc-html-template/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/mc-html-template"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/mc-html-template" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

This package contains utils and scripts related to the `index.html` for a Merchant Center customization.

## Install

```bash
$ npm install --save @commercetools-frontend/mc-html-template
```

## API

### `generateTemplate`

This method will return the template HTML document with the provided CSS/JS scripts injected.

> NOTE that the HTML document will still have the **placeholders** (see `replaceHtmlPlaceholders`)

```ts
type TGenerateTemplateOptions = {
  cssImports?: string[];
  scriptImports?: string[];
};

function generateTemplate({
  cssImports = [],
  scriptImports = [],
}: TGenerateTemplateOptions);
```

### `replaceHtmlPlaceholders`

This method will replace the **placeholders** defined in the HTML document based on the application config.

This method should be used as the final step to get the fully compiled `index.html`.

At the moment we define the following placeholders:

- `__CDN_URL__`: the `cdnUrl` value defined in the application config
- `__MC_API_URL__`: the `mcApiUrl` value defined in the application config
- `__LOADING_SCREEN_CSS__`: (_defined internally_) the CSS for the loading animation in case the page takes longer to load
- `__LOADING_SCREEN_JS__`: (_defined internally_) the JS for the loading animation in case the page takes longer to load
- `__APP_ENVIRONMENT__`: the sanitized application config environment, which will be available at the global variable `window.app`
- `__CSP__`: the generated `Content-Security-Policy` directives, defined as an HTML meta tag

```ts
type TReplaceHtmlPlaceholdersOptions = {
  env: ApplicationRuntimeConfig['env'];
  headers: Record<string, string | undefined>;
};

function replaceHtmlPlaceholders(
  indexHtmlContent: string,
  options: TReplaceHtmlPlaceholdersOptions
): string;
```

### `compileHtml`

This method will compile the template HTML document.

```ts
type TCompileHtmlResult = {
  env: ApplicationRuntimeConfig['env'];
  headers: Record<string, string | undefined>;
  indexHtmlContent: string;
};

async function compileHtml(
  indexHtmlTemplatePath: string
): Promise<TCompileHtmlResult>;
```

### `processHeaders`

This method will return the security headers to be used on the server response, serving the `index.html`.

The `applicationConfig.env` is the processed application environment that would be injected as the `window.app`.
The `applicationConfig.headers` is the processed application headers provided by the user.

The return value of the `processHeaders` function contains the following ready-to-use HTTP headers:

```json
{
  "Strict-Transport-Security": "max-age=31536000",
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy": "...",
  "Feature-Policies": "..."
}
```

```ts
function processHeaders(
  applicationConfig: ApplicationRuntimeConfig
): Record<string, string | undefined>;
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
