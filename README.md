# L10n

* `@commercetools/l10n/country-information`

```js
import { withCountries, countriesShape } from '@commercetools/l10n/country-information';

withCountries(ownProps => ownProps.locale)(Component);

// format: { countryCode: countryLabel }
// { "de":"Germany" }
```

* `@commercetools/l10n/currency-information`

```js
import { withCurrencies, currenciesShape } from '@commercetools/l10n/currency-information';

withCurrencies(ownProps => ownProps.locale)(Component);

// format: { currencyCode: { label, symbol } }
// { "EUR": { "label": "Euro", "symbol": "€" } }
```
