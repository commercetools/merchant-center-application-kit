# @commercetools-frontend/l10n

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/l10n"><img src="https://badgen.net/npm/v/@commercetools-frontend/l10n" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/l10n"><img src="https://badgen.net/npm/v/@commercetools-frontend/l10n/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/l10n"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/l10n" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
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

#### Generating Time Zone Data

Translations for time zones are located in `data/time-zones/`. There is a `core.json` and a file for each supported locale (`<locale>.json`). Transifex integration for these translations will be added in a subsequent PR.

Only some time zones have translations. For those time zones that have not been translated, each have been mapped to a time zone that does have a translation in `data/time-zones/translations-map.json`. This ensures that each IANA time zone identifier returned by `moment.tz.names()` will show an accurate translation.

The IANA [peridically updates](https://www.rfc-editor.org/rfc/rfc6557.html) its' [list of timezones](https://www.iana.org/time-zones). When the IANA releases a new set of time zones, [it will be added](https://momentjs.com/docs/#/-project-status/) to `moment-timezone`.

When `generate-l10n-data` is run, it gets the list of all time zones being returned by `moment-timezone` by running `moment.tz.names()`, and compares it to the list of translated (included) and mapped (excluded) time zones in `core.json` and `translations-map.json`.

For each unhandled time zone returned, CLI will prompt the user to either `translate`, `exclude`, or `ignore` it.

If the user selects `translate`, they must enter an english language translation string. That string will then be added to `core.json` and each `<locale>.json` for subsequent translation. It will also be added as a key in `translations-map.json` so that subsequent time zones can be mapped to its' translation if they are excluded.

If the user selects `exclude`, they must enter the IANA time zone id of a time zone that currently has a translation in order to map the time zone to a translation string. The `excluded` translation is then added to the array for the give translated time zone in `translations-map.json`, e.g.:
`"America/New_York": ["EST", "EDT"]`

If the user selects `ignore`, the unhandled time zone will be ignored until the `generate-l10n-data` script is run again.

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

However, the commercetools platform `/graphql` API represents the `LocalizedString` as a list of the same name.

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
- [`LocalizedTextInput`](https://github.com/commercetools/ui-kit/blob/main/packages/components/inputs/localized-text-input/src/localized-text-input.js)

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

### `formatLocalizedString` (DRAFT)

> Transforms a `LocalizedString` to a String

The `formatLocalizedString` util is a util we use internally inside the Merchant Center. This util is at the moment subject to change, hence marked as `Draft`.

#### Context

As discussed under `applyTransformedLocalizedFields`, a `LocalizedString` is a value type reserved for a `Resource`, e.g a `Product`.

```js
const product = {
  name: {
    en: 'Milk',
    de: 'Milch',
  },
};
```

When rendering a Product in a view, we would like to render the value of a localized string field, such as `name`, given the selected **data locale** of the UI.
The **data locale** is a value controlled by the Merchant Center User (MC User) by changing the **data locale switcher** in the top bar of the Merchant Center. The list of available options is derived by the list of languages specified in the project. The selected value can be read from the **application context**.

However, there might be a case where the selected **data locale** does not match any of the localized string values. In this case, it is recommended to display a "fallback" value using the `formatLocalizedString` function.

The `formatLocalizedString` util is authored with the following in mind:

1. Help deriving a value of `LocalizedString` given a specified locale.
2. Help rendering a value derived from `LocalizedString`.

Let us take a look at the examples below putting this to action.

#### Example usage

All examples below will use the following `Product`:

```
const product = {
  name: {
    en: 'Milk',
    de: 'Milch,
  }
}
```

##### Scenario 1

Given that selected **data locale** of `de`

```js
const translatedName = formatLocalizedString(product, {
  key: 'name',
  locale: 'de',
});

console.log(translatedName);
// 'Milch'
```

##### Scenario 2

Given that selected **data locale** of `sv`

```js
const translatedName = formatLocalizedString(product, {
  key: 'name',
  locale: 'sv',
});

console.log(translatedName);
// 'Milk (EN)'
```

**What happened?**

Our product has no value for the selected **data locale** `sv`. The `formatLocalizedString` function selects the "next available value" (more details on the order below) from `product.name`. In this case it's `en`, and returns it with a hint `(EN)` that this value refers to another locale.

##### Scenario 3

Given that selected **data locale** of `de-AT`

```js
const translatedName = formatLocalizedString(product, {
  key: 'name',
  locale: 'de-AT',
});

console.log(translatedName);
// 'Milch'
```

**What happened?**

Our product has no matching value for the selected **data locale** `de-AT` but we still got `"Milch"`.
This is because `formatLocalizedString` attempts to determine a **primary language tag** on the option `locale` and match that to the available values. Given that `de` is a [primary](https://en.wikipedia.org/wiki/IETF_language_tag) of `de-AT`, it determines that this is the _closest available value_ from `product.name`

#### Fallback

To provide even more freedom beyond cases mentioned above the `formatLocalizedString` allows specifying a `fallback` as a last resort:

```js
const translatedName = formatLocalizedString(product, {
  obj: product,
  key: 'name',
  locale: 'sv',
  fallback: '-',
});
```

The default value of `fallback` is a `""`.

#### Fallback order

In **Scenario 2** above, we discussed that `formatLocalizedString` will pick the "next available value" from `product.name` when there is no matching value. In our case, the next available value was the locale `en`.
Merchant Center customizations developers can take full control over the order of attempted lookups of the value while there is no match. Before `formatLocalizedString` eventually proceeds to rendering what is specified as `fallback`.

`formatLocalizedString` accepts `fallbackOrder`, and this [test exemplifies the use case and resolve](./src/localize.spec.ts#L151:L170).

#### When to use it

Given that we want to render `LocalizedString` of a given `Resource`, it is sensible to rely on `formatLocalizedString` in conjunction with the Application Context. A user usually has a defined preference of languages we can use.

```js
import Text from '@commercetools-uikit/text';
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
    {formatLocalizedString(product, {
      key: 'name',
      locale: dataLocale,
      fallback: '<MY_CUSTOM_FALLBACK>',
      fallbackOrder: projectLanguages,
    })}
  </Text.Headline>
);
```
