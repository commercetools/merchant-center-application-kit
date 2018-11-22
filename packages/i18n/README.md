# @commercetools-frontend/i18n

This package contains JSON data about the i18n messages from the different application-kit packages (e.g. `application-shell`, etc). Additionally, it also loads locale data for `moment` and `react-intl`, which is necessary for runtime usage.

Supported languages are:

- `en` (_default_)
- `de`
- `es`

## Install

```bash
$ npm install --save @commercetools-frontend/i18n
```

### Usage

> This package should not be used directly, the `application-shell` does that internally.

```js
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import { ConfigureIntlProvider } from '@commercetools-frontend/application-shell';

const myApplicationMessages = {
  en: {
    Title: 'Application Title',
  },
};

const MyApplication = props => (
  <AsyncLocaleData
    locale={props.user.locale}
    applicationMessages={myApplicationMessages}
  >
    {({ isLoading, language, messages }) => {
      if (isLoading) return null;

      return (
        <ConfigureIntlProvider language={language} messages={messages}>
          ...
        </ConfigureIntlProvider>
      );
    }}
  </AsyncLocaleData>
);
```

### Usage with code splitting

```js
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import { ConfigureIntlProvider } from '@commercetools-frontend/application-shell';

const loadApplicationMessagesForLanguage = lang =>
  new Promise((resolve, reject) =>
    import(`../../i18n/data/${lang}.json` /* webpackChunkName: "application-messages-[request]" */).then(
      response => {
        resolve(response.default);
      },
      error => {
        reject(error);
      }
    )
  );

const Application = props => (
  <AsyncLocaleData
    locale={props.user.locale}
    applicationMessages={loadApplicationMessagesForLanguage}
  >
    {({ isLoading, language, messages }) => {
      if (isLoading) return null;

      return (
        <ConfigureIntlProvider language={language} messages={messages}>
          ...
        </ConfigureIntlProvider>
      );
    }}
  </AsyncLocaleData>
);
```

### Generating translation files

After you have defined the `intl` messages in your React components, you should extract those messages into `core.json`. This file contains a key-value map of the message `id` and the message value.

To extract the messages simply run `mc-scripts extract-intl [options]`.

### Syncing translations with Transifex

We use Transifex as our translation tool. Once we have extracted new messages into `core.json`, the file will be pushed to Transifex from CircleCI (see `push_translations` job).

When finally the translations have been provided in Transifex, we need to pull them back into our codebase. This process will update the `<lang>.json` files depending on the synced translations.
