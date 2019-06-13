import { defineMessages } from 'react-intl';

// Shared messages for button labels, to avoid duplicating translations.
// NOTE: avoid changing the message id, otherwise you need to translate
// them again in Transifex.
const messages = defineMessages({
  cancel: {
    id: 'Components.Dialog.labelCancel',
    defaultMessage: 'Cancel',
  },
  confirm: {
    id: 'Components.Dialog.labelConfirm',
    defaultMessage: 'Confirm',
  },
  save: {
    id: 'Components.Dialog.labelSave',
    defaultMessage: 'Save',
  },
  update: {
    id: 'Components.Dialog.labelUpdate',
    defaultMessage: 'Update',
  },
  create: {
    id: 'Components.Dialog.labelCreate',
    defaultMessage: 'Create',
  },
  delete: {
    id: 'Components.Dialog.labelDelete',
    defaultMessage: 'Delete',
  },
});

export default messages;
