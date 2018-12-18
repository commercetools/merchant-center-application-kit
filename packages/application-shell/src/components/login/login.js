import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { actions as sdkActions } from '@commercetools-frontend/sdk';
import {
  Spacings,
  Text,
  TextField,
  ContentNotification,
  PrimaryButton,
} from '@commercetools-frontend/ui-kit';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import * as storage from '@commercetools-frontend/storage';
import { withApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { STORAGE_KEYS } from '../../constants';
import PublicPageContainer from '../public-page-container';
import LoginBox from '../login-box';
import Countdown from './countdown';
import messages from './messages';
import { validate } from './validations';

const defaultTargetUrl = window.location.origin;

const redirect = targetUrl => window.location.replace(targetUrl);

export class Login extends React.PureComponent {
  static displayName = 'Login';

  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        reason: PropTypes.string,
        redirectTo: PropTypes.string,
      }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,

    // Injected
    requestAccessToken: PropTypes.func.isRequired,
    adminCenterUrl: PropTypes.string.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    error: this.props.location.query.reason,
  };

  handleSubmit = (formValues, addHandlers) =>
    addHandlers(
      this.props.requestAccessToken({
        email: formValues.email,
        password: formValues.password,
      })
    )
      .then(() => {
        // Set a flag to indicate that the user has been authenticated
        storage.put(STORAGE_KEYS.IS_AUTHENTICATED, true);
        // Ensure to remove the IdP Url value from local storage, as in this
        // case login is not done through SSO.
        storage.remove(STORAGE_KEYS.LOGIN_STRATEGY);
        // Redirect to a `redirectTo` url, if present, otherwise to defaul route
        const nextTargetUrl = this.props.location.query.redirectTo;
        // Inspect the target url to see if the host is one of commercetools
        try {
          const nextTargetUrlObject = new URL(nextTargetUrl);
          if (nextTargetUrlObject.hostname === window.location.hostname) {
            // We force a browser redirect, to let the proxy server handle
            // the new request URL.
            redirect(nextTargetUrl);
          } else {
            // If the redirect url does not match the hostname, we discard it and
            // redirect to the root path.
            redirect(defaultTargetUrl);
          }
        } catch (error) {
          // Fallback to normal redirect, in case the target url cannot be parsed
          redirect(defaultTargetUrl);
        }
      })
      .catch(error => {
        if (error) {
          // We are sure that the API always return one error in this case,
          // therefore it's safe to access the first error in the list.
          const code = error.errors && error.errors[0] && error.errors[0].code;
          if (code === 'LockedAccount') {
            this.props.history.push('/login/locked');
          } else {
            this.setState({ error: LOGOUT_REASONS.INVALID });
          }
        }
      });

  renderErrorMessage = error => {
    if (!error) return null;

    switch (error) {
      case LOGOUT_REASONS.NO_PROJECTS: {
        const link = (
          <a href={`${this.props.adminCenterUrl}/login`} target="_blank">
            <FormattedMessage {...messages.noProjectsLink} />
          </a>
        );
        return (
          <ContentNotification type="error">
            <FormattedMessage {...messages.noProjectsTitle} values={{ link }} />
          </ContentNotification>
        );
      }
      case LOGOUT_REASONS.USER:
        return (
          <ContentNotification type="success">
            <FormattedMessage {...messages.logout} />
          </ContentNotification>
        );
      case LOGOUT_REASONS.UNAUTHORIZED:
        return (
          <ContentNotification type="warning">
            <FormattedMessage {...messages.unauthorized} />
          </ContentNotification>
        );
      case LOGOUT_REASONS.INVALID:
        return (
          <ContentNotification type="error">
            <FormattedMessage {...messages.InvalidCredentials} />
          </ContentNotification>
        );
      default:
        return (
          <ContentNotification type="error">
            {error.message}
          </ContentNotification>
        );
    }
  };

  renderEmailErrors = key => {
    switch (key) {
      case 'invalid':
        return <FormattedMessage {...messages.invalidEmail} />;
      default:
        return null;
    }
  };

  render = () => (
    <PublicPageContainer>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={validate}
        onSubmit={(values, formikBag) => {
          const addHandlers = promise =>
            promise.then(
              result => {
                formikBag.setSubmitting(false);
                return result;
              },
              error => {
                formikBag.setSubmitting(false);
                throw error;
              }
            );
          return this.handleSubmit(values, addHandlers);
        }}
        render={formikProps => (
          <LoginBox>
            <form onSubmit={formikProps.handleSubmit}>
              <Spacings.Stack scale="m">
                {this.renderErrorMessage(
                  !formikProps.isSubmitting && this.state.error
                )}
                <Text.Subheadline elementType="h3">
                  <FormattedMessage {...messages.title} />
                </Text.Subheadline>
                <TextField
                  name="email"
                  title={this.props.intl.formatMessage(messages.email)}
                  isAutofocussed={true}
                  isRequired={true}
                  value={formikProps.values.email}
                  touched={formikProps.touched.email}
                  errors={formikProps.errors.email}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  isDisabled={formikProps.isSubmitting}
                  renderError={this.renderEmailErrors}
                />
                <TextField
                  name="password"
                  title={this.props.intl.formatMessage(messages.password)}
                  isRequired={true}
                  value={formikProps.values.password}
                  touched={formikProps.touched.password}
                  errors={formikProps.errors.password}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  isDisabled={formikProps.isSubmitting}
                />
                <Spacings.Inline>
                  {/* FIXME: the <PrimaryButton> current does not behave like a
                  "submit" button, making it impossible to handle "submit on enter".
                  Once that is fixed in the underlying component, the "submit on enter"
                  will work. */}
                  <PrimaryButton
                    label={
                      this.state.loading
                        ? this.props.intl.formatMessage(messages.validating)
                        : this.props.intl.formatMessage(messages.signin)
                    }
                    onClick={formikProps.handleSubmit}
                    isDisabled={formikProps.isSubmitting}
                  />
                </Spacings.Inline>

                <Countdown
                  redirectTo={() =>
                    redirect(`${this.props.adminCenterUrl}/reset-password`)
                  }
                  isDisabled={this.state.loading}
                >
                  {({ handleClick }) => (
                    <a
                      data-track-component="ForgotPassword"
                      data-track-event="click"
                      onClick={handleClick}
                    >
                      <FormattedMessage {...messages.forgotPassword} />
                    </a>
                  )}
                </Countdown>
              </Spacings.Stack>
            </form>
          </LoginBox>
        )}
      />
    </PublicPageContainer>
  );
}

const mapDispatchToProps = dispatch => ({
  requestAccessToken: payload =>
    dispatch(sdkActions.post({ uri: `/tokens`, payload })),
});

export default compose(
  injectIntl,
  withApplicationContext(({ environment }) => ({
    adminCenterUrl: environment.adminCenterUrl,
  })),
  connect(
    null,
    mapDispatchToProps
  )
)(Login);
