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
      "The selected data locale will serve as the default setting for all localized fields within the Merchant Center, including names, descriptions, and other localized attributes. <newline></newline><newline></newline> It's important to note that this selection does not affect the interface language of the Merchant Center or any data formatting options. To modify these settings, navigate to your user profile.",
  },
});
