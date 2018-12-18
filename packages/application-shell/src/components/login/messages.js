import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'LoginForm.title',
    description: 'The title message for the login form',
    defaultMessage: 'Sign in to your account',
  },
  email: {
    id: 'LoginForm.email',
    description: 'The label for the login input field (email)',
    defaultMessage: 'Email',
  },
  password: {
    id: 'LoginForm.password',
    description: 'The label for the login input field (password)',
    defaultMessage: 'Password',
  },
  signin: {
    id: 'LoginForm.signin',
    description: 'The label of the signin button',
    defaultMessage: 'Sign in',
  },
  validating: {
    id: 'LoginForm.validating',
    description: 'The text shown after submitting the login form',
    defaultMessage: 'Validating...',
  },
  forgotPassword: {
    id: 'LoginForm.forgotPassword',
    description: 'The lable of the forgot password link',
    defaultMessage: 'Forgot password?',
  },
  noProjectsTitle: {
    id: 'LoginForm.noProjectsTitle',
    description: 'The user has no projects associated to his account',
    defaultMessage:
      'Sorry, but you do not have a project associated to ' +
      'your account and we are therefore unable to log you in. Please ' +
      '{link} before trying again.',
  },
  noProjectsLink: {
    id: 'LoginForm.noProjectsLink',
    description:
      'Text for the link to the legacy MC when the user has no projects',
    defaultMessage: 'set up a project in the current Merchant Center',
  },
  forgotPasswordTitle: {
    id: 'LoginForm.forgotPasswordTitle',
    description:
      'An informative message for redirecting the user to ' +
      'forgot password page in the admin center',
    defaultMessage:
      'We are redirecting you to the Forgot Password form in {countdown} seconds.',
  },
  logout: {
    id: 'LoginForm.logout',
    description: 'A message ',
    defaultMessage:
      'We have logged you out of the Merchant Center. ' +
      'If you would like to log back in, please fill out the form below.',
  },
  unauthorized: {
    id: 'LoginForm.unauthorized',
    description: 'A message ',
    defaultMessage:
      'Your session has expired. Please sign in again to continue using the Merchant Center.',
  },

  // Error messages
  InvalidCredentials: {
    id: 'LoginForm.InvalidCredentials',
    description: 'User credentials are wrong or invalid',
    defaultMessage:
      'Sorry, but the login details entered below are ' +
      'not in our system. Please enter your correct email address ' +
      'and password below.',
  },
});
