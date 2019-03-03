# @commercetools-frontend/l10n

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/l10n"><img src="https://badgen.net/npm/v/@commercetools-frontend/l10n" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/l10n"><img src="https://badgen.net/npm/v/@commercetools-frontend/l10n/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/l10n"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/l10n" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

React bindings to load l10n data.

## Install

```bash
$ npm install --save @commercetools-frontend/l10n
```

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
