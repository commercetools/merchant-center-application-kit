import type { ApolloError } from '@apollo/client';
import {
  useMcQuery,
  useMcMutation,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { createSyncChannels } from '@commercetools/sync-actions';
import type { TDataTableSortingState } from '@commercetools-uikit/hooks';
import type {
  TChannelQueryResult,
  TFetchChannelsQueryVariables,
  TChannel,
  TFetchChannelDetailsQueryVariables,
} from '../../../@types/generated/ctp';
import type { ActionData } from '../../components/channel-details/types';
import {
  createGraphQlUpdateActions,
  extractErrorFromGraphQlResponse,
  convertToActionData,
} from '../../helpers';
import FetchChannelsQuery from './fetch-channels.ctp.graphql';
import FetchChannelDetailsQuery from './fetch-channel-details.ctp.graphql';
import UpdateChannelDetailsMutation from './update-channel-details.ctp.graphql';

type PaginationAndSortingProps = {
  page: { value: number };
  perPage: { value: number };
  tableSorting: TDataTableSortingState;
};
type TUseChannelsFetcher = (
  paginationAndSortingProps: PaginationAndSortingProps
) => {
  channelsPaginatedResult: TChannelQueryResult | undefined;
  error: ApolloError | undefined;
  loading: boolean;
};

export const useChannelsFetcher: TUseChannelsFetcher = ({
  page,
  perPage,
  tableSorting,
}) => {
  const { data, error, loading } = useMcQuery<
    { channels: TChannelQueryResult },
    TFetchChannelsQueryVariables
  >(FetchChannelsQuery, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    channelsPaginatedResult: data?.channels,
    error,
    loading,
  };
};

type TUseChannelDetailsFetcher = (channelId: string) => {
  channel: TChannel | undefined;
  error: ApolloError | undefined;
  loading: boolean;
};

export const useChannelDetailsFetcher: TUseChannelDetailsFetcher = (
  channelId
) => {
  const { data, error, loading } = useMcQuery<
    {
      channel: TChannel;
    },
    TFetchChannelDetailsQueryVariables
  >(FetchChannelDetailsQuery, {
    variables: {
      channelId,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    channel: data?.channel,
    error,
    loading,
  };
};

export const useChannelDetailsUpdater = () => {
  const [updateChannelDetails, { loading }] = useMcMutation(
    UpdateChannelDetailsMutation
  );

  const syncStores = createSyncChannels();

  type TExecuteProps = {
    originalDraft: TChannel;
    nextDraft: ActionData;
  };
  const execute = async ({ originalDraft, nextDraft }: TExecuteProps) => {
    const actions = syncStores.buildActions(
      nextDraft,
      convertToActionData(originalDraft)
    );
    try {
      return await updateChannelDetails({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          channelId: originalDraft.id,
          version: originalDraft.version,
          actions: createGraphQlUpdateActions(actions),
        },
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };

  return {
    loading,
    execute,
  };
};
