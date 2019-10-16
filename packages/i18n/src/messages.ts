import { defineMessages } from 'react-intl';

// TODO: move it to its own package, so that other people can also use it?

// Selection of common messages, to avoid duplicating translations.
// Avoid changing the message id, otherwise you need to translate them again in Transifex.
const messages = defineMessages({
  cancel: {
    id: 'Messages.cancel',
    defaultMessage: 'Cancel',
  },
  confirm: {
    id: 'Messages.confirm',
    defaultMessage: 'Confirm',
  },
  save: {
    id: 'Messages.save',
    defaultMessage: 'Save',
  },
  update: {
    id: 'Messages.update',
    defaultMessage: 'Update',
  },
  create: {
    id: 'Messages.create',
    defaultMessage: 'Create',
  },
  delete: {
    id: 'Messages.delete',
    defaultMessage: 'Delete',
  },
  remove: {
    id: 'Messages.remove',
    defaultMessage: 'Remove',
  },
  close: {
    id: 'Messages.close',
    defaultMessage: 'Close',
  },
  edit: {
    id: 'Messages.edit',
    defaultMessage: 'Edit',
  },
  open: {
    id: 'Messages.open',
    defaultMessage: 'Open',
  },
  activate: {
    id: 'Messages.activate',
    defaultMessage: 'Activate',
  },
  deactivate: {
    id: 'Messages.deactivate',
    defaultMessage: 'Deactivate',
  },
  enable: {
    id: 'Messages.enable',
    defaultMessage: 'Enable',
  },
  disable: {
    id: 'Messages.disable',
    defaultMessage: 'Disable',
  },
});

export default messages;
