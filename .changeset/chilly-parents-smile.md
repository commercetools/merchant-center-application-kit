---
'@commercetools-frontend/application-shell': minor
---

Custom Applications now display a more useful page title based on the page location. The following format is used:

```
<Entry-point-uri-path> - <project-key> - Merchant Center
```

You can optionally add more contextual information to the default page title by rendering the `<ApplicationPageTitle>` component and passing additional values.
The values are prepended to the default page title and concatenated with a `-` separator. If each additional value exceeds 24 characters length, it will be truncated in the middle.

Overwriting the default page title is recommended in detail pages where there is a human-readable resource identifier, for example a product name.

```js
import { ApplicationPageTitle } from '@commercetools-frontend/application-shell';

<ApplicationPageTitle additionalParts={['T-Shirt red']} />;
// T-Shirt red - Products - my-shop - Merchant Center
```

The `<ApplicationPageTitle>` component can be rendered multiple times and the last one rendered will overwrite the other ones.
