import omitEmpty from 'omit-empty-es';

const DUPLICATE_FIELD_ERROR_CODE = 'DuplicateField';

const setFieldValidationError = ({
  formErrors,
  fieldName,
  validationError,
}) => {
  formErrors[fieldName] = { [validationError]: true };
};

/**
 * TransformedErrors: { unmappedErrors: [], formErrors: {} }
 *
 * @param  Object graphqlError
 * @return Object TransformedErrors
 */

export const transformErrors = (graphQlErrors) => {
  const errorsToMap = Array.isArray(graphQlErrors)
    ? graphQlErrors
    : [graphQlErrors];

  const formErrors = {}; // will be mappped to form field error messages
  const unmappedErrors = []; // will result in dispatching `showApiErrorNotification`

  errorsToMap.forEach((graphQlError) => {
    const errorCode = graphQlError?.extensions?.code ?? graphQlError.code;
    const fieldName = graphQlError?.extensions?.field ?? graphQlError.field;

    if (errorCode === DUPLICATE_FIELD_ERROR_CODE) {
      setFieldValidationError({
        formErrors,
        fieldName,
        validationError: 'duplicate',
      });
    } else {
      unmappedErrors.push(graphQlError);
    }
  });

  return {
    formErrors: omitEmpty(formErrors),
    unmappedErrors,
  };
};
