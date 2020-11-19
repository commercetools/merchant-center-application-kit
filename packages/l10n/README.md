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
- `ja`

## Hooks

```js
import {
  useCountries,
  useCurrencies,
  useLanguages,
  useTimeZones,
} from '@commercetools-frontend/l10n';

const { isLoading, data, error } = useCountries('en');
```

## Higher Order Components

```js
import { withCountries } from '@commercetools-frontend/l10n';

withCountries((ownProps) => ownProps.locale)(Component);

// format: { countryCode: countryLabel }
// { "de":"Germany" }
```

```js
import { withCurrencies } from '@commercetools-frontend/l10n';

withCurrencies((ownProps) => ownProps.locale)(Component);

// format: { currencyCode: { label, symbol } }
// { "EUR": { "label": "Euro", "symbol": "€" } }
```

```js
import { withLanguages } from '@commercetools-frontend/l10n';

withLanguages((ownProps) => ownProps.locale)(Component);

// format: { languageCode: { language, country? } }
// Case with main language
// { "es": { "language": "Spanish" } }
// Case with language of a region
// { "es-AR": { "language": "Spanish", "country": "Argentina" } }
```

```js
import { withTimeZones } from '@commercetools-frontend/l10n';

withTimeZones((ownProps) => ownProps.locale)(Component);

// format: { timezone: { name, abbr, offset } }
// Case with main language
// { "es": { "Europe/Berlin": { "name": "Europe/Berlin", "abbr": "CEST", "offset": "+02:00" } } }
// Case with language of a region
// { "fr-FR": { "Europe/Berlin": { "name": "Europe/Berlin", "abbr": "CEST", "offset": "+02:00" } } }
// { "es-AR": { "Europe/Berlin": { "name": "Europe/Berlin", "abbr": "CEST", "offset": "+02:00" } } }
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

## Utils

### `transformLocalizedFieldToLocalizedString`

> Transforms a `LocalizedField` to a `LocalizedString`

#### Context

Amongst [Common Types](https://docs.commercetools.com/api/types) in the commercetools platform API, we find [`LocalizedString`](https://docs.commercetools.com/api/types#localizedstring) type.

The `LocalizedString` is a type reserved for values found in a [Resource](https://docs.commercetools.com/api/types#referencetype), for example `Product`:

```js
// Product
{
  // `name` is a `LocalizedString`
  // as defined by https://docs.commercetools.com/api/projects/products#productdata
  name: {
    en: 'Milk';
  }
}
```

The documented `LocalizedString` in [https://docs.commercetools.com](https://docs.commercetools.com/) is a specification of the HTTP API.

In the commercetools platform `/graphql` API, we also find `LocalizedString` value takes a different shape of the same name.

```js
// Product, returned from the `graphql` API of commercetools platform
{
  nameAllLocales: [
    {
      locale: 'en',
      value: 'Milk',
    },
  ];
}
```

To distinguish these in source code of the Merchant Center, we name the graphql shaped value `LocalizedField`. When executing `transformLocalizedFieldToLocalizedString`, we transform the graphql shaped value to the HTTP API shape.

#### Example usage

```js
const product = {
  nameAllLocales: [
    {
      locale: 'en',
      value: 'Milk',
    },
  ],
};
const transformedName = transformLocalizedFieldToLocalizedString(
  product.nameAllLocales
);
console.log(transformedName);
// { en: 'Milk' }
```

#### When to use it

This transformation tool will be helpful when you consume the commercetools platform `/graphql` API in conjunction with authoring views consuming `@commercetools-frontend/ui-kit`.

Given that you consume:

- The commercetools platform `/graphql` API
- [`LocalizedTextInput`](https://github.com/commercetools/ui-kit/blob/master/packages/components/inputs/localized-text-input/src/localized-text-input.js)

This will be helpful transforming data from `response -> view`.

```js
// fetching product from the commercetools platform graphql API
// returns a product with a `nameAllLocales`
const product = useMcQuery(ProductQuery, {
  context: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
});

// Next, when we are aware that LocalizedTextInput accepts a value of `{ [key: string]: string }`
const transformedProduct = {
  ...product.data,
  // so we transform the LocalizedField to a LocalizedString
  // [{ locale: 'en', value: 'Milk' }] -> { en: 'Milk' }
  name: transformLocalizedFieldToLocalizedString(product.nameAllLocales),
};

// finally, we are ready to render out LocalizedTextInput with a correctly transformed `name` value.
return <LocalizedTextInput name="name" value={transformedProduct.name} />;
```

### `injectTransformedLocalizedFields`

> Transforms multiple `LocalizedField` -> `LocalizedString`, given `fieldNameTransformationMappings`

In the example above, we demonstrated that we can transform `LocalizedField -> LocalizedString` of a `LocalizedString` value returned commercetools platform `/graphql` API.

However, given that a Resource can have multiple values of the type `LocalizedField`, this can be a cumbersome task to do.

We offer `injectTransformedLocalizedFields` that is meant to transform multiple values.

#### Example usage

```js
const product = {
  nameAllLocales: [
    {
      locale: 'en',
      value: 'Milk',
    },
  ],
  descriptionAllLocales: [
    {
      locale: 'en',
      value: 'This is milk',
    },
  ],
};
const fieldNameTransformationMappings = [
  {
    from: 'nameAllLocales',
    to: 'name',
  },
  {
    from: 'descriptionAllLocales',
    to: 'description',
  },
];
const transformedProduct = injectTransformedLocalizedFields(
  fetchedProduct,
  fieldNameTransformationMappings
);

console.log(transformedProduct);
// { name: { en: 'Milk' }, description: { en:  'This is milk' } }
```

#### Slight difference to `transformLocalizedFieldToLocalizedString`

Unlike `transformLocalizedFieldToLocalizedString` where we pass in the `LocalizedField` value, we need to pass the entire Resource and the `fieldNameTransformationMappings`.
