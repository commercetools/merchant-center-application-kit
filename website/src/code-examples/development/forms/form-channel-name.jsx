import { useField } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';

const FormChannelNameField = () => {
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const [field, meta] = useField('name');

  return (
    <LocalizedTextField
      title="Name"
      isRequired
      selectedLanguage={dataLocale}
      {...field}
      errors={
        LocalizedTextField.toFieldErrors({ name: meta.error }).name
      }
      touched={meta.touched}
    />
  );
}
