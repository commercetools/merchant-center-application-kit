import { defineMessages } from 'react-intl';

export default defineMessages({
  backToChannelsList: {
    id: 'ChannelDetails.backToChannelsList',
    description: 'Back to channels list text',
    defaultMessage: 'Back to channels list',
  },
  save: {
    id: 'ChannelDetails.form.save',
    description: 'Save button label',
    defaultMessage: 'Save',
  },
  revert: {
    id: 'ChannelDetails.form.revert',
    description: 'Revert changes button label',
    defaultMessage: 'Revert changes',
  },
  duplicateKey: {
    id: 'ChannelDetails.duplicateKey',
    description: '',
    defaultMessage: 'A channel with this key already exists.',
  },
  channelUpdated: {
    id: 'ChannelDetails.channelUpdated',
    description: 'Notification message for successful channel edition',
    defaultMessage: 'Channel {channelName} updated',
  },
  channelKeyLabel: {
    id: 'ChannelDetails.channelKeyLabel',
    description: 'The label for the channel key input',
    defaultMessage: 'Channel key',
  },
  channelNameLabel: {
    id: 'ChannelDetails.channelNameLabel',
    description: 'The label for the channel name input',
    defaultMessage: 'Channel name',
  },
  channelRolesLabel: {
    id: 'ChannelDetails.channelRolesLabel',
    description: 'The label for the channel roles input',
    defaultMessage: 'Channel roles',
  },
  inventorySupply: {
    id: 'ChannelDetails.roles.inventorySupply',
    description: 'Inventory Supply role',
    defaultMessage: 'InventorySupply',
  },
  productDistribution: {
    id: 'ChannelDetails.roles.productDistribution',
    description: 'Product Distribution role',
    defaultMessage: 'ProductDistribution',
  },
  orderExport: {
    id: 'ChannelDetails.roles.orderExport',
    description: 'OrderExport role',
    defaultMessage: 'OrderExport',
  },
  orderImport: {
    id: 'ChannelDetails.roles.orderImport',
    description: 'OrderImport role',
    defaultMessage: 'OrderImport',
  },
  primary: {
    id: 'ChannelDetails.roles.primary',
    description: 'Primary role',
    defaultMessage: 'Primary',
  },
  hint: {
    id: 'ChannelDetails.hint',
    description: 'Channel details page hint',
    defaultMessage:
      'This page demonstrates for instance how to use forms, notifications and how to update data using GraphQL, etc.',
  },
  modalTitle: {
    id: 'ChannelDetails.modalTitle',
    description: 'Title for the modal',
    defaultMessage: 'Edit channel',
  },
  channelDetailsErrorMessage: {
    id: 'ChannelDetails.errorMessage',
    description: 'Error message for failing to fetch channel details',
    defaultMessage:
      'We were unable to fetch the channel details. Please check your connection, the provided channel ID and try again.',
  },
});
