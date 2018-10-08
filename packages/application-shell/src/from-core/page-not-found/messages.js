import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'PageNotFound.title',
    defaultMessage: 'We could not find what you are looking for',
  },
  paragraph1: {
    id: 'PageNotFound.paragraph1',
    defaultMessage:
      'The item you are looking for may have been deleted, does not exist, or the URL was entered incorrectly. Check the URL and try again.\n\nPlease contact your system administrator or the commercetools {link} if you have any further questions.',
  },
  helpDesk: {
    id: 'PageNotFound.helpDesk',
    defaultMessage: 'Help Desk',
  },
});
