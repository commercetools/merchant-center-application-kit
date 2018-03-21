export const validate = values => {
  const errors = {};
  if (values.firstName.trim().length === 0) errors.firstNameMissing = true;
  if (values.lastName.trim().length === 0) errors.lastNameMissing = true;
  return errors;
};

export default validate;
