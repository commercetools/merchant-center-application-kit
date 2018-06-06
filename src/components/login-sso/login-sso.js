import querystring from 'querystring';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose, withProps } from 'recompose';
import { Formik, Field } from 'formik';
import uuid from 'uuid/v4';
import Text from '@commercetools-local/ui-kit/typography/text';
import PrimaryButton from '@commercetools-local/ui-kit/buttons/primary-button';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import {
  joinPaths,
  trimLeadingAndTrailingSlashes,
} from '@commercetools-local/utils/url';
import * as sdkActions from '@commercetools-local/sdk/actions';
import { connect } from 'react-redux';
import * as storage from '@commercetools-local/storage';
import { messages as validationMessages } from '@commercetools-local/utils/validation';
import LabelField from '@commercetools-local/core/components/fields/label-field';
import { Notification } from '@commercetools-local/react-notifications';
import { ORGANIZATION_GENERAL_ERROR, STORAGE_KEYS } from '../../constants';
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

function generateAndCacheNonce() {
  const nonce = uuid();
  storage.put(STORAGE_KEYS.NONCE, nonce);
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
        validationMessages.required
      );
    }
    return errors;
  };
  handleSubmit = (values, actions) => {
    this.props.getOrganizationByName(values.organizationName).then(
      authProvider => {
        actions.setSubmitting(false);
        if (authProvider.protocol === 'oidc') {
          // Quick note: we assume that the authorization endpoint is /authorize
          // This endpoint name is not mandatory. However, it is used as a common
          // practice throughout the OIDC specification.
          // We might have to let customers set a custom endpoint in the future.
          const redirectUriParams = querystring.stringify({
            organizationId: authProvider.organizationId,
          });
          const params = querystring.stringify({
            scope: 'openid email profile',
            response_type: 'id_token',
            client_id: authProvider.clientId,
            redirect_uri: trimLeadingAndTrailingSlashes(
              joinPaths(
                this.props.originUrl,
                this.props.match.url,
                `callback?${redirectUriParams}`
              )
            ),
            nonce: generateAndCacheNonce(),
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
