import { useCallback } from 'react';
import { useRouteMatch } from "react-router-dom";
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import useChannelsFetcher from './use-channels-fetcher';
import useChannelsUpdater from './use-channels-updater';
import { docToFormValues, formValuesToDoc } from './conversions';
import ChannelsForm from './channels-form';

const ChannelsDetails = (props) => {
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
    <Spacings.Stack scale="xl">
      <Text.Headline as="h1">
        Manage Channel
      </Text.Headline>
      <ChannelsForm
        initialValues={docToFormValues(channel, languages)}
        onSubmit={handleSubmit}
      />
    </Spacings.Stack>
  );
}
