# @commercetools-frontend/l10n

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/l10n"><img src="https://badgen.net/npm/v/@commercetools-frontend/l10n" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/l10n"><img src="https://badgen.net/npm/v/@commercetools-frontend/l10n/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/l10n"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/l10n" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

React bindings to load l10n data.

## Install

```bash
$ npm install --save @commercetools-frontend/l10n
```

## Supported locales

- `en`
- `de`
- `es`
- `fr-FR`
- `zh-CN`

## Components

```js
import { withCountries, countriesShape } from '@commercetools-frontend/l10n';

withCountries(ownProps => ownProps.locale)(Component);

// format: { countryCode: countryLabel }
// { "de":"Germany" }
```

```js
import { withCurrencies } from '@commercetools-frontend/l10n';

withCurrencies(ownProps => ownProps.locale)(Component);

// format: { currencyCode: { label, symbol } }
// { "EUR": { "label": "Euro", "symbol": "€" } }
```

```js
import { withLanguages, languagesShape } from '@commercetools-frontend/l10n';

withLanguages(ownProps => ownProps.locale)(Component);

// format: { languageCode: { language, country? } }
// Case with main language
// { "es": { "language": "Spanish" } }
// Case with language of a region
// { "es-AR": { "language": "Spanish", "country": "Argentina" } }
```

## Generating localization data

The `data` directory contains all the localization data for the supported locales. The data is generated using the script `scripts/generate-l10n-data.js`, which uses the [`cldr` data](http://cldr.unicode.org).

#### Using a custom version of the cldr data

In case the npm library `cldr` does not contain the latest cldr data, we can manually download it and point the `cldr` library to use that data.

```js
// For example, using the v35 of cldr
const cldr = require('cldr').load(path.join(__dirname, '../cldr-v35'));
```

First, download the data (`core.zip`) for a specific version from the [downloads page](http://cldr.unicode.org/index/downloads).

Then extract the data and copy the `core` folder to this package, and rename it to e.g. `cldr-v35`. Then point the `cldr` library to the folder location.

Run the script, which uses the new data.
