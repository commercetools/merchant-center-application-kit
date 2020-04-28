# @commercetools-backend/loggers

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-backend/loggers"><img src="https://badgen.net/npm/v/@commercetools-backend/loggers" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-backend/loggers"><img src="https://badgen.net/npm/v/@commercetools-backend/loggers/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-backend/loggers"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-backend/loggers" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Opinionated JSON loggers for HTTP server applications.

## Install

```bash
$ npm install --save @commercetools-backend/loggers
```

## Access logger

Creates a logger to be used for HTTP requests access logs.

```js
const { createAccessLogger } = require('@commercetools-backend/loggers');

app.use(createAccessLogger());
```

### Access logger options

- `ignoreUrls` (_Array of string_): A list of URL paths to be ignored from being logged.

## Application logger

Creates a logger to be used programmatically in the application code.

```js
const { createApplicationLogger } = require('@commercetools-backend/loggers');

const app = createApplicationLogger();

app.info('Hey there', { meta: { name: 'Tom' } });
```

## Error report logger (Sentry)

Creates a logger to be used for error reporting with Sentry.

```js
const { createErrorReportLogger } = require('@commercetools-backend/loggers');

const { sentryRequestHandler } = createErrorReportLogger();

app.use(sentryRequestHandler);
```

```js
const { createErrorReportLogger } = require('@commercetools-backend/loggers');

const { trackError } = createErrorReportLogger();

trackError(error, { request }, (errorId) => {
  if (errorId) {
    // Attach the Sentry error id to the custom response header
    response.setHeader('X-Sentry-Error-Id', errorId);
  }
  response.end();
});
```

### Error report logger options

- `sentry` (_object_): An optional configuration object for Sentry.
  - `sentry.DSN` (_string_): The DSN value of your Sentry project.
  - `sentry.role` (_string_): The value for the `role` Sentry tag.
  - `sentry.environment` (_string_): The value for the `environment` Sentry tag.
- `errorMessageBlacklist` (_Array of string or RegExp_): A list of error messages for which the error should not be reported, if the error message matches.
