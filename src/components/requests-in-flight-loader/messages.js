import { defineMessages } from 'react-intl';

export default defineMessages({
  labelLoading: {
    // Keep the id for backwards compatibility.
    // TODO: provide a new key?
    id: 'TopNavigation.labelLoading',
    description: 'The text to show next to the loading icon',
    defaultMessage: 'Processing...',
  },
});
