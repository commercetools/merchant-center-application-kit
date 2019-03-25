import { TextInput } from '@commercetools-frontend/ui-kit';

const omitEmpty = require('omit-empty');

// eslint-disable-next-line import/prefer-default-export
export const validate = values => {
  const errorsByField = {
    organizationName: {},
  };

  if (TextInput.isEmpty(values.organizationName)) {
    errorsByField.organizationName.missing = true;
  }

  return omitEmpty(errorsByField);
};
