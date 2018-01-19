# L10n

* `@commercetools-local/l10n/country-information`

```js
import {
  withCountries,
  countriesShape,
} from '@commercetools-local/l10n/country-information';

withCountries(ownProps => ownProps.locale)(Component);

// format: { countryCode: countryLabel }
// { "de":"Germany" }
```

* `@commercetools-local/l10n/currency-information`

```js
import {
  withCurrencies,
  currenciesShape,
} from '@commercetools-local/l10n/currency-information';

withCurrencies(ownProps => ownProps.locale)(Component);

// format: { currencyCode: { label, symbol } }
// { "EUR": { "label": "Euro", "symbol": "€" } }
```

* `@commercetools-local/l10n/language-information`

```js
import {
  withLanguages,
  languagesShape,
} from '@commercetools-local/l10n/currency-information';

withLanguages(ownProps => ownProps.locale)(Component);

// format: { languageCode: { language, country? } }
// Case with main language
// { "es": { "language": "Spanish" } }
// Case with language of a region
// { "es-AR": { "language": "Spanish", "country": "Argentina" } }
```
