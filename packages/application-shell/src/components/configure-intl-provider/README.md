# Configure <IntlProvider> With the Proper Locale

This component is used to configure `<IntlProvider>` based on the proper
`locale`.
The `locale` is determined by:

- The user setting, in case the user is logged in
- The browser language, in case the user is not logged in

## `<ConfigureIntlProvider>`

### Usage

```js
import * as i18nMessages from '@commercetools-frontend/i18n';
import ConfigureIntlProvider from '../configure-intl-provider';

<ConfigureIntlProvider i18n={i18nMessages}>
  <Main />
</ConfigureIntlProvider>;
```

### Properties

| Props      | Type            | Required | Values | Default | Description                                                       |
| ---------- | --------------- | :------: | ------ | ------- | ----------------------------------------------------------------- |
| `i18n`     | `object`        |    ✅    | -      | -       | The object containing the i18n messages in all different locales. |
| `children` | `React.Element` |    ✅    | -      | -       | -                                                                 |
