# @commercetools-frontend/cypress

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/cypress"><img src="https://badgen.net/npm/v/@commercetools-frontend/cypress" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/cypress"><img src="https://badgen.net/npm/v/@commercetools-frontend/cypress/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/cypress"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/cypress" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
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
import '@commercetools-frontend/cypress/add-commands'
```

### Commands

* `cy.loginByOidc({ entryPointUriPath })`
