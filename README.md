<h2 align="center">commercetools UI Application Kit 💅</h2>
<p align="center">
  <i>✨ Monorepository with tools and components for developing Merchant Center Applications 🛠</i>
</p>
<p align="center">
  <a href="https://github.com/commercetools/merchant-center-application-kit/releases"><img src="https://badgen.net/github/release/commercetools/merchant-center-application-kit" alt="Latest release" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

> To help you developing Merchant Center Applications, be sure to check out our [ui-kit](https://github.com/commercetools/ui-kit) components library.

## Getting started

If you are developing a Merchant Center application, you can start by installing one of our [templates](./application-templates) using the `create-mc-app` CLI.

```bash
$ npm install --global @commercetools-frontend/create-mc-app
$ create-mc-app my-new-custom-application-project --template starter

# or

$ npx @commercetools-frontend/create-mc-app my-new-custom-application-project --template starter
```

## Developing application-kit packages

### Initial Installation

1. Add necessary environment variables

   Navigate to `merchant_center_application_kit/playground`, duplicate `.env.local.template`, name the duplicate `.env.local` and add the necessary values.

2. Build and run the application kit

   First build the application. In a new terminal window, navigate to the project root directory and run:

   ```bash
   $  yarn build
   ```

   Once the build is complete, you can run the application in watch mode by running:

   ```bash
   $  yarn build:watch
   ```

3. Update Playground Permissions:

   `PERMISSIONS.ViewPlaygroundStateMachines` is not necessary and you might need to remove it in order to be able to view the application.
   You'll need to remove it twice in `custom-application-config.mjs` and once in `routes.js` so that `permissions`/`demandedPermissions` are empty arrays:

   `custom-application-config.mjs`

   ```bash
   permissions: [],
   submenuLinks: [
       {
         uriPath: 'echo-server',
         permissions: [],
         defaultLabel: '${intl:en:Menu.EchoServer}',
         labelAllLocales: [
           {
             locale: 'en',
             value: '${intl:en:Menu.EchoServer}',
           },
           {
             locale: 'de',
             value: '${intl:de:Menu.EchoServer}',
           },
         ],
       },
     ],
   ```

   `routes.js`

   ```bash
     const canViewStateMachines = useIsAuthorized({
       demandedPermissions: [],
     });
   ```

4. Build and run the [playground application](./playground):

   In a new terminal window, navigate to the project root directory and run:

   ```bash
   $ yarn playground:start
   ```

### Running the App Kit and Playground After Initial Installation

> The playground application consumes the app-kit dependencies as es modules, which means you need to bundle the packages first. We recommend to bundle the packages in watch mode in one terminal process and start the playground app in another terminal process.

- Open 2 terminal windows

  - In the first terminal run

    ```bash
      $ yarn build:watch
    ```

  - Once the watch process has completed and is listening, in the second terminal window run

    ```bash
      $ yarn playground:start
    ```

## To run the tests:

```bash
$ yarn test

# or
$ yarn test:watch
```

## To Build the application bundles:

```bash
$ yarn build

# or
$ yarn build:bundles:watch
```

## Documentation

Please look at the single packages in [`packages` folder](./packages) for documentation specific of each package.

_Documentation website coming soon_

## Contributing

Contributions are welcomed. Please have a read at our [contribution guidelines](CONTRIBUTING.md).
