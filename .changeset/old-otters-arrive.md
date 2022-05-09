---
'@commercetools-frontend/application-components': minor
'@commercetools-website/custom-applications': minor
'@commercetools-website/components-playground': minor
---

Add three new layout components: `<InfoDetailPage>`, `<FormDetailPage>` and `<CustomFormDetailPage>`.

These components are similar to the `<InfoModalPage>`, `<FormModalPage>` and `<CustomFormModalPage>` respectively but they are not rendered as modals.

# Usage

The detail pages are supposed to be used as a direct child of one of the main pages.
The layout of those pages can be recognized by the gray background header and the white content background. A back link in the header section of each of the pages is optional.

## InfoDetailPage

Form Detail pages are controlled components used to render a page with detailed data.

```jsx
import { useHistory } from 'react-router-dom';
import { InfoDetailPage } from '@commercetools-frontend/application-components';
import Text from '@commercetools-uikit/text';
const DetailPage = () => {
  const history = useHistory();
  return (
    <InfoDetailPage
      title="Detail page"
      showPageTopBar
      onPreviousPathClick={() => history.push('/starting-page')}
      previousPathLabel="Go back"
    >
      <Text.Body>{'Lorem ipsum ...'}</Text.Body>
    </InfoDetailPage>
  );
};
```

## FormDetailPage

Form Detail pages are controlled components used to render a form with predefined control elements (primary and secondary button).

```jsx
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import { FormDetailPage } from '@commercetools-frontend/application-components';

const AccountPage = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: (formikValues) => {
      if (TextInput.isEmpty(formikValues.email)) {
        return { email: { missing: true } };
      }
      return {};
    },
    onSubmit: async (formikValues) => {
      alert(`email: ${formikValues.email}`);
      // Do something async
    },
  });
  return (
    <FormDetailPage
      title="Manage your account"
      showPageTopBar
      onPreviousPathClick={() => history.push('/starting-page')}
      isPrimaryButtonDisabled={formik.isSubmitting}
      onSecondaryButtonClick={() => {
        formik.resetForm();
      }}
      onPrimaryButtonClick={formik.handleSubmit}
    >
      <TextField
        name="email"
        title="Email"
        isRequired={true}
        value={formik.values.email}
        errors={formik.errors.email}
        touched={formik.touched.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </FormDetailPage>
  );
};
```

# CustomFormDetailPage

Custom Form Detail pages are a variation of the `<FormDetailPage>` that allow passing custom control elements via `formControls`.
This is useful in case the detail page needs different control elements than the default ones (primary and secondary button).

```jsx
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import { CustomFormDetailPage } from '@commercetools-frontend/application-components';

const AccountPage = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: (formikValues) => {
      if (TextInput.isEmpty(formikValues.email)) {
        return { email: { missing: true } };
      }
      return {};
    },
    onSubmit: async (formikValues) => {
      alert(`email: ${formikValues.email}`);
      // Do something async
    },
  });
  return (
    <CustomFormDetailPage
      title="Manage your account"
      showPageTopBar
      onPreviousPathClick={() => history.push('/starting-page')}
      formControls={
        <>
          <CustomFormDetailPage.FormSecondaryButton
            onClick={() => {
              formik.resetForm();
            }}
          />
          <CustomFormDetailPage.FormPrimaryButton
            onClick={formik.handleSubmit}
          />
          <CustomFormDetailPage.FormDeleteButton onClick={handleDelete} />
        </>
      }
    >
      <TextField
        name="email"
        title="Email"
        isRequired={true}
        value={formik.values.email}
        errors={formik.errors.email}
        touched={formik.touched.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </CustomFormDetailPage>
  );
};
```
