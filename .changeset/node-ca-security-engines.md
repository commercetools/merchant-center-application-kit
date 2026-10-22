---
'@commercetools-backend/eslint-config-node': minor
'@commercetools-backend/express': minor
'@commercetools-backend/loggers': minor
'@commercetools-frontend/application-config': minor
'@commercetools-frontend/application-shell-connectors': minor
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/babel-preset-mc-app': minor
'@commercetools-frontend/codemod': minor
'@commercetools-frontend/create-mc-app': minor
'@commercetools-frontend/eslint-config-mc-app': minor
'@commercetools-frontend/mc-dev-authentication': minor
'@commercetools-frontend/mc-html-template': minor
'@commercetools-frontend/mc-scripts': minor
---

Raise the minimum supported Node.js version to `^22.23.4 || ^24.22.1 || >=26.12.1`.

These are the first Node.js releases that remove the compromised `emSign ECC Root CA - G3`, `emSign Root CA - C1` and `emSign ECC Root CA - C3` certificates from the bundled root store. Node.js 18, 20, 21 and 25 do not receive a fix and are no longer supported.

This is released as a minor version as a security exception. If you run Custom Applications or Custom Views on an older Node.js version, upgrade Node.js to one of the versions above and rebuild your images.
