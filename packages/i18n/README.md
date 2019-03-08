# @commercetools-frontend/i18n

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/i18n"><img src="https://badgen.net/npm/v/@commercetools-frontend/i18n" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/i18n"><img src="https://badgen.net/npm/v/@commercetools-frontend/i18n/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/i18n"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/i18n" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

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

After you have defined the `intl` messages in your React components, you should extract those messages into the source file `core.json`. This file contains a key-value map of the message `id` and the message value.

To extract the messages simply run `mc-scripts extract-intl [options]`.

### Syncing translations with Transifex

We use [Transifex](https://www.transifex.com/) as our translation tool. Once we have extracted new messages into the source file `core.json` (see `mc-scripts extract-inl`) and pushed/merged to `master`, the file will be automatically synced with Transifex using the [Transifex GitHub Integration](https://docs.transifex.com/integrations/transifex-github-integration).

Translations that have been **reviewed** in Transifex will be automatically pushed back to GitHub by the Transifex Bot via a Pull Request.
