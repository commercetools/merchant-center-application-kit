# @commercetools-frontend/application-config

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/application-config"><img src="https://badgen.net/npm/v/@commercetools-frontend/application-config" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/application-config"><img src="https://badgen.net/npm/v/@commercetools-frontend/application-config/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/application-config"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/application-config" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

This package contains utilities for configuring Custom Applications.

## Install

```bash
$ npm install --save @commercetools-frontend/application-config
```

## Configuration format

The Custom Application must be configured with a single configuration file, in JSON format. The file name can be one of:

- `.applicationconfigrc`
- `.applicationconfig.json`
- `applicationconfig.json`

The file is automatically loaded, as long as it's found in the project path. For that, the package uses the [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) library.

The configuration file follows a JSON schema that is also shipped with the package. The configuration file is validated upon starting the Custom Application.

By default the configuration file uses the `NODE_ENV` variable to determine which configuration to use. This can be overridden by using the custom environment variable `MC_APP_ENV`.

In the [test fixtures](./test/fixtures) folder you can see some examples of configuration.

### JSON Schema

To enable JSON schema validation for the Custom Application configuration, you can add reference the URL to the `schema.json` file provided in this package.

**Example setup for VSCode**

In the VSCode settings (either user settings or workspace settings), reference the schema JSON as described below:

```json
"json.schemas": [
  {
    "fileMatch": [
      "/.applicationconfigrc",
      "/.applicationconfig.json",
      "/applicationconfig.json"
    ],
    "url": "https://unpkg.com/@commercetools-frontend/application-config/schema.json"
  }
]
```

## API
