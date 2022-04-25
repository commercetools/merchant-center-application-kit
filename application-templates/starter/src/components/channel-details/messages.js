import { defineMessages } from 'react-intl';

export default defineMessages({
  backToChannelsList: {
    id: 'ChannelDetails.backToChannelsList',
    defaultMessage: 'Back to channels list',
  },
  duplicateKey: {
    id: 'ChannelDetails.duplicateKey',
    defaultMessage: 'A channel with this key already exists.',
  },
  channelUpdated: {
    id: 'ChannelDetails.channelUpdated',
    defaultMessage: 'Channel {channelName} updated',
  },
  channelKeyLabel: {
    id: 'ChannelDetails.channelKeyLabel',
    defaultMessage: 'Channel key',
  },
  channelNameLabel: {
    id: 'ChannelDetails.channelNameLabel',
    defaultMessage: 'Channel name',
  },
  channelRolesLabel: {
    id: 'ChannelDetails.channelRolesLabel',
    defaultMessage: 'Channel roles',
  },
  hint: {
    id: 'ChannelDetails.hint',
    defaultMessage:
      'This page demonstrates for instance how to use forms, notifications and how to update data using GraphQL, etc.',
  },
  modalTitle: {
    id: 'ChannelDetails.modalTitle',
    defaultMessage: 'Edit channel',
  },
  channelDetailsErrorMessage: {
    id: 'ChannelDetails.errorMessage',
    defaultMessage:
      'We were unable to fetch the channel details. Please check your connection, the provided channel ID and try again.',
  },
});
