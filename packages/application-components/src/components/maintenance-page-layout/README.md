# MaintenancePageLayout

#### Description

This component should be used as a template to scaffold maintenance pages.

#### Usage

```js
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import PageNotFoundSVG from '@commercetools-frontend/assets/images/page-not-found.svg';

const PageNotFound = () => (
  <MaintenancePageLayout
    imageSrc={PageNotFoundSVG}
    title="Page not found"
    paragraph1="We could not find the page you were looking for."
  />
);
```

#### Properties

| Props         | Type     | Required | Values | Default | Description                                |
| ------------- | -------- | :------: | ------ | ------- | ------------------------------------------ |
| `imgageSrc`   | `string` |    ✅    | -      | -       | Path to the image to display in the layout |
| `title`       | `node`   |    ✅    | -      | -       | The header content                         |
| `paragraph1`  | `node`   |    ✅    | -      | -       | The first paragraph content                |
| `paragraph2`  | `node`   |    -     | -      | -       | The second paragraph content               |
| `bodyContent` | `node`   |    -     | -      | -       | The body content                           |
