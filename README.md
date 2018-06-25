# @commercetools-frontend/l10n

React bindings to load l10n data.

## Install

```bash
$ npm install --save @commercetools-frontend/l10n
```

## Components

- `@commercetools-frontend/l10n/country-information`

```js
import {
  withCountries,
  countriesShape,
} from '@commercetools-frontend/l10n/country-information';

withCountries(ownProps => ownProps.locale)(Component);

// format: { countryCode: countryLabel }
// { "de":"Germany" }
```

- `@commercetools-frontend/l10n/currency-information`

```js
import {
  withCurrencies,
  currenciesShape,
} from '@commercetools-frontend/l10n/currency-information';

withCurrencies(ownProps => ownProps.locale)(Component);

// format: { currencyCode: { label, symbol } }
// { "EUR": { "label": "Euro", "symbol": "€" } }
```

- `@commercetools-frontend/l10n/language-information`

```js
import {
  withLanguages,
  languagesShape,
} from '@commercetools-frontend/l10n/language-information';

withLanguages(ownProps => ownProps.locale)(Component);

// format: { languageCode: { language, country? } }
// Case with main language
// { "es": { "language": "Spanish" } }
// Case with language of a region
// { "es-AR": { "language": "Spanish", "country": "Argentina" } }
```
