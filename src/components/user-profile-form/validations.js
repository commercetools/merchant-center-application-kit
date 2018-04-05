import { withoutEmptyErrorsByField } from '@commercetools-local/utils/validation';

export const validate = values => {
  const errorsByField = { firstName: {}, lastName: {} };

  if (values.firstName.trim().length === 0)
    errorsByField.firstName.required = true;
  if (values.lastName.trim().length === 0)
    errorsByField.lastName.required = true;

  return withoutEmptyErrorsByField(errorsByField);
};

export default validate;
