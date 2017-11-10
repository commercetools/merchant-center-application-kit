# L10n

* `l10n/country-information`

```js
import { withCountries, countriesShape } from 'l10n/country-information';

withCountries(ownProps => ownProps.locale)(Component);

// format: { countryCode: countryLabel }
// { "de":"Germany" }
```

* `l10n/currency-information`

```js
import { withCurrencies, currenciesShape } from 'l10n/currency-information';

withCurrencies(ownProps => ownProps.locale)(Component);

// format: { currencyCode: { label, symbol } }
// { "EUR": { "label": "Euro", "symbol": "€" } }
```
