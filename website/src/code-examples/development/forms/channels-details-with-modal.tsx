import { ReactNode, useCallback } from 'react';
import { useRouteMatch } from "react-router-dom";
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { FormModalPage } from '@commercetools-frontend/application-components';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import useChannelsFetcher from './use-channels-fetcher';
import useChannelsUpdater from './use-channels-updater';
import { docToFormValues, formValuesToDoc } from './conversions';
import ChannelsForm from './channels-form';

type ChannelsDetailsProps = {
  onClose: () => void;
  // ...
}

type FormProps = {
  isSubmitting: boolean;
  handleCancel: () => void;
  submitForm: () => void;
  formElements: ReactNode
  // ...
}

const ChannelsDetails = (props: ChannelsDetailsProps) => {
  const match = useRouteMatch();
  const languages = useApplicationContext((context) => context.project.languages);
  const { data: channel } = useChannelsFetcher(match.params.id)
  const { updateChannel } = useChannelsUpdater(match.params.id)
  const handleSubmit = useCallback(
    async (formValues) => {
      const data = formValuesToDoc(formValues);
      // This would trigger the request, for example a mutation.
      const result = await updateChannel(data);
      // If successful, show a notification.
      // If errored, show an error notification.
    },
    [updateChannel]
  );

  if (!channel) {
    return <LoadingSpinner />;
  }

  return (
    <ChannelsForm
      initialValues={docToFormValues(channel, languages)}
      onSubmit={handleSubmit}
    >
      {(formProps: FormProps) => {
        return (
          <FormModalPage
            title="Manage Channel"
            isOpen
            onClose={props.onClose}
            isPrimaryButtonDisabled={formProps.isSubmitting}
            onSecondaryButtonClick={formProps.handleCancel}
            onPrimaryButtonClick={formProps.submitForm}
          >
            {formProps.formElements}
          </FormModalPage>
        )
      }}
    </ChannelsForm>
  );
}
