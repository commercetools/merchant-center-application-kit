import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import {
  CustomFormModalPage,
  useModalState,
} from '@commercetools-frontend/application-components';

const AccountPage = () => {
  const formModalState = useModalState();
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
    <CustomFormModalPage
      title="Manage your account"
      isOpen={formModalState.isModalOpen}
      onClose={formModalState.closeModal}
      formControls={
        <>
          <CustomFormModalPage.FormSecondaryButton
            onClick={formik.handleReset}
          />
          <CustomFormModalPage.FormPrimaryButton
            onClick={formik.handleSubmit}
          />
          <CustomFormModalPage.FormDeleteButton onClick={handleDelete} />
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
    </CustomFormModalPage>
  );
};
