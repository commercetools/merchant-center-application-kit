import { useQuery } from '@apollo/client/react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type {
  TChannelQueryResult,
  TFetchChannelsQueryVariables,
} from '../../../types/generated/ctp';

type TChannelsProps = {
  // component props types
};

const Channels = (props: TChannelsProps) => {
  const { data } = useQuery<
    { channels: TChannelQueryResult },
    TFetchChannelsQueryVariables
  >(FetchChannelsQuery, {
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return <div>{/* Do something with `data` */}</div>;
};
