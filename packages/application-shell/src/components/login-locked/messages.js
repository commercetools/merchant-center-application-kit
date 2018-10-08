import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'LoginLocked.title',
    defaultMessage: 'Account Locked',
  },
  paragraph1: {
    id: 'LoginLocked.paragraph1',
    defaultMessage:
      'For security reasons, your account has been locked because there were too many invalid log in attempts. You can {resetPasswordLink} or contact the commercetools {helpDeskLink}',
  },
  resetPasswordLink: {
    id: 'LoginLocked.resetPasswordLink',
    defaultMessage: 'reset your password',
  },
  helpDeskLink: {
    id: 'LoginLocked.helpDeskLink',
    defaultMessage: 'Help Desk',
  },
});
