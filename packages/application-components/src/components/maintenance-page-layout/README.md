# MaintenancePageLayout

## Description

This component is used as a template for creating maintenance pages.

## Usage

```js
import { MaintenancePageLayout } from '@commercetools-frontend/application-components';
import PageNotFoundIllustration from '@commercetools-frontend/assets/images/page-application-disabled.svg';

const PageNotFound = () => (
  <MaintenancePageLayout
    imageSrc={PageNotFoundIllustration}
    title="Page not found"
    paragraph1="We could not find the page you were looking for."
  />
);
```

## Properties

| Props         | Type     | Required | Values | Default | Description                                   |
| ------------- | -------- | :------: | ------ | ------- | --------------------------------------------- |
| `imgageSrc`   | `string` |    ✅    | -      | -       | Path to the image to display in the layout    |
| `title`       | `node`   |    ✅    | -      | -       | The header content                            |
| `paragraph1`  | `node`   |    ✅    | -      | -       | The first paragraph content                   |
| `paragraph2`  | `node`   |    -     | -      | -       | The second paragraph content                  |
| `bodyContent` | `node`   |    -     | -      | -       | The body content                              |
| `label`       | `string` |    -     | -      | -       | The label for the page set as the image's alt |
