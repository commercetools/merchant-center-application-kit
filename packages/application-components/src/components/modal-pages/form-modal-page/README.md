# FormModalPage

## Usage

```js
import { FormModalPage } from '@commercetools-frontend/application-components';
```

## Description

Form Modal pages are controlled components used to render a page with a form or something that requires user input, similar to `InfoModalPage` but semantically with a different role. The header includes buttons to control the submission or cancellation of the form (or which can be overriden with other custom controls).

## Usage

```js
<FormModalPage
  title="Lorem ipsum"
  isOpen={true}
  onClose={handleClose}
  subtitle={<Text.Body>{'Lorem ipsum ...'}</Text.Body>}
  topBarCurrentPathLabel="Lorem ipsum"
  topBarPreviousPathLabel="Back"
  onSecondaryButtonClick={handleCancel}
  onPrimaryButtonClick={handleSubmit}
>
  <TextField {...textFieldFormProps} />
</FormModalPage>
```

## Properties

| Props                           | Type                       | Required | Default                  | Description                                                                                                                                                                                                                                                                                     |
| ------------------------------- | -------------------------- | :------: | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isOpen`                        | `boolean`                  |    ✅    | -                        | Indicates whether the page is open or closed. The parent component needs to manage this state.                                                                                                                                                                                                  |
| `title`                         | `string`                   |    ✅    | -                        | The title of the page.                                                                                                                                                                                                                                                                          |
| `subtitle`                      | `node` or `string`         |    -     | -                        | The subtitle of the page, usually a React component. If a string is passed, it's rendered as a paragraph.                                                                                                                                                                                       |
| `onClose`                       | `function`                 |    -     | -                        | Called when the page closes (click on overlay, click on close button, press ESC). If the function is not provided, the page cannot be closed by any of the listed options.                                                                                                                      |
| `level`                         | `number`                   |          | `1`                      | The level indicates the stack position of the modal page, progressivelly increasing the `z-index` position (combined with the `baseZIndex`) as well as the spacing from the left side of the page.                                                                                              |
| `baseZIndex`                    | `number`                   |          | `1000`                   | The base `z-index` value to be applied to the overlay container, incremented by `1` according to the `level` prop.                                                                                                                                                                              |
| `zIndex`                        | `number`                   |          | -                        | The `z-index` value to be applied to the overlay container. This value overrides the normal `z-index` value calculated from the `baseZIndex` and `level` props. If you provide this value, you would need to take care of providing a proper `z-index` based on the stacked level.              |
| `topBarCurrentPathLabel`        | `string`                   |          | The `title` prop         | The label to appear as the current path of the top bar of the modal                                                                                                                                                                                                                             |
| `topBarPreviousPathLabel`       | `string`                   |          | `"Go Back"` (translated) | The label to appear as the previous path of the top bar of the modal                                                                                                                                                                                                                            |
| `children`                      | `node`                     |    ✅    | -                        | Content rendered within the page. If the content is long in height (depending on the screen size) a scrollbar will appear.                                                                                                                                                                      |
| `labelSecondaryButton`          | `string` \| `Intl message` |    ✅    | -                        | `FormDialog.Intl.cancel`                                                                                                                                                                                                                                                                        | The label for the secondary button as a string, or as an intl-like message (`{ id, defaultMessage }`). The `FormDialog` exposes a static object `Intl` containing some common intl messages that are already translated |
| `labelPrimaryButton`            | `string` \| `Intl message` |    ✅    | -                        | `FormDialog.Intl.confirm`                                                                                                                                                                                                                                                                       | The label for the primary button as a string, or as an intl-like message (`{ id, defaultMessage }`). The `FormDialog` exposes a static object `Intl` containing some common intl messages that are already translated |
| `onSecondaryButtonClick`        | `function`                 |    ✅    | -                        | -                                                                                                                                                                                                                                                                                               | Called when the secondary button is clicked |
| `onPrimaryButtonClick`          | `function`                 |    ✅    | -                        | -                                                                                                                                                                                                                                                                                               | Called when the primary button is clicked |
| `isPrimaryButtonDisabled`       | `boolean`                  |    -     | -                        | false                                                                                                                                                                                                                                                                                           | Indicates whether primary button is disabled or not |
| `dataAttributesSecondaryButton` | `object`                   |    -     | -                        | -                                                                                                                                                                                                                                                                                               | Use this prop to pass `data-` attributes to the secondary button |
| `dataAttributesPrimaryButton`   | `object`                   |    -     | -                        | -                                                                                                                                                                                                                                                                                               | Use this prop to pass `data-` attributes to the primary button |
| `getParentSelector`             | `function`                 |    -     | -                        | -                                                                                                                                                                                                                                                                                               | The function should return an HTML element that will be used as the parent container to hold the modal DOM tree. If no function is provided, it's expected that an HTML element with the `id="parent-container"` is present in the DOM. In `NODE_ENV=test` environment, the default HTML element is `body`. |
| `customControls`                | `node`                     |    -     | -                        | Pass a React.node to be used in place of the pre-determined controls. This can be useful if you need actions other than Cancel & Confirm, or other types of buttons, while keeping the same modal header layout                                                                                 |
| `shouldDelayOnClose`            | `bool`                     |    -     | `true`                   | Sets whether the ModalPage should delay calling its onClose function to allow the closing animation time to finish. This can be turned off if the developer is controlling the ModalPage only through the `isOpen` prop, and not abruptly mounting/unmounting it or one of its parent elements. |

> NOTE: If `customControls` are passed, the `on*Click` props will no longer be required, and among with the `label*Button`, `isPrimaryButtonDisabled` and `dataAttributes*` props will no longer have any effect.

## Static properties

### `FormModalPage.Intl`

Exposes common intl messages to be used for the secondary/primary buttons

```js
FormModalPage.Intl.cancel;
FormModalPage.Intl.confirm;
// ...
```
