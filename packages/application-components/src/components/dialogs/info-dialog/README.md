# InfoDialog

## Usage

```js
import { InfoDialog } from '@commercetools-frontend/application-components';
```

#### Description

Info dialogs are controlled components used to show more information about a particular feature, UI element, etc. They are mainly composed of text paragraphs.

#### Usage

```js
<InfoDialog title="Lorem ipsus" isOpen={isOpen} onClose={handleClose}>
  <Spacings.Stack scale="m">
    <div>
      <Text.Body>{'Lorem ipsus ...'}</Text.Body>
    </div>
    <div>
      <Text.Body>{'Lorem ipsus ...'}</Text.Body>
    </div>
  </Spacings.Stack>
</InfoDialog>
```

#### Properties

| Props                  | Type       | Required | Values            | Default | Description                                                                                                                 |
| ---------------------- | ---------- | :------: | ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `title`                | `string`   |    ✅    | -                 | -       | The title of the Info Dialog                                                                                                |
| `isOpen`               | `boolean`  |    ✅    | -                 | -       | Indicates whether the dialog is open or closed. The parent component needs to manage this state                             |
| `onClose`              | `function` |    ✅    | -                 | -       | Called when the dialog closes (click on overlay, click on close button, press ESC)                                          |
| `children`             | `node`     |    ✅    | -                 | -       | Content rendered within the dialog. If the content is long in height (depending on the screen size) a scrollbar will appear |
| `horizontalConstraint` | `string`   |          | `m`, `l`, `scale` | `l`     | Horizontal width limit of the dialog card                                                                                   |
