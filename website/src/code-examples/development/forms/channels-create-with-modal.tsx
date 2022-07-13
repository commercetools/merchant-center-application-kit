
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { docToFormValues, formValuesToDoc } from './conversions';
import ChannelsForm from './channels-form';

const ChannelsCreate = (props) => {
  const languages = useApplicationContext((context) => context.project.languages);
  const handleSubmit = useCallback(
    async (formValues) => {
      const data = formValuesToDoc(formValues);
      // This would trigger the request, for example a mutation.
      const result = await createChannel(data);
      // If successful, show a notification and redirect
      // to the Channels details page.
      // If errored, show an error notification.
    },
    [createChannel]
  );

  return (
    <ChannelsForm
      initialValues={docToFormValues(null, languages)}
      onSubmit={handleSubmit}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title="Create a channel"
            isOpen
            onClose={props.onClose}
            isPrimaryButtonDisabled={formProps.isSubmitting}
            onSecondaryButtonClick={() => {
              formProps.handleCancel();
              props.onClose()
            }}
            onPrimaryButtonClick={formProps.submitForm}
          >
            {formProps.formElements}
          </FormModalPage>
        )
      }}
    </ChannelsForm>
  );
}
