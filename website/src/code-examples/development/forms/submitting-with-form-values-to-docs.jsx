import { useFormik } from 'formik';
import { formValuesToDoc } from './conversions';

const ChannelsForm = () => {
  const formik = useFormik({
    onSubmit: async (formValues) => {
      const updateData = formValuesToDoc(formValues);
    },
    // ...
  });
  // ...
}
