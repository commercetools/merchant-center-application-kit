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

### `applyTransformedLocalizedFields`

> Transforms multiple `LocalizedField` -> `LocalizedString`, given `fieldNameTransformationMappings`

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

However, the commercetools platform `/graphql` API represents the `LocalizedString` in a different format as a list, for technical reasons.

```js
// Product, returned from the `/graphql` API of commercetools platform
{
  nameAllLocales: [
    {
      locale: 'en',
      value: 'Milk',
    },
  ];
}
```

To distinguish these in source code of the Merchant Center, we name the graphql shaped value `LocalizedField`. We offer `applyTransformedLocalizedFields` that is authored to transform these values from one to the other.

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
const transformedProduct = applyTransformedLocalizedFields(
  fetchedProduct,
  fieldNameTransformationMappings
);

console.log(transformedProduct);
// { name: { en: 'Milk' }, description: { en:  'This is milk' } }
```

#### When to use it

This transformation tool will be helpful when you consume the commercetools platform `/graphql` API in conjunction with authoring views consuming `@commercetools-frontend/ui-kit`.

Given that you consume:

- The commercetools platform `/graphql` API
- [`LocalizedTextInput`](https://github.com/commercetools/ui-kit/blob/master/packages/components/inputs/localized-text-input/src/localized-text-input.js)

This will be helpful transforming data from `response -> view`.

```js
// fetching product from the commercetools platform `/graphql` API
// returns a product with a `nameAllLocales` and `descriptionAllLocales`
const product = useMcQuery(ProductQuery, {
  context: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
});

// Given that LocalizedTextInput accepts a value of `{ [key: string]: string }`,
// we tranform our product to match the required shape
const transformedProduct = applyTransformedLocalizedFields(
  product,
  fieldNameTransformMappings
);

// Finally, we are ready to render our form with the correctly shaped `name` and `description`
return (
  <>
    <LocalizedTextInput name="name" value={transformedProduct.name} />
    <LocalizedTextInput
      name="description"
      value={transformedProduct.description}
    />
  </>
);
```

### `localize` (DRAFT)

> Transforms a `LocalizedString` to a String

The `localize` util is a util we use internally inside the Merchant Center.
This util is at the moment subject to change, hence marked as Draft. Use with caution in your Custom Application.

#### Context

As discussed under `applyTransformedLocalizedFields`, a `LocalizedString` is a value type reserved for a `Resource`, e.g a `Product`.

```js
const product = {
  name: {
    en: 'Milk',
    de: 'Milsch,
  }
}
```

When rendering a Product in a view, we would like to render the value of `name` given the `language` of the UI.
The `language` is a value controlled by the Merchant Center User (MC User) by updating the language switcher on the Application Bar of the Merchant Center.

The language switcher emits a value that is intended to help us Application Developers display the Resource data (`Product` in our example) in the specified language. Given that the `product.name` has a value of the specified `language`, we can easily pick the value from the `product.name`.

However there are scenarios where the MC User updates the language switcher to a value that our Product example has no matching value. What then? This is where `localize` plays its role.

The `localize` util is authored with a couple of things in mind:

1. Help us Application Developers remain resilient as we attempt to derive a value of `LocalizedString` given a specified language.
2. Help us Application Developers remain consistent when rendering a value derived from `LocalizedString`

Let's take a look at the examples below to put this to action.

#### Example usage

All examples below will use the following `Product`:

```
const product = {
  name: {
    en: 'Milk',
    de: 'Milsch,
  }
}
```

##### Scenario 1

Given that specified `language=de`

```js
const translatedName = localize({
  obj: product,
  key: 'name',
  language: 'de',
});

console.log(translatedName);
// 'Milsch'
```

##### Scenario 2

Given that specified `language=sv`

```js
const translatedName = localize({
  obj: product,
  key: 'name',
  language: 'sv',
});

console.log(translatedName);
// 'Milk (EN)'
```

**What happened?**

Our product has no value for the specified language `sv`, what `localize` will do for us as Application Developers is _pick the next available value_ from `product.name`.

##### Scenario 3

Given that specified `language=de-AT`

```js
const translatedName = localize({
  obj: product,
  key: 'name',
  language: 'de-AT',
});

console.log(translatedName);
// 'Milsch'
```

**What happened?**

Our product has no value for the specified language `de-AT` so there is no match, but we still got `"Milsch"`.
This is because `localize` attempts to determine a **primary language** on the input `language` and match that to the available values. Given that `de` is a [primary](https://en.wikipedia.org/wiki/IETF_language_tag) of `de-AT`, it determines that this is the _closest available value_ from `product.name`

#### Fallback

Given that `localize` can not handle all scenario exemplified above, we can specify a `fallback` as a last resort:

```js
const translatedName = localize({
  obj: product,
  key: 'name',
  language: 'sv',
  fallback: '-',
});
```

The default value of `fallback` is a `""`.

#### Fallback order

In **Scenario 2** above, we discussed that `localize` will pick the _next available value_ from `product.name` when there is matching value. In our case, the next available value was `en`.
As Application Developers, it is possible for us to take over control of the next "lookup" of the value, when there is no match (before `localize` proceeds to rendering `fallback` ).

`localize` accepts `fallbackOrder`, and this [test exemplifies the use case and resolve](./src/localize.spec.ts#L151:L170).

#### When to use it

Given that we want to render `LocalizedString` of a given `Resource`, it is sensible to rely on `localize` in conjunction with the Application Context.

```js
import { Text } from '@commercetools-frontend/ui-kit';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

const { dataLocale, projectLanguages } = useApplicationContext(
  (applicationContext) => ({
    dataLocale: applicationContext.dataLocale,
    // The Application Context also exposes the languages that are defined on the Project settings
    // we can rely on this to determine the fallback order.
    // This helps with consistency, although you can specify the fallback order however you want
    projectLanguages: context.project.languages,
  })
);

return (
  <Text.Headline>
    {localize({
      obj: product,
      key: 'name',
      locale: dataLocale,
      fallback: '<MY_CUSTOM_FALLBACK>',
      fallbackOrder: projectLanguages,
    })}
  </Text.Headline>
);
```
