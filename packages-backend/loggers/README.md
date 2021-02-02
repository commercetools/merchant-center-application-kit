# @commercetools-backend/loggers

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-backend/loggers"><img src="https://badgen.net/npm/v/@commercetools-backend/loggers" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-backend/loggers"><img src="https://badgen.net/npm/v/@commercetools-backend/loggers/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-backend/loggers"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-backend/loggers" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Opinionated JSON loggers for HTTP server applications.

## Install

```bash
$ npm install --save @commercetools-backend/loggers
```

## Middlewares

### Access logger

Creates a logger to be used for HTTP requests access logs.

```js
const {
  createAccessLoggerMiddleware,
} = require('@commercetools-backend/loggers');

app.use(createAccessLoggerMiddleware());
```

**Options**

- `level` (_string_): The log level to be used. **Default: `info`**
- `silent` (_boolean_): In case logs should be skipped. **Default: `false`**
- `json` (_boolean_): To use the JSON formatter, otherwise falls back to CLI format. It's recommended to use the JSON formatter on production.
- `formatters` (_Array of Winston formatters_): In case you want to pass additional Winston formatters.
- `ignoreUrls` (_Array of string_): A list of URL paths to be ignored from being logged.

## Application logger

Creates a logger to be used programmatically in the application code.

```js
const { createApplicationLogger } = require('@commercetools-backend/loggers');

const app = createApplicationLogger();

app.info('Hey there', { meta: { name: 'Tom' } });
```

**Options**

- `level` (_string_): The log level to be used. **Default: `info`**
- `silent` (_boolean_): In case logs should be skipped. **Default: `false`**
- `json` (_boolean_): To use the JSON formatter, otherwise falls back to CLI format. It's recommended to use the JSON formatter on production.
- `formatters` (_Array of Winston formatters_): In case you want to pass additional Winston formatters.

## Formatters

The package provides some come Winston formatters that can be passed to the given loggers.

### Rewrite fields

This formatter allows to rewrite fields from the JSON logger. It can be useful for redacting insecure information, or to map certain fields to a specific format (for example for Kibana).

```js
const {
  createAccessLoggerMiddleware,
  rewriteFieldsFormatter,
} = require('@commercetools-backend/loggers');

app.use(
  createAccessLoggerMiddleware({
    formatters: [
      rewriteFieldsFormatter({
        fields: [
          { from: 'level', to: 'logLevel' },
          { from: 'meta.error.message', to: 'meta.errorMessage' },
          {
            from: 'meta.error',
            to: 'meta.errorJsonString',
            replaceValue: (value) => JSON.stringify(value),
          },
        ],
      }),
    ],
  })
);
```

**Options**

- `fields` (_Array of RewriteField_): A `RewriteField` is an object with the following properties:
  - `from` (_string_): A JSON path to one of the fields of the log information that needs to be rewritten. The field will be deleted.
  - `to` (_string_): A JSON path to the new field that should be created.
  - `replaceValue` (_function_): An optional function that takes the value from the original field and returns a new value for the field. It can be used for example to serialize the value with `JSON.stringify`.
