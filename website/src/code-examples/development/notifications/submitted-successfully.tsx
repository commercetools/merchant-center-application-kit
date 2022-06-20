import { type ReactNode, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { FormModalPage } from '@commercetools-frontend/application-components';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import { DOMAINS, NOTIFICATION_KINDS_SIDE } from '@commercetools-frontend/constants';
import useChannelsFetcher from './use-channels-fetcher';
import useChannelsUpdater from './use-channels-updater';
import { docToFormValues, formValuesToDoc } from './conversions';
import ChannelsForm from './channels-form';

type TChannelDetailsProps = {
  onClose: () => void;
}

type TFormProps = {
  isSubmitting: boolean;
  handleCancel: () => void;
  submitForm: () => void;
  formElements: ReactNode
}

const ChannelsDetails = (props: TChannelDetailsProps) => {
  const match = useRouteMatch();
  const languages = useApplicationContext(
    (context) => context.project.languages
  );
  const { data: channel } = useChannelsFetcher(match.params.id);
  const { updateChannel } = useChannelsUpdater(match.params.id);
  const showNotification = useShowNotification();
  const handleSubmit = useCallback(
    async (formValues) => {
      const data = formValuesToDoc(formValues);
      try {
        await updateChannel(data);
        showNotification({
          kind: NOTIFICATION_KINDS_SIDE.success,
          domain: DOMAINS.SIDE,
          text: 'Channel updated! 🎉',
        });
      } catch (graphQLErrors) {
        // show an error notification
      }
    },
    [showNotification, updateChannel]
  );

  if (!channel) {
    return <LoadingSpinner />;
  }

  return (
    <ChannelsForm
      initialValues={docToFormValues(channel, languages)}
      onSubmit={handleSubmit}
    >
      {(formProps: TFormProps) => {
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
        );
      }}
    </ChannelsForm>
  );
};
