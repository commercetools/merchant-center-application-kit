# @commercetools-frontend/cypress

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/cypress"><img src="https://badgen.net/npm/v/@commercetools-frontend/cypress" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/cypress"><img src="https://badgen.net/npm/v/@commercetools-frontend/cypress/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/cypress"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/cypress" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Cypress commands and utilities for Custom Applications.

## Install

```bash
$ npm install --save @commercetools-frontend/cypress
```

## Usage

This package extends Cypress' `cy` command.

Add this line to your project's `cypress/plugins/index.js`:

```javascript
const customApplications = require('@commercetools-frontend/cypress/task');

module.exports = (on, config) => {
  on('task', {
    ...customApplications,
  });
};
```

Add this line to your project's `cypress/support/commands.js`:

```javascript
import '@commercetools-frontend/cypress/add-commands';
```

### Commands

- `cy.loginByOidc({ entryPointUriPath })`

  This command perform the user login using the OIDC workflow to retrieve the session token.<br/>
  The command also requires to load the `custom-application-config.json` (automatically done via the Cypress task) and therefore it may need to load environment variables in case the application config uses environment placeholders.<br/>
  By default, the `.env` and `.env.local` files are attempted to be loaded from the application folder. You can pass a `dotfiles` option to pass a list of names/paths relative to the application folder in case the files in the project have a different name/location.

  > The command also requires the following environment variables to be available: `PROJECT_KEY`, `LOGIN_USER`, `LOGIN_PASSWORD`.
