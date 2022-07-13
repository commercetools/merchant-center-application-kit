import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import TextField from '@commercetools-uikit/text-field';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import { type SyntheticEvent } from 'react';

type NameFormValues = {
    name: Record<string, string>;
    key?: string;
    touched: {
      name: string
    }
    // ...
}

type ChannelsProps = {
  initialValues: NameFormValues;
  onSubmit: () => void;
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

  return (
    <form onSubmit={formik.handleSubmit}>
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

        <Spacings.Inline>
          <SecondaryButton
            label="Cancel"
            onClick={formik.handleReset}
          />
          <PrimaryButton
            type="submit"
            label="Submit"
            onClick={formik.handleSubmit as TSyntheticEventHandler}
            isDisabled={formik.isSubmitting}
          />
        </Spacings.Inline>
      </Spacings.Stack>
    </form>
  );
}
