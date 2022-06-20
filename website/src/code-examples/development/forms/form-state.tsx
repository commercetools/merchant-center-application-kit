import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import validate from './validate';
import { SyntheticEvent } from 'react';

type NameFormValues = {
  name:  Record<string, string>;
};

type TSyntheticEventHandler = (event: SyntheticEvent) => void;

const ChannelsForm = () => {
  const { dataLocale, languages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    languages: context.project.languages,
  }));
  const formik = useFormik<NameFormValues>({
    // We assume that the form is empty. Therefore, we need to provide default values.
    initialValues: {
      // A Channel's `name`: https://docs.commercetools.com/api/projects/channels
      name: LocalizedTextInput.createLocalizedString(languages),
    },
    validate,
    onSubmit: async (formikValues) => {
      alert(`name: ${formikValues.name}`);
      // Do something async
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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

      <PrimaryButton
        type="submit"
        label="Submit"
        onClick={formik.handleSubmit as TSyntheticEventHandler}
        isDisabled={formik.isSubmitting}
      />
    </form>
  );
}
