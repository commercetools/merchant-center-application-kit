import type { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import { FormDetailPage } from '@commercetools-frontend/application-components';

type AccountFormValues = {
  email: string;
};

type TSyntheticEventHandler = (event: SyntheticEvent) => void;

const AccountPage = () => {
  const history = useHistory();
  const formik = useFormik<AccountFormValues>({
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
      onPreviousPathClick={() => history.push('/starting-page')}
      isPrimaryButtonDisabled={formik.isSubmitting}
      onSecondaryButtonClick={formik.handleReset}
      onPrimaryButtonClick={formik.handleSubmit as TSyntheticEventHandler}
    >
      <TextField
        name="email"
        title="Email"
        isRequired={true}
        value={formik.values.email}
        errors={TextField.toFieldErrors<AccountFormValues>(formik.errors).email}
        touched={formik.touched.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </FormDetailPage>
  );
};
