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
      onPreviousPathClick={() => history.push('/starting-page')}
      formControls={
        <>
          <CustomFormDetailPage.FormSecondaryButton
            onClick={formik.handleReset}
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
