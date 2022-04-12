import {
  useMcQuery,
  useMcMutation,
} from '@commercetools-frontend/application-shell';
import { createSyncChannels } from '@commercetools/sync-actions';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { applyTransformedLocalizedFields } from '@commercetools-frontend/l10n';
import FetchChannelDetailsQuery from './fetch-channel-details.ctp.graphql';
import UpdateChannelDetailsMutation from './update-channel-details.ctp.graphql';
import {
  createGraphQlUpdateActions,
  extractErrorFromGraphQlResponse,
} from '../../helpers';

export const convertChannelFromGraphQl = (channel) => {
  if (channel) {
    return {
      ...applyTransformedLocalizedFields(channel, [
        {
          from: 'nameAllLocales',
          to: 'name',
        },
      ]),
    };
  }
  return null;
};

export const useChannelDetailsFetcher = (channelId) => {
  const { data, error, loading } = useMcQuery(FetchChannelDetailsQuery, {
    variables: {
      channelId,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    channel: convertChannelFromGraphQl(data?.channel),
    error,
    loading,
  };
};

export const useChannelDetailsUpdater = () => {
  const [updateChannelDetails, { loading }] = useMcMutation(
    UpdateChannelDetailsMutation
  );

  const syncStores = createSyncChannels();
  const execute = ({ originalDraft, nextDraft }) => {
    const actions = syncStores.buildActions(nextDraft, originalDraft);
    return updateChannelDetails({
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      variables: {
        channelId: originalDraft.id,
        version: originalDraft.version,
        actions: createGraphQlUpdateActions(actions),
      },
    }).then(
      (updateChannelDetailsMutationResult) => ({
        updatedChannel: convertChannelFromGraphQl(
          updateChannelDetailsMutationResult.data.updatedChannel
        ),
      }),
      (graphQlResponse) => {
        throw extractErrorFromGraphQlResponse(graphQlResponse);
      }
    );
  };

  return {
    loading,
    execute,
  };
};
