# @commercetools-frontend/i18n

MC messages and locale data (moment and react-intl).
Supported languages:

- `en`
- `de`
- `es`

## Install

```bash
$ npm install --save @commercetools-frontend/i18n
```

### Usage

```js
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import { ConfigureIntlProvider } from '@commercetools-frontend/application-shell';

const applicationMessages = {
  en: {
    Title: 'Application Title',
  },
};

const Application = props => (
  <AsyncLocaleData
    locale={props.user.language}
    applicationMessages={applicationMessages}
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

### Async Usage

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
    locale={props.user.language}
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
