import omitEmpty from 'omit-empty';
import { TextInput } from '@commercetools-frontend/ui-kit';

// Source: https://emailregex.com/
const emailRegex = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\-0-9]+.)+[a-zA-Z]{2,}))$/i;

// eslint-disable-next-line import/prefer-default-export
export const validate = values => {
  const errorsByField = {
    email: {},
    password: {},
  };

  if (TextInput.isEmpty(values.email)) {
    errorsByField.email.missing = true;
  } else if (!emailRegex.test(values.email)) {
    errorsByField.email.invalid = true;
  }
  if (TextInput.isEmpty(values.password)) errorsByField.password.missing = true;

  return omitEmpty(errorsByField);
};
