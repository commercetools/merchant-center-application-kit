---
'@commercetools-frontend/l10n': minor
---

Add `transformLocalizedStringToLocalizedField` to `i10n`.

Transforms [`LocalizedString`](https://docs.commercetools.com/api/types#localizedstring) to a list of `LocalizedField` (`[{ locale: string, value: string }]`)

**Example**

```jsx
import { transformLocalizedStringToLocalizedField } from '@commercetools-frontend/l10n';

const productName = { sv: 'Kanelbulle', en: 'Cinnamon Bun' };
console.log(transformLocalizedStringToLocalizedField(productName));
// [{ locale: 'sv', value: 'Kanelbulle' }, { locale: 'en', value: 'Cinnamon Bun' }]
```
