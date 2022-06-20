import { useFormik } from 'formik';
import { formValuesToDoc } from './conversions';

type x = {
  formValues: (FormikValues) => Promise<void>;
}

const ChannelsForm = () => {
  const formik = useFormik({
    initialValues: {
      // ...
    },
    onSubmit: async (formValues) => {
      const updateData = formValuesToDoc(formValues);
    },
    // ...
  });
  // ...
}
