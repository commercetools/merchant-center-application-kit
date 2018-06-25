# I18n

This package contains all the intl messages and translations.

Supported languages:

- `en`
- `de`

### Usage

```js
import * as i18n from '@commercetools-frontend/i18n';

// i18n.en
// i18n.de
```

### Generating translation files

After you have defined the `intl` messages in your React components, you should extract those messages into `core.json`. This file contains a key-value map of the message `id` and the message value.

To extract the messages simply run `./scripts/extract-intl.js`.

### Syncing translations with Transifex

We use Transifex as our translation tool. Once we have extracted new messages into `core.json`, the file will be pushed to Transifex from CircleCI (see `push_translations` job).

When finally the translations have been provided in Transifex, we need to pull them back into our codebase. This process will update the `<lang>.json` files depending on the synced translations.
