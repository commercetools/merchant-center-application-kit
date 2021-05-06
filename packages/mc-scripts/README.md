# @commercetools-frontend/mc-scripts

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/mc-scripts"><img src="https://badgen.net/npm/v/@commercetools-frontend/mc-scripts" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/mc-scripts"><img src="https://badgen.net/npm/v/@commercetools-frontend/mc-scripts/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/mc-scripts"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/mc-scripts" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Configuration and scripts for developing a Custom Application.

## Install

```bash
$ npm install --save @commercetools-frontend/mc-scripts
```

## Usage

The CLI provides some commands. See https://docs.commercetools.com/custom-applications/development/available-scripts.

## Using dotenv files (`.env`)

Now the `mc-scripts` CLI has the dotenv features built-in.

By default, the following dotenv files are loaded according to the current environment values specified on each command: `process.MC_APP_ENV` or `process.NODE_ENV`. The priority of how the files are merged and overwritten goes from top to bottom (highest defined variable overrides lower).

- `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.
- `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
- `.env.local`: Local overrides. **This file is loaded for all environments except test.**
- `.env`

Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

Furthermore, you can pass additional dotenv files by using the following option:

- `--env <path>`: Parses the file path as a dotenv file and adds the variables to the environment. Multiple flags are allowed.

These files will take higher priority over the standard environment dotenv files.

## API usage

The package exports some functions to configure Webpack:

```js
const {
  createWebpackConfigForDevelopment,
  createWebpackConfigForProduction,
  vendorsToCompile,
} = require('@commercetools-frontend/mc-scripts');
```
