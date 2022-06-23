import TextInput from '@commercetools-uikit/text-input';
import omitEmpty from 'omit-empty-es';
import type { FormikErrors } from 'formik';
import type { TFormValues } from '../../types';

type TErrors = {
  key: { missing?: boolean };
  roles: { missing?: boolean };
};

const validate = (formikValues: TFormValues): FormikErrors<TFormValues> => {
  const errors: TErrors = {
    key: {},
    roles: {},
  };

  if (TextInput.isEmpty(formikValues.key)) {
    errors.key.missing = true;
  }
  if (Array.isArray(formikValues.roles) && formikValues.roles.length === 0) {
    errors.roles.missing = true;
  }
  return omitEmpty(errors);
};

export default validate;
