<h1><p align="center">🚧 Work In Progress 🚧</p></h1>

# `@commercetools-local/application-shell`

This module contains the main _React component_ `<ApplicationShell>` for
building _MC applications_.

It also provides a set of complementary components to provide additional
features to the application.

> Some of those components are temporary to ensure backwards compatibilities
> with the current setup.

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationShell from '@commercetools/application-shell';

const MyApplication = () => (
  <ApplicationShell
    i18n={/* map of translated messages keyed by locale */}
    configuration={window.app}
    menuItems={/* list of menu items definition */}
    i18n={i18n}
    configuration={window.app}
    menuItems={testMenuItems}
    render={() => (
      /*
        This is the part where you "render" your application.
        Your application defines the routes itself which can be simply rendered
        as react component `Route`, the main `Router` is defined within the
        `ApplicationShell`.
        Additionally the `application-shell` package will provide all the
        necessary complementary tools to access application specific stuff
        like state, HoC, etc.
      */
      <StoreProvider store={store}>
        <Switch>
          <Route path="/:projectKey/dashboard" component={AsyncDashboard} />
          <Route path="/:projectKey/products" component={AsyncProducts} />
        </Switch>
      </StoreProvider>
    )}
  />
)

ReactDOM.render(<MyApplication />, document.getElementById('root'));
```

## Props

| Props           | Type     | Required | Default | Description                                                                                                                                   |
| --------------- | -------- | :------: | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18n`          | `object` |    ✅    | -       | An object containing all the translated messages per locale (`{ "en": { "Welcome": "Welcome" }, "de": { "Welcome": "Wilkommen" }}`).          |
| `configuration` | `object` |    ✅    | -       | The current `window.app`.                                                                                                                     |
| `menuItems`     | `array`  |    ✅    | -       | A list of menu item definitions (see `./src/example/fixtures/menu-items.js`).                                                                 |
| `render`        | `func`   |    ✅    | -       | The function to render the application specific part. This function is executed only when the application specific part needs to be rendered. |

# Development

This module contains the
[folder structure](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#folder-structure)
required by _CRA_, which allows to easily start a react application using
`toolbox/start.js`.

This is very useful for development to work on this module in isolation.

```bash
$ cd ./packages-shared/application-shell
$ yarn start
```

> The _exported_ package however will only contain the react components.
