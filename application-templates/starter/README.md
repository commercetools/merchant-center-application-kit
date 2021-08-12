<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png">
  </a>
  <b>Custom Application Starter</b>
</p>

This is the `starter` template to [develop Custom Applications](https://docs.commercetools.com/custom-applications/) for the Merchant Center.

## Installation

Install the template using the `npx` command. Replace `<folder_name>` with the name of the folder where the template should be installed into.

```bash
$ npx @commercetools-frontend/create-mc-app <folder_name> --template starter
```

You can also install the `@commercetools-frontend/create-mc-app` CLI globally:

```bash
# Using yarn
$ yarn global add @commercetools-frontend/create-mc-app
$ create-mc-app <folder_name> --template starter

# Using npm
$ npm install --global @commercetools-frontend/create-mc-app
$ create-mc-app <folder_name> --template starter
```

## Configuring the Custom Application

Once the template has been installed, you need to check and adjust the `custom-application-config.json` file accordingly. [Reference: Custom Application Config](https://docs.commercetools.com/custom-applications/development/application-config).

> You can additionally configure [editor support](https://docs.commercetools.com/custom-applications/development/application-config#editor-support) to provide hints and code completion.

The template provides the bare minimum configuration setup, so you might not need to change anything specific for now.

## Developing the Custom Application

To develop the Custom Application in development mode, use the `start` command in `package.json`.

Important commands:

* `test`: runs tests using Jest.
* `build`: [builds the production bundles](https://docs.commercetools.com/custom-applications/development/available-scripts#mc-scripts-build) and outputs them in `dist`.
* `compile-html`: [compiles the application](https://docs.commercetools.com/custom-applications/development/available-scripts#mc-scripts-compile-html) `index.html` based on the application config.
* `extract-intl`: extracts [messages for translations](https://docs.commercetools.com/custom-applications/development/translations).

Other useful commands:

* `compile-html:local` and `start:prod:local`: use these commands to test the application locally in production mode.
* `versions:*`: use these commands to update dependency versions in bulk related to Custom Applications.
