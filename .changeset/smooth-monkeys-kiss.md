---
'@commercetools-frontend/application-config': minor
'@commercetools-frontend/babel-preset-mc-app': minor
'@commercetools-frontend/cypress': minor
'@commercetools-frontend/eslint-config-mc-app': minor
'playground': minor
---

Add support for defining the Custom Application config as JS files.

Until now a Custom Application config file had to be defined as a JSON file with one of the following names:

- `.custom-application-configrc`
- `.custom-application-config.json`
- `custom-application-config.json`

On top of that, we built some "syntax features" to allow [variable placeholders](https://docs.commercetools.com/custom-applications/development/application-config#using-variable-placeholders) as a way to inject dynamic information into the static configuration file.

However, there are still some use cases where the information you need to provide must be imported from another file, for example a constants file or something similar.

To support such use cases, we now allow additional JS files to be used as a Custom Application config, specifically the following file extensions:

- `.js`
- `.cjs`
- `.mjs`
- `.ts`

The file must obviously return the configuration object.

> NOTE that you can still use variable placeholders.

For example:

```js
// constants.js
const entryPointUriPath = 'test';
module.exports = { entryPointUriPath };

// custom-application-config.js
const { entryPointUriPath } = require('./constants');

const name = 'Test application';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptions}
 */
const config = {
  name,
  cloudIdentifier: 'gcp-eu',
  entryPointUriPath,
  env: {
    production: {
      url: '${env:APP_URL}',
    },
  },
};
module.exports = config;
```
