# Configure <IntlProvider> with the proper locale

This component is used to configure `<IntlProvider>` based on the proper
`locale`.
The `locale` is determined by:
* the user setting, in case the user is logged in
* the browser language, in case the user is not logged in

## `<ConfigureIntlProvider>`

### Usage

```js
import ConfigureIntlProvider from '../configure-intl-provider'

<ConfigureIntlProvider i18n={i18nMessages}>
  <Main />
</ConfigureIntlProvider>
```

### Properties

| Props | Type | Required | Values | Default  | Description |
| --- | --- | :---: | --- | --- | --- |
| `i18n` | `object` | ✅ | - | - | The object containing the i18n messages in all different locales. |
| `children` | `React.Element` | ✅ | - | - | - |
