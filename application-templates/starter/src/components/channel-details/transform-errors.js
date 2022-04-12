import omitEmpty from 'omit-empty-es';

const withoutEmptyErrorsByField = (errorsByField) => omitEmpty(errorsByField);

const DUPLICATE_FIELD_ERROR_CODE = 'DuplicateField';

/**
 * MappedErrors { [errorCodeKey]: any }
 * TransformedErrors: { mappedErrors: MappedErrors, unmappedErrors: [], formError: [] }
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
  const mappedErrors = {}; // may contain values mapped from GraphQL errors that would result in dispatching side domain error notification

  errorsToMap.forEach((graphQlError) => {
    const errorCode = graphQlError?.extensions?.code ?? graphQlError.code;
    if (errorCode === DUPLICATE_FIELD_ERROR_CODE) {
      formErrors.key.duplicate = true;
    } else {
      unmappedErrors.push(graphQlError);
    }
    // as pointed above we might also include checking for certain GraphQL error codes and map them to `mappedErrors` object entries
  });

  return {
    formErrors: withoutEmptyErrorsByField(formErrors),
    unmappedErrors,
    mappedErrors,
  };
};
