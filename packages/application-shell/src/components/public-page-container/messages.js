import { defineMessages } from 'react-intl';

export default defineMessages({
  welcome: {
    id: 'LoginPage.welcome',
    description: 'The heading message for the login page',
    defaultMessage: 'Welcome to the Merchant Center',
  },
  privacyPolicyLink: {
    id: 'LoginPage.privacyPolicyLink',
    description: 'The label for privacy policy link',
    defaultMessage: 'Privacy Policy',
  },
  termsOfServiceLink: {
    id: 'LoginPage.termsOfServiceLink',
    description: 'The label for terms of service link',
    defaultMessage: 'Terms of Service',
  },
  termsAndPrivacy: {
    id: 'LoginForm.termsAndPrivacy',
    description:
      'The message for reading the privacy policy and terms of service, with corresponding links',
    defaultMessage: 'Read our {privacyPolicyLink} and {termsOfServiceLink}.',
  },
});
