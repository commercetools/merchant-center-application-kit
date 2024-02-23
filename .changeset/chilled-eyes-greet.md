---
'@commercetools-frontend/application-components': minor
---

We've updated the `title` property type of dialog components (`InfoDialog`, `FormDialog` and `ConfirmationDialog`) to be a `ReactNode` instead of `string` values.
This change is intended to enable consumers to define the title of the dialogs as a React component, thus allowing to support more use cases.

Furthermore, given that the `title` property was also used as the accessible title of the dialogs (`aria-label`) and a `ReactNode` cannot be used for that, we're introducing a new `aria-label` property to address the accessibility requirement.
The `aria-label` property is therefore required when the `title` property is not of type `string`.

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

There might be situations where you want to have a custom title but use the same styles the default title text has.
For this scenario, the dialog components now export a new property called `TextTitle` which is a React component you can use to wrap your custom title text in order to apply the default title styles.
