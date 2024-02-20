import { defineMessages } from 'react-intl';

export default defineMessages({
  localesLabel: {
    id: 'LocaleSwitcher.localesLabel',
    description: 'The label for project dropdown switcher',
    defaultMessage: 'Locales',
  },
  dialogLocaleTitle: {
    id: 'LocaleSwitcher.dialogLocaleTitle',
    description: 'The title for the data locale dialog',
    defaultMessage: 'Selecting a data locale',
  },
  dialogLocaleDescription: {
    id: 'LocaleSwitcher.dialogLocaleDescription',
    description: 'The description for the data locale dialog',
    defaultMessage:
      'The selected data locale will be shown as default in all localized fields in the Merchant Center, like names, descriptions, or localized attributes. Note that this does not affect the interface language of the Merchant Center and the data formatting options. To change this, go to user profile.',
  },
});
