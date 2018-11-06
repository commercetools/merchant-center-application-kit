# @commercetools-frontend/i18n

MC i18n messages.
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
import * as i18n from '@commercetools-frontend/i18n';

// i18n.en
// i18n.de
```

### Generating translation files

After you have defined the `intl` messages in your React components, you should extract those messages into `core.json`. This file contains a key-value map of the message `id` and the message value.

To extract the messages simply run `mc-scripts extract-intl [options]`.

### Syncing translations with Transifex

We use Transifex as our translation tool. Once we have extracted new messages into `core.json`, the file will be pushed to Transifex from CircleCI (see `push_translations` job).

When finally the translations have been provided in Transifex, we need to pull them back into our codebase. This process will update the `<lang>.json` files depending on the synced translations.
