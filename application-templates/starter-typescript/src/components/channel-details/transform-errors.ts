import omitEmpty from 'omit-empty-es';

const DUPLICATE_FIELD_ERROR_CODE = 'DuplicateField';

type TransformedErrors = {
  unmappedErrors: unknown[];
  formErrors: Record<string, { duplicate: boolean }>;
};

export const transformErrors = (error: unknown): TransformedErrors => {
  const errorsToMap = Array.isArray(error) ? error : [error];

  const { formErrors, unmappedErrors } = errorsToMap.reduce<TransformedErrors>(
    (transformedErrors, graphQLError) => {
      const errorCode = graphQLError?.extensions?.code ?? graphQLError.code;
      const fieldName = graphQLError?.extensions?.field ?? graphQLError.field;

      if (errorCode === DUPLICATE_FIELD_ERROR_CODE) {
        transformedErrors.formErrors[fieldName] = { duplicate: true };
      } else {
        transformedErrors.unmappedErrors.push(graphQLError);
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
