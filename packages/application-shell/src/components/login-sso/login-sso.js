import querystring from 'querystring';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose, withProps } from 'recompose';
import { Formik, Field } from 'formik';
import uuid from 'uuid/v4';
import { Text, PrimaryButton, Spacings } from '@commercetools-frontend/ui-kit';
import {
  joinPaths,
  trimLeadingAndTrailingSlashes,
} from '@commercetools-frontend/url-utils';
import { actions as sdkActions } from '@commercetools-frontend/sdk';
import { connect } from 'react-redux';
import * as storage from '@commercetools-frontend/storage';
import { Notification } from '@commercetools-frontend/react-notifications';
import { ORGANIZATION_GENERAL_ERROR, STORAGE_KEYS } from '../../constants';
import LabelField from '../../from-core/label-field';
import Title from '../../from-core/title';
import PublicPageContainer from '../public-page-container';
import LoginBox from '../login-box';
import loginStyles from '../login/login.mod.css';
import messages from './messages';
import styles from './login-sso.mod.css';

export const getMessageKeyForError = error => {
  switch (error) {
    case ORGANIZATION_GENERAL_ERROR:
      return 'organizationGeneralError';
    default:
      return undefined;
  }
};

function generateAndCacheNonceWithState(state) {
  const nonce = uuid();
  // We store additional information within the given `nonce`
  // to then retrieve it later when the IdP redirects back
  // to our application. The URL will contain the `nonce` within
  // the id_token and, once validated, we can retrieve and use
  // the state object.
  // https://auth0.com/docs/protocols/oauth2/oauth-state#how-to-use-the-parameter-to-restore-application-state
  storage.put(`${STORAGE_KEYS.NONCE}_${nonce}`, state, {
    storage: window.sessionStorage,
  });
  return nonce;
}

export class LoginSSO extends React.PureComponent {
  static displayName = 'LoginSSO';
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    originUrl: PropTypes.string.isRequired,
    redirectTo: PropTypes.func.isRequired,
    getOrganizationByName: PropTypes.func.isRequired,
  };
  initialFormValues = {
    organizationName: '',
  };
  handleValidation = values => {
    const errors = {};
    if (!values.organizationName) {
      errors.organizationName = this.props.intl.formatMessage(
        messages.required
      );
    }
    return errors;
  };
  handleSubmit = (values, actions) => {
    this.props.getOrganizationByName(values.organizationName).then(
      authProvider => {
        actions.setSubmitting(false);
        // TODO: handle cases with another protocol?
        if (authProvider.protocol === 'oidc') {
          // Quick note: we assume that the authorization endpoint is /authorize
          // This endpoint name is not mandatory. However, it is used as a common
          // practice throughout the OIDC specification.
          // We might have to let customers set a custom endpoint in the future.
          const params = querystring.stringify({
            scope: 'openid email profile',
            response_type: 'id_token',
            client_id: authProvider.clientId,
            redirect_uri: trimLeadingAndTrailingSlashes(
              // Avoid providing query parameters as some IdP (e.g. Azure) apparently
              // will consider the full URL to match as part of the callback whitelist.
              // Instead, we store additional information within the `nonce` value
              // which is stored in sessionStorage. See `generateAndCacheNonceWithState`.
              joinPaths(this.props.originUrl, this.props.match.url, `callback`)
            ),
            nonce: generateAndCacheNonceWithState({
              organizationId: authProvider.organizationId,
            }),
          });
          const authUrl = authProvider.url.replace(/\/$/, ''); // trim trailing slash
          this.props.redirectTo(`${authUrl}/authorize?${params}`);
        }
      },
      error => {
        actions.setSubmitting(false);
        actions.setStatus({
          errorMessage:
            error.statusCode === 404
              ? ORGANIZATION_GENERAL_ERROR
              : error.message,
        });
      }
    );
  };
  render() {
    return (
      <PublicPageContainer>
        <LoginBox>
          <Formik
            initialValues={this.initialFormValues}
            validateOnBlur={false}
            validate={this.handleValidation}
            onSubmit={this.handleSubmit}
            render={formikProps => {
              const errorMessageKey = getMessageKeyForError(
                formikProps.status && formikProps.status.errorMessage
              );
              return (
                <Spacings.Stack scale="m">
                  {formikProps.status && formikProps.status.errorMessage ? (
                    <Notification type="error" domain="side" fixed={true}>
                      <Text.Body>
                        {messages[errorMessageKey] ? (
                          <FormattedMessage {...messages[errorMessageKey]} />
                        ) : (
                          formikProps.status.errorMessage
                        )}
                      </Text.Body>
                      {messages[`${errorMessageKey}Secondary`] ? (
                        <Text.Body>
                          <FormattedMessage
                            {...messages[`${errorMessageKey}Secondary`]}
                          />
                        </Text.Body>
                      ) : null}
                    </Notification>
                  ) : null}
                  <Title>
                    <FormattedMessage {...messages.title} />
                  </Title>
                  <div>
                    <LabelField
                      title={<FormattedMessage {...messages.organization} />}
                      subtitle={
                        <FormattedMessage {...messages.caseSensitive} />
                      }
                      isRequired={true}
                    />
                    <Field
                      type="text"
                      name="organizationName"
                      className={loginStyles['input-text']}
                      value={formikProps.values.organizationName}
                      onChange={event => {
                        formikProps.setFieldValue(
                          'organizationName',
                          event.target.value
                        );
                        formikProps.setFieldTouched('organizationName', true);
                      }}
                    />
                    {formikProps.touched.organizationName &&
                      formikProps.errors.organizationName && (
                        <p className={styles.error}>
                          {formikProps.errors.organizationName}
                        </p>
                      )}
                  </div>
                  <div>
                    <PrimaryButton
                      label={this.props.intl.formatMessage(messages.proceed)}
                      onClick={formikProps.handleSubmit}
                      isDisabled={
                        !formikProps.isValid || formikProps.isSubmitting
                      }
                    />
                  </div>
                </Spacings.Stack>
              );
            }}
          />
        </LoginBox>
      </PublicPageContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getOrganizationByName: name =>
    dispatch(sdkActions.get({ uri: `/sso/organization?name=${name}` })),
});

export default compose(
  injectIntl,
  withProps(() => ({
    originUrl: window.location.origin,
    redirectTo: target => window.location.replace(target),
  })),
  connect(
    null,
    mapDispatchToProps
  )
)(LoginSSO);
