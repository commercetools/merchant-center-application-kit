import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import { docToFormValues, formValuesToDoc } from './conversions';
import ChannelsForm from './channels-form';

const ChannelsCreate = () => {
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
    <Spacings.Stack scale="xl">
      <Text.Headline as="h1">
        Create a channel
      </Text.Headline>
      <ChannelsForm
        initialValues={docToFormValues(null, languages)}
        onSubmit={handleSubmit}
      />
    </Spacings.Stack>
  );
}
