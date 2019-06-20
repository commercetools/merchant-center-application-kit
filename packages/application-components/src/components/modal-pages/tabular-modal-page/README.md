# TabularModalPage

## Usage

```js
import { TabularModalPage } from '@commercetools-frontend/application-components';
```

## Description

Tabular Modal pages are controlled components used to render a page with custom navigational controls and content, for instance, with Tabs. Similar to `InfoModalPage`, but with no Header and a gray Top bar.

## Usage

```js
<TabularModalPage
  title="Lorem ipsum"
  isOpen={true}
  onClose={handleClose}
  topBarCurrentPathLabel="Lorem ipsum"
  topBarPreviousPathLabel="Back"
>
  <ViewHeader {...viewHeaderProps} />
  <TabsContainer {...tabsContainerProps} />
</TabularModalPage>
```

## Properties

| Props                           | Type                       | Required | Default                  | Description                                                                                                                                                                                                                                                                                                 |
| ------------------------------- | -------------------------- | :------: | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isOpen`                        | `boolean`                  |    ✅    | -                        | Indicates whether the page is open or closed. The parent component needs to manage this state.                                                                                                                                                                                                              |
| `title`                         | `string`                   |    ✅    | -                        | The title of the page.                                                                                                                                                                                                                                                                                      |
| `onClose`                       | `function`                 |    -     | -                        | Called when the page closes (click on overlay, click on close button, press ESC). If the function is not provided, the page cannot be closed by any of the listed options.                                                                                                                                  |
| `level`                         | `number`                   |          | `1`                      | The level indicates the stack position of the modal page, progressivelly increasing the `z-index` position (combined with the `baseZIndex`) as well as the spacing from the left side of the page.                                                                                                          |
| `baseZIndex`                    | `number`                   |          | `1000`                   | The base `z-index` value to be applied to the overlay container, incremented by `1` according to the `level` prop.                                                                                                                                                                                          |
| `zIndex`                        | `number`                   |          | -                        | The `z-index` value to be applied to the overlay container. This value overrides the normal `z-index` value calculated from the `baseZIndex` and `level` props. If you provide this value, you would need to take care of providing a proper `z-index` based on the stacked level.                          |
| `topBarCurrentPathLabel`        | `string`                   |          | The `title` prop         | The label to appear as the current path of the top bar of the modal                                                                                                                                                                                                                                         |
| `topBarPreviousPathLabel`       | `string`                   |          | `"Go Back"` (translated) | The label to appear as the previous path of the top bar of the modal                                                                                                                                                                                                                                        |
| `children`                      | `node`                     |    ✅    | -                        | Content rendered within the page. It isn't wrapped by anything except the Modal Container itself, so its expected to have its style fully customized.                                                                                                                                                       |
| `customControls`                | `node`                     |    -     | -                        | Pass a React.node to be used in place of the pre-determined controls. This can be useful if you need actions other than Cancel & Confirm, or other types of buttons, while keeping the same modal header layout                                                                                             |
| `customTitleRow`                | `node`                     |    -     | -                        | Pass a React.node to be used in place of the Title and Subtitle row.                                                                                                                                                                                                                                        |
| `tabControls`                   | `node`                     |    ✅    | -                        | Pass a React.node to be used as the Tabs component for controling the navigation between the Tab contents within the modal.                                                                                                                                                                                 |
| `getParentSelector`             | `function`                 |    -     | -                        | The function should return an HTML element that will be used as the parent container to hold the modal DOM tree. If no function is provided, it's expected that an HTML element with the `id="parent-container"` is present in the DOM. In `NODE_ENV=test` environment, the default HTML element is `body`. |
| `labelSecondaryButton`          | `string` \| `Intl message` |    ✅    | -                        | `FormDialog.Intl.cancel`                                                                                                                                                                                                                                                                                    | The label for the secondary button as a string, or as an intl-like message (`{ id, defaultMessage }`). The `FormDialog` exposes a static object `Intl` containing some common intl messages that are already translated |
| `labelPrimaryButton`            | `string` \| `Intl message` |    ✅    | -                        | `FormDialog.Intl.confirm`                                                                                                                                                                                                                                                                                   | The label for the primary button as a string, or as an intl-like message (`{ id, defaultMessage }`). The `FormDialog` exposes a static object `Intl` containing some common intl messages that are already translated |
| `onSecondaryButtonClick`        | `function`                 |    ✅    | -                        | -                                                                                                                                                                                                                                                                                                           | Called when the secondary button is clicked |
| `onPrimaryButtonClick`          | `function`                 |    ✅    | -                        | -                                                                                                                                                                                                                                                                                                           | Called when the primary button is clicked |
| `isPrimaryButtonDisabled`       | `boolean`                  |    -     | -                        | false                                                                                                                                                                                                                                                                                                       | Indicates whether primary button is disabled or not |
| `dataAttributesSecondaryButton` | `object`                   |    -     | -                        | -                                                                                                                                                                                                                                                                                                           | Use this prop to pass `data-` attributes to the secondary button |
| `dataAttributesPrimaryButton`   | `object`                   |    -     | -                        | -                                                                                                                                                                                                                                                                                                           | Use this prop to pass `data-` attributes to the primary button |
| `shouldDelayOnClose`            | `bool`                     |    -     | `true`                   | Sets wether the ModalPage should delay calling its onClose function to allow the closing animation to finish. This can be turned off if the developer is controlling the ModalPage only through the `isOpen` prop, and not abruptly mounting/unmounting it or one of its parent elements. |

## Static properties

### `TabularModalPage.Intl`

Exposes common intl messages to be used for the secondary/primary buttons

```js
TabularModalPage.Intl.cancel;
TabularModalPage.Intl.confirm;
// ...
```
