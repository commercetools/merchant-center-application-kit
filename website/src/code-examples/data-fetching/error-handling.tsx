import { useQuery } from '@apollo/client/react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import type {
  TChannelQueryResult,
  TFetchChannelsQueryVariables,
} from '../../../types/generated/ctp';

type TChannelsProps = {
  // component props types
};

const Channels = (props: TChannelsProps) => {
  const { data, error } = useQuery<
    { channels: TChannelQueryResult },
    TFetchChannelsQueryVariables
  >(FetchChannelsQuery, {
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  return <div>{/* Do something with `data` */}</div>;
};
