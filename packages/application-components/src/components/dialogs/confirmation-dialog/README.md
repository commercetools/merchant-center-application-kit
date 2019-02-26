# ConfirmationDialog

## Usage

```js
import { ConfirmationDialog } from '@commercetools-frontend/application-components';
```

#### Description

Confirmation dialogs are controlled components used to prompt the user to confirm an important or destructive action. They are similar to Info dialogs but they have a primary and secondary button in the footer area.

#### Usage

```js
<ConfirmationDialog
  title="Lorem ipsus"
  isOpen={isOpen}
  onClose={handleClose}
  onCancel={handleCancel}
  onConfirm={handleConfirm}
>
  <Spacings.Stack scale="m">
    <Text.Body>{'Lorem ipsus ...'}</Text.Body>
    <Text.Body>{'Lorem ipsus ...'}</Text.Body>
  </Spacings.Stack>
</ConfirmationDialog>
```

#### Properties

| Props                           | Type                       | Required | Values            | Default                           | Description                                                                                                                                                                                                                     |
| ------------------------------- | -------------------------- | :------: | ----------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                         | `string`                   |    ✅    | -                 | -                                 | The title of the Info Dialog                                                                                                                                                                                                    |
| `isOpen`                        | `boolean`                  |    ✅    | -                 | -                                 | Indicates whether the dialog is open or closed. The parent component needs to manage this state                                                                                                                                 |
| `onClose`                       | `function`                 |    -     | -                 | -                                 | Called when the dialog closes (click on overlay, click on close button, press ESC). If the function is not provided, the modal cannot be closed by any of the listed options.                                                   |
| `children`                      | `node`                     |    ✅    | -                 | -                                 | Content rendered within the dialog. If the content is long in height (depending on the screen size) a scrollbar will appear                                                                                                     |
| `size`                          | `string`                   |          | `m`, `l`, `scale` | `l`                               | Horizontal width limit of the dialog card                                                                                                                                                                                       |
| `zIndex`                        | `number`                   |          | -                 | `1000`                            | The `z-index` value to be applied to the overlay container (useful if you have stacking modals)                                                                                                                                 |
| `labelSecondary`                | `string` \| `Intl message` |    ✅    | -                 | `ConfirmationDialog.Intl.cancel`  | The label for the secondary button as a string, or as an intl-like message (`{ id, defaultMessage }`). The `ConfirmationDialog` exposes a static object `Intl` containing some common intl messages that are already translated |
| `labelPrimary`                  | `string` \| `Intl message` |    ✅    | -                 | `ConfirmationDialog.Intl.confirm` | The label for the primary button as a string, or as an intl-like message (`{ id, defaultMessage }`). The `ConfirmationDialog` exposes a static object `Intl` containing some common intl messages that are already translated   |
| `onCancel`                      | `function`                 |    ✅    | -                 | -                                 | Called when the secondary button is clicked                                                                                                                                                                                     |
| `onConfirm`                     | `function`                 |    ✅    | -                 | -                                 | Called when the primary button is clicked                                                                                                                                                                                       |
| `isPrimaryButtonDisabled`       | `boolean`                  |    -     | -                 | false                             | Indicates whether primary button is disabled or not                                                                                                                                                                             |
| `dataAttributesSecondaryButton` | `object`                   |    -     | -                 | -                                 | Use this prop to pass `data-` attributes to the secondary button                                                                                                                                                                |
| `dataAttributesPrimaryButton`   | `object`                   |    -     | -                 | -                                 | Use this prop to pass `data-` attributes to the primary button                                                                                                                                                                  |

### Static properties

#### `ConfirmationDialog.Intl`

Exposes common intl messages to be used for the secondary/primary buttons

```js
ConfirmationDialog.Intl.cancel;
ConfirmationDialog.Intl.confirm;
// ...
```
