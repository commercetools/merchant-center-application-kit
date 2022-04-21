import omitEmpty from 'omit-empty-es';

const DUPLICATE_FIELD_ERROR_CODE = 'DuplicateField';

/**
 * TransformedErrors: { unmappedErrors: [], formError: [] }
 *
 * @param  Object graphqlError
 * @return Object TransformedErrors
 */

export const transformErrors = (graphQlErrors) => {
  const errorsToMap = Array.isArray(graphQlErrors)
    ? graphQlErrors
    : [graphQlErrors];

  const formErrors = { key: {} }; // will be mappped to form field error messages
  const unmappedErrors = []; // will result in dispatching `showApiErrorNotification`

  errorsToMap.forEach((graphQlError) => {
    const errorCode = graphQlError?.extensions?.code ?? graphQlError.code;
    if (errorCode === DUPLICATE_FIELD_ERROR_CODE) {
      formErrors[
        graphQlError?.extensions?.field ?? graphQlError.field
      ].duplicate = true;
    } else {
      unmappedErrors.push(graphQlError);
    }
  });

  return {
    formErrors: omitEmpty(formErrors),
    unmappedErrors,
  };
};
