import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import { useChannelsFetcher } from '../../hooks/use-channels-connector';

type TChannelsProps = {
  // component props types
};

const Channels = (props: TChannelsProps) => {
  const { channels, error } = useChannelsFetcher();

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  return <div>{/* Do something with `channels` */}</div>;
};
