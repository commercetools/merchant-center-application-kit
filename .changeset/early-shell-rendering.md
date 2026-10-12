---
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/constants': minor
---

Add an opt-in `enableEarlyShellRendering` runtime option that renders the shell chrome (grid, AppBar and NavBar) before the locale data is available.

Today the whole authenticated shell waits behind `ConfigureIntlProvider`, which renders nothing until both the user and the locale catalogue have loaded, so the HTML skeleton stays up for that whole time. With the option on, the chrome renders on the first pass inside its own `IntlProvider` and replaces the HTML skeleton as soon as it mounts. Until the paint gate opens it shows its loading placeholders (no user in the AppBar, the NavBar skeleton), so a wrongly guessed locale never shows up in the user's header or menu. The routed content shows the application loader until the gate opens. The project query, which the NavBar owns, now starts on the first pass instead of after the locale data.

The option is off by default. To try it, set it in the application config:

```js
additionalEnv: {
  enableEarlyShellRendering: 'true',
},
```

It is read from `window.app` rather than a feature flag because the flag provider is mounted inside the boundary the option decides.
