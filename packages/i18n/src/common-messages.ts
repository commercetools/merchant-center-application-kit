import { defineMessages } from 'react-intl';

// TODO: move it to its own package, so that other people can also use it?

// Selection of common messages, to avoid duplicating translations.
// Avoid changing the message id, otherwise you need to translate them again in Transifex.
const messages = defineMessages({
  cancel: {
    id: 'AppKit.Shared.cancel',
    defaultMessage: 'Cancel',
  },
  confirm: {
    id: 'AppKit.Shared.confirm',
    defaultMessage: 'Confirm',
  },
  save: {
    id: 'AppKit.Shared.save',
    defaultMessage: 'Save',
  },
  update: {
    id: 'AppKit.Shared.update',
    defaultMessage: 'Update',
  },
  create: {
    id: 'AppKit.Shared.create',
    defaultMessage: 'Create',
  },
  delete: {
    id: 'AppKit.Shared.delete',
    defaultMessage: 'Delete',
  },
  remove: {
    id: 'AppKit.Shared.remove',
    defaultMessage: 'Remove',
  },
  close: {
    id: 'AppKit.Shared.close',
    defaultMessage: 'Close',
  },
  edit: {
    id: 'AppKit.Shared.edit',
    defaultMessage: 'Edit',
  },
  open: {
    id: 'AppKit.Shared.open',
    defaultMessage: 'Open',
  },
  activate: {
    id: 'AppKit.Shared.activate',
    defaultMessage: 'Activate',
  },
  deactivate: {
    id: 'AppKit.Shared.deactivate',
    defaultMessage: 'Deactivate',
  },
  enable: {
    id: 'AppKit.Shared.enable',
    defaultMessage: 'Enable',
  },
  disable: {
    id: 'AppKit.Shared.disable',
    defaultMessage: 'Disable',
  },
});

export default messages;
