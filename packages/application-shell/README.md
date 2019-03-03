# `@commercetools-frontend/application-shell`

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/application-shell"><img src="https://badgen.net/npm/v/@commercetools-frontend/application-shell" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/application-shell"><img src="https://badgen.net/npm/v/@commercetools-frontend/application-shell/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/application-shell"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/application-shell" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

This module contains the main _React component_ `<ApplicationShell>` for
building _MC applications_.

It also provides a set of complementary components to provide additional
features to the application.

## Install

```bash
$ npm install --save @commercetools-frontend/application-shell
```

## Usage

For an usage example, we recommend to look at the [application templates](https://github.com/commercetools/merchant-center-application-kit/tree/master/application-templates) examples or at the [Playground](https://github.com/commercetools/merchant-center-application-kit/tree/master/playground) application.

### Loading i18n messages with code splitting

```js
// define a function that accepts a language, and returns a promise.
const loadApplicationMessagesForLanguage = lang =>
  import(`../../i18n/data/${lang}.json` /* webpackChunkName: "application-messages-[request]" */).then(
    response => response.default
  );

// pass this function to the <ApplicationShell />

const EntryPoint = () => (
  <ApplicationShell
    applicationMessages={loadApplicationMessagesForLanguage}
    // ...other props
  />
);
```

## Props

| Props                            | Type               |        Required         | Default | Description                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------------------- | ------------------ | :---------------------: | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationMessages`            | `object` or `func` |           ✅            | -       | Either an object containing all the translated messages per locale (`{ "en": { "Welcome": "Welcome" }, "de": { "Welcome": "Wilkommen" }}`), or a function that returns a Promise that resolves to such an object.                                                                                                                                                                |
| `configuration`                  | `object`           |           ✅            | -       | The current `window.app`.                                                                                                                                                                                                                                                                                                                                                        |
| `render`                         | `func`             |           ✅            | -       | The function to render the application specific part. This function is executed only when the application specific part needs to be rendered.                                                                                                                                                                                                                                    |
| `trackingEventWhitelist`         | `object`           |           ✅            | -       | An object containing a map of tracking events (_this mapping is required for backwards compatibility, it might be removed in the future_)                                                                                                                                                                                                                                        |
| `onRegisterErrorListeners`       | `func`             |           ✅            | -       | A callback function to setup global event listeners, called when the `ApplicationShell` is mounted. The function is called with the following named arguments: `dispatch` (the dispatch function of Redux).                                                                                                                                                                      |
| `DEV_ONLY__loadNavbarMenuConfig` | `func`             | ✅ (`development` only) | -       | A function that returns a Promise to load the `menu.json` config for the navigation component on the left side. We usually recommend to use a dynamic `import` to load the file, so that bundlers can create a split point. **NOTE that this is only available in `development` mode, in `production` mode the menu config is loaded from a remote server.**                     |
| `DEV_ONLY__loadAppbarMenuConfig` | `func`             | ✅ (`development` only) | -       | A function that returns a Promise to load the `menu.json` config for the account links in the application bar component on the top. We usually recommend to use a dynamic `import` to load the file, so that bundlers can create a split point. **NOTE that this is only available in `development` mode, in `production` mode the menu config is loaded from a remote server.** |

## Testing

This package contains test-utils which enable you to test your components as if they were rendered inside `ApplicationShell`'s `render` prop using [`react-testing-library`](https://github.com/kentcdodds/react-testing-library). It can simulate the user, project, permissions, feature flags, routing and more. Check out [test-utils/README.md](./test-utils/README.md).
