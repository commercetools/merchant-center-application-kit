---
'merchant-center-application-template-starter': minor
'@commercetools-frontend/mc-scripts': minor
'playground': minor
---

The `webpack.config.dev.js` and `webpack.config.prod.js` files are not required anymore to be defined in the application folder and can be removed. The default behavior is now implicitly implemented in case the config file is not found. The default behavior requires the following paths to exist:

- `<application_folder>/dist`
- `<application_folder>/src`
- `<application_folder>/src/index.js`

> You can still use the config files if you need to configure more specific behaviors.
