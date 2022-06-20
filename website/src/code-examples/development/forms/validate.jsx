import LocalizedTextInput from '@commercetools-uikit/localized-text-input';

const validate = (values) => {
  const errors = {};

  if (LocalizedTextInput.isEmpty(values.name)) {
    errors.name = { missing: true };
  }

  return errors;
}
