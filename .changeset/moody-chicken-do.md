---
'@commercetools-frontend/application-components': minor
---

Add new components for Main Page Layout.

- `<InfoMainPage>`
- `<FormMainPage>`
- `<CustomFormMainPage>`

## InfoMainPage

The `<InfoMainPage>` is a controlled component used to render a page to show more information about a particular feature.

```jsx
import { InfoMainPage } from '@commercetools-frontend/application-components';
import Text from '@commercetools-uikit/text';

const MainPage = () => {
  return (
    <InfoMainPage title="Main page">
      <Text.Body>{'Lorem ipsum ...'}</Text.Body>
    </InfoMainPage>
  );
};
```

## FormMainPage

`<FormMainPage>` is a controlled components used to render a page with a form or something that requires user input.

```jsx
import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import { FormMainPage } from '@commercetools-frontend/application-components';

const MainPage = () => {
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
    <FormMainPage
      title="Manage your account"
      isPrimaryButtonDisabled={formik.isSubmitting}
      onSecondaryButtonClick={formik.handleReset}
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
    </FormMainPage>
  );
};
```

## CustomFormMainPage

`<CustomFormMainPage>` is a variation of the <FormMainPage> that allow passing custom control elements via formControls. This is useful in case the main page needs different control elements than the default ones (primary and secondary button).

```jsx
import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import { CustomFormMainPage } from '@commercetools-frontend/application-components';

const AccountPage = () => {
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
    <CustomFormMainPage
      title="Manage your account"
      formControls={
        <>
          <CustomFormMainPage.FormSecondaryButton
            onClick={formik.handleReset}
          />
          <CustomFormMainPage.FormPrimaryButton onClick={formik.handleSubmit} />
          <CustomFormMainPage.FormDeleteButton onClick={handleDelete} />
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
    </CustomFormMainPage>
  );
};
```
