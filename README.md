<h1><p align="center">🚧 Work In Progress 🚧</p></h1>

# `@commercetools-local/application-shell`

This module contains the main _React component_ `<ApplicationShell>` for building _MC applications_.

It also provides a set of complementary components to provide additional features to the application.

> Some of those components are temporary to ensure backwards compatibilities with the current setup.

## Usage

```js
// dashboard.js
import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationShell from '@commercetools/application-shell';

ReactDOM.render(
  <ApplicationShell
    configuration={window.app}
    menuLinks={{...}}
    // NOTE: the API of the component still needs to be defined
  >
    {/*
      This is the part where you "render" your application.
      Your application defines the routes itself which can be simply rendered
      as react component `Route`, the main `Router` is defined within the
      `ApplicationShell`.
      Additionally the `application-shell` package will provide all the
      necessary complementary tools to access application specific stuff
      like state, HoC, etc.
    */}
    <Dashboard />
    <Route path="/dashboard/some-other-route" component={SomeOtherDashboardView} />
  </ApplicationShell>,
  document.getElementById('root')
);
```

## Development
This module contains the [folder structure](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#folder-structure) required by _CRA_, which allows to easily start a react application using `react-scripts`.

> Make sure to have `react-scripts` installed globally.

This is very useful for development to work on this module in isolation.

```bash
$ cd ./packages/application-shell
$ yarn start
```

> The _exported_ package however will only contain the react components.
