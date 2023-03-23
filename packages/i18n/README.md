# @commercetools-frontend/i18n

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/i18n"><img src="https://badgen.net/npm/v/@commercetools-frontend/i18n" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/i18n"><img src="https://badgen.net/npm/v/@commercetools-frontend/i18n/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/i18n"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/i18n" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

This package contains JSON data about the i18n messages from the different application-kit packages (e.g. `application-shell`, etc). Additionally, it also loads locale data for `moment` and `react-intl`, which is necessary for runtime usage.

## Install

```bash
$ npm install --save @commercetools-frontend/i18n
```

## Supported locales

- `en`
- `de`
- `es`
- `fr-FR`
- `zh-CN`

## Usage

> The `<AsyncLocaleData>` component, or the `useAsyncLocaleData` hook, are internally used by the `<ApplicationShell>` and there is no need to use them directly.
> If you do need to load translation files asynchronously, we expose an additional hook `useAsyncIntlMessages` that you can use for that.
> The difference between those is that the "async locale data" components additionally load the application-kit and ui-kit messages, as well as the moment locales.

### Using a React component with render props

**With static messages**

```js
import { IntlProvider } from 'react-intl';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';

const myApplicationMessages = {
  en: {
    Title: 'Application Title',
  },
};

const Application = (props) => (
  <AsyncLocaleData
    locale={props.user.locale}
    applicationMessages={myApplicationMessages}
  >
    {({ isLoading, locale, messages }) => {
      if (isLoading) return null;

      return (
        <IntlProvider locale={locale} messages={messages}>
          ...
        </IntlProvider>
      );
    }}
  </AsyncLocaleData>
);
```

**With dynamic loaded messages (code splitting)**

```js
import { IntlProvider } from 'react-intl';
import {
  AsyncLocaleData,
  parseChunkImport,
} from '@commercetools-frontend/i18n';

const loadMessages = (lang) => {
  let loadAppI18nPromise;
  switch (lang) {
    case 'de':
      loadAppI18nPromise = import(
        './i18n/data/de.json' /* webpackChunkName: "app-i18n-de" */
      );
      break;
    case 'es':
      loadAppI18nPromise = import(
        './i18n/data/es.json' /* webpackChunkName: "app-i18n-es" */
      );
      break;
    default:
      loadAppI18nPromise = import(
        './i18n/data/en.json' /* webpackChunkName: "app-i18n-en" */
      );
  }

  return loadAppI18nPromise.then(
    (result) => parseChunkImport(result),
    (error) => {
      // eslint-disable-next-line no-console
      console.warn(
        `Something went wrong while loading the app messages for ${lang}`,
        error
      );

      return {};
    }
  );
};

const Application = (props) => (
  <AsyncLocaleData
    locale={props.user.locale}
    applicationMessages={loadMessages}
  >
    {({ isLoading, locale, messages }) => {
      if (isLoading) return null;

      return (
        <IntlProvider locale={locale} messages={messages}>
          ...
        </IntlProvider>
      );
    }}
  </AsyncLocaleData>
);
```

### Using a React hook

Similarly to the `<AsyncLocaleData>`, we also expose a React hook.

```js
import { IntlProvider } from 'react-intl';
import { useAsyncLocaleData } from '@commercetools-frontend/i18n';

const Application = (props) => {
  const { isLoading, locale, messages } = useAsyncLocaleData({
    locale: props.locale,
    applicationMessages: loadMessages,
  });

  if (isLoading) return null;
  return (
    <IntlProvider locale={locale} messages={messages}>
      ...
    </IntlProvider>
  );
};
```

## Generating translation files

After you have defined the `intl` messages in your React components, you should extract those messages into the source file `core.json`. This file contains a key-value map of the message `id` and the message value.

To extract the messages simply run `mc-scripts extract-intl [options]`.

## Syncing translations with Transifex

We use [Transifex](https://www.transifex.com/) as our translation tool. Once we have extracted new messages into the source file `core.json` (see `mc-scripts extract-inl`) and pushed/merged to `main`, the file will be automatically synced with Transifex using the [Transifex GitHub Integration](https://docs.transifex.com/integrations/transifex-github-integration).

Translations that have been **reviewed** in Transifex will be automatically pushed back to GitHub by the Transifex Bot via a Pull Request.

## Shared messages

This package exposes some "shared" messages that can be used for different things like buttons, etc. instead of having duplicated messages.

The messages are exported as `sharedMessages` property.
