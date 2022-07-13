import {
  useShowApiErrorNotification
} from '@commercetools-frontend/actions-global';
import { useCallback } from 'react';

type TChannelsProps = {
  // ...
}

const ChannelsDetails = (props: TChannelsProps) => {
  // ...
  const showApiErrorNotification = useShowApiErrorNotification();
  const handleSubmit = useCallback(
    async (formValues) => {
      const data = formValuesToDoc(formValues);
      try {
        // ...
      } catch (graphQLErrors) {
        const errors = Array.isArray(graphQLErrors)
          ? graphQLErrors
          : [graphQLErrors];
        if (errors.length > 0)
          showApiErrorNotification({
            errors,
          });
      }
    },
    [showApiErrorNotification, /* ... */ ]
  );

  // ...
};
