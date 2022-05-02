import TextInput from '@commercetools-uikit/text-input';
import omitEmpty from 'omit-empty-es';

const validate = (formikValues) => {
  const errors = {
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
