import { withoutEmptyErrorsByField } from '@commercetools-local/utils/validation';

export const validate = values => {
  const errorsByField = { firstName: {}, lastName: {}, language: {} };

  if (!values.firstName || values.firstName.trim().length === 0)
    errorsByField.firstName.required = true;
  if (!values.lastName || values.lastName.trim().length === 0)
    errorsByField.lastName.required = true;
  if (!values.language || values.language.length === 0)
    errorsByField.language.required = true;

  return withoutEmptyErrorsByField(errorsByField);
};

export default validate;
