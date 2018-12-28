import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'Login.sso.title',
    defaultMessage: 'Sign in to your Organization',
  },
  organization: {
    id: 'Login.sso.organization',
    defaultMessage: "Enter your Organization's name to sign in",
  },
  caseSensitive: {
    id: 'Login.sso.caseSensitive',
    defaultMessage: 'This field is case sensitive',
  },
  proceed: {
    id: 'Login.sso.proceed',
    defaultMessage: 'Proceed to sign in',
  },
  organizationGeneralError: {
    id: 'Login.sso.organizationGeneralError',
    defaultMessage: 'Organization name is not found',
  },
  organizationGeneralErrorSecondary: {
    id: 'Login.sso.organizationGeneralErrorSecondary',
    defaultMessage:
      'Either your Organization is not using SSO, is misspelled or does not exist. Try re-entering your Organization and contact your system administrator if you have any further questions.',
  },
});
