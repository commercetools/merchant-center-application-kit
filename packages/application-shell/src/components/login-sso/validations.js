import omitEmpty from 'omit-empty-es';
import { TextInput } from '@commercetools-frontend/ui-kit';

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
