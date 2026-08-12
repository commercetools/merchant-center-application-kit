import type { ReactNode } from 'react';
import { Formik, useFormikContext } from 'formik';
import TextField from '@commercetools-uikit/text-field';

type TFormValues = {
  email: string;
};

export const FormPageValues = ({ children }: { children: ReactNode }) => (
  <Formik<TFormValues> initialValues={{ email: '' }} onSubmit={() => undefined}>
    {children}
  </Formik>
);

export const FormPageEmailField = () => {
  const formik = useFormikContext<TFormValues>();
  return (
    <TextField
      name="email"
      title="Email"
      isRequired={true}
      value={formik.values.email}
      errors={TextField.toFieldErrors<TFormValues>(formik.errors).email}
      touched={formik.touched.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      horizontalConstraint={7}
    />
  );
};
