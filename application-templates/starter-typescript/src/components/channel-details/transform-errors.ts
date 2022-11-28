import omitEmpty from 'omit-empty-es';

const DUPLICATE_FIELD_ERROR_CODE = 'DuplicateField';

type TransformedErrors = {
  unmappedErrors: unknown[];
  formErrors: Record<string, { duplicate: boolean }>;
};

export const transformErrors = (graphQlErrors: unknown): TransformedErrors => {
  const errorsToMap = Array.isArray(graphQlErrors)
    ? graphQlErrors
    : [graphQlErrors];

  const { formErrors, unmappedErrors } = errorsToMap.reduce<TransformedErrors>(
    (transformedErrors, graphQlError) => {
      const errorCode = graphQlError?.extensions?.code ?? graphQlError.code;
      const fieldName = graphQlError?.extensions?.field ?? graphQlError.field;

      if (errorCode === DUPLICATE_FIELD_ERROR_CODE) {
        transformedErrors.formErrors[fieldName] = { duplicate: true };
      } else {
        transformedErrors.unmappedErrors.push(graphQlError);
      }
      return transformedErrors;
    },
    {
      formErrors: {}, // will be mappped to form field error messages
      unmappedErrors: [], // will result in dispatching `showApiErrorNotification`
    }
  );

  return {
    formErrors: omitEmpty(formErrors),
    unmappedErrors,
  };
};
