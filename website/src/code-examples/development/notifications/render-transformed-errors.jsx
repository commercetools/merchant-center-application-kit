// ...
import { transformErrors } from './transform-errors';

const ChannelsDetails = (props) => {
  // ...
  const handleSubmit = useCallback(
    async (formValues, formikHelpers) => {
      const data = formValuesToDoc(formValues);
      try {
        // ...
      } catch (graphQLErrors) {
        const transformedErrors = transformErrors(graphQLErrors);
        if (transformedErrors.unmappedErrors.length > 0)
          showApiErrorNotification({
            errors: transformedErrors.unmappedErrors,
          });

        formikHelpers.setErrors(transformedErrors.formErrors);
      }
    },
    [ /* ... */ ]
  );
  // ...
};
