# ModalPage

## Usage

```js
import { ModalPage } from '@commercetools-frontend/application-components';
```

#### Description

Modal pages are controlled components used to render a page using a modal container, which makes it appear on top of the normal page. This is useful to render detailed data that normally requires some space.

#### Usage

```js
<ModalPage
  isOpen={true}
  onClose={handleClose}
  title="Lorem ipsus"
  subtitle={<Text.Body>{'Lorem ipsus ...'}</Text.Body>}
  components={{
    actions: (
      <Spacings.Inline alignItems="flex-start">
        <SecondaryButton label="Cancel" onClick={handleReset} />
        <PrimaryButton
          label="Save"
          isDisabled={isDisabled}
          onClick={handleSubmit}
        />
      </Spacings.Inline>
    ),
  }}
>
  <Spacings.Stack scale="m">
    <Text.Body>{'Lorem ipsus ...'}</Text.Body>
    <Text.Body>{'Lorem ipsus ...'}</Text.Body>
  </Spacings.Stack>
</ModalPage>
```

#### Properties

| Props                | Type       | Required | Values                | Default | Description                                                                                                                                                                                                                                                                                       |
| -------------------- | ---------- | :------: | --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isOpen`             | `boolean`  |    ✅    | -                     | -       | Indicates whether the page is open or closed. The parent component needs to manage this state                                                                                                                                                                                                     |
| `title`              | `string`   |    ✅    | -                     | -       | The title of the page                                                                                                                                                                                                                                                                             |
| `subtitle`           | `node`     |    -     | -                     | -       | The subtitle of the page, usually a React component                                                                                                                                                                                                                                               |
| `onClose`            | `function` |    -     | -                     | -       | Called when the page closes (click on overlay, click on close button, press ESC). If the function is not provided, the page cannot be closed by any of the listed options.                                                                                                                        |
| `level`              | `string`   |          | `one`, `two`, `three` | `one`   | The level indicates the stack position of the modal page. It determines how many spacer columns will appear on the left side, kind of like the indentation in case there are multiple modal pages stacked. The level also determines the `z-index` position when combined with `baseZIndex` prop. |
| `baseZIndex`         | `number`   |          | -                     | `1000`  | The base `z-index` value to be applied to the overlay container, incremented by `1` according to the `level` prop. For example, for the base `level: one`, the `z-index` will be the same as the `baseZIndex` value. For `level: two`, the `z-index` will be `baseZIndex + 1`, and so on.         |
| `zIndex`             | `number`   |          | -                     | -       | The `z-index` value to be applied to the overlay container. This value overrides the normal `z-index` value calculated from the `baseZIndex` and `level` props. If you provide this value, you would need to take care of providing a proper `z-index` based on the stacked level.                |
| `components`         | `object`   |          | -                     | `{}`    | This object allows to pass React components that will be rendered in pre-defined position on the page.                                                                                                                                                                                            |
| `components.actions` | `node`     |          | -                     | -       | This node will be rendered in the header section on the right side of the subtitle.                                                                                                                                                                                                               |
| `children`           | `node`     |    ✅    | -                     | -       | Content rendered within the page. If the content is long in height (depending on the screen size) a scrollbar will appear                                                                                                                                                                         |
