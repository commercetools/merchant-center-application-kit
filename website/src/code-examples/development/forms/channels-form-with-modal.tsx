
import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import type { ReactNode, SyntheticEvent } from 'react';

type NameFormValues = {
  name: Record<string, string>;
  key?: string;
  touched: {
    name: string
  }
  // ...
}

type ChannelsFormChildren = {
   // ...
}

type ChannelsProps = {
initialValues: NameFormValues;
onSubmit: () => void;
children: (children: ChannelsFormChildren) => ReactNode;
validate: {
  // ...
 }
}

type TSyntheticEventHandler = (event: SyntheticEvent) => void;

const ChannelsForm = (props: ChannelsProps) => {
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const formik = useFormik({
    // Pass initial values from the parent component.
    initialValues: props.initialValues,
    // Handle form submission in the parent component.
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  // Only contains the form elements, no buttons.
  const formElements = (
    <Spacings.Stack scale="l">
      <LocalizedTextField
        name="name"
        title="Name"
        isRequired
        selectedLanguage={dataLocale}
        value={formik.values.name}
        errors={
          LocalizedTextField.toFieldErrors<NameFormValues>(formik.errors).name
        }
        touched={formik.touched.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextField
        name="key"
        title="Key"
        isRequired
        value={formik.values.key}
        errors={
          TextField.toFieldErrors<NameFormValues>(formik.errors).key
        }
        touched={formik.touched.key}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleCancel: formik.handleReset,
  });
}
