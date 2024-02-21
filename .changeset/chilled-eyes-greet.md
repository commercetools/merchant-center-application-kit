---
'@commercetools-frontend/application-components': minor
---

We've updated the `title` property type of dialog components (`InfoDialog`, `FormDialog` and `ConfirmationDialog`) so, instead of only supporting `string` values, it will support `ReactNode` as well.
This change is intended to allow for consumers to provide more complex content, such as custom components, to the `title` property of these components.

Since the `title` property was also used as the accessible title of the dialogs and we can't extract the value from a `ReactNode` title, we're introducing a new `aria-label` property to these components.
Consumers using a non-string value for the `title` property should also provide a string value for the `aria-label` property, which will be used as the accessible title of the dialog.

Example:

```js
import { InfoDialog } from '@commercetools-frontend/application-components';
import Text from '@commercetools-uikit/text';
import SpacingsInline from '@commercetools-uikit/spacings-inline';

const CustomTitle = (
  <SpacingsInline scale="xl">
    <Text.Body>Taxes applied to order:</Text.Body>
    <Text.Body isBold>123456</Text.Body>
  </SpacingsInline>
);

<InfoDialog
  title={<CustomTitle />}
  aria-label={intl.formatMessage(messages.title)}
  isOpen={true}
  onClose={() => {}}
>
  <p>Content</p>
</InfoDialog>;
```
