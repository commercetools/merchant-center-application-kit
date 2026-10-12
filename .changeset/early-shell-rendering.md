---
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/constants': minor
---

Add an opt-in `enableEarlyShellRendering` runtime option that renders the shell chrome (grid, AppBar and NavBar) before the locale data is available.

Today the whole authenticated shell waits behind `ConfigureIntlProvider`, which renders nothing until both the user and the locale catalogue have loaded, so the HTML skeleton stays up for that whole time. With the option on, the chrome renders on the first pass inside its own `IntlProvider`, which uses whatever catalogue `AsyncLocaleData` has loaded so far and falls back to English default messages before the first one arrives. The HTML skeleton is removed as soon as the chrome mounts. Only the routed content still waits for the paint gate, showing the application loader in the meantime.

The option is off by default. To try it, set it in the application config:

```js
additionalEnv: {
  enableEarlyShellRendering: 'true',
},
```

It is read from `window.app` rather than a feature flag because the flag provider is mounted inside the boundary the option decides.
