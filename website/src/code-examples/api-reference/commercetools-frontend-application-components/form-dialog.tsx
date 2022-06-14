import type { SyntheticEvent } from 'react';
import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import {
  FormDialog,
  useModalState,
} from '@commercetools-frontend/application-components';

type EmailFormValues = {
  email: string;
};

type TSyntheticEventHandler = (event: SyntheticEvent) => void;

const EmailForm = () => {
  const formModalState = useModalState();
  const formik = useFormik<EmailFormValues>({
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
    <FormDialog
      title="Update email"
      isOpen={formModalState.isModalOpen}
      onClose={formModalState.closeModal}
      isPrimaryButtonDisabled={formik.isSubmitting}
      onSecondaryButtonClick={formik.handleReset}
      onPrimaryButtonClick={formik.handleSubmit as TSyntheticEventHandler}
    >
      <TextField
        name="email"
        title="Email"
        isRequired={true}
        value={formik.values.email}
        errors={TextField.toFieldErrors<EmailFormValues>(formik.errors).email}
        touched={formik.touched.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </FormDialog>
  );
};
