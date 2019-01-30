import querystring from 'querystring';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { Formik } from 'formik';
import uuid from 'uuid/v4';
import {
  Text,
  PrimaryButton,
  Spacings,
  TextField,
  ContentNotification,
} from '@commercetools-frontend/ui-kit';
import {
  joinPaths,
  trimLeadingAndTrailingSlashes,
} from '@commercetools-frontend/url-utils';
import { sessionStorage } from '@commercetools-frontend/storage';
import { actions as sdkActions } from '@commercetools-frontend/sdk';
import { connect } from 'react-redux';
import { ORGANIZATION_GENERAL_ERROR, STORAGE_KEYS } from '../../constants';
import PublicPageContainer from '../public-page-container';
import LoginBox from '../login-box';
import messages from './messages';
import { validate } from './validations';

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
  sessionStorage.put(`${STORAGE_KEYS.NONCE}_${nonce}`, JSON.stringify(state));
  return nonce;
}

const originUrl = window.location.origin;

const redirect = targetUrl => window.location.replace(targetUrl);

export class LoginSSO extends React.PureComponent {
  static displayName = 'LoginSSO';
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    getOrganizationByName: PropTypes.func.isRequired,
  };
  handleSubmit = (values, actions) => {
    this.props.getOrganizationByName(values.organizationName).then(
      authProvider => {
        actions.setSubmitting(false);

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
            joinPaths(originUrl, this.props.match.url, `callback`)
          ),
          nonce: generateAndCacheNonceWithState({
            organizationId: authProvider.organizationId,
          }),
        });
        redirect(`${authProvider.authorizeUrl}?${params}`);
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
            initialValues={{ organizationName: '' }}
            validate={validate}
            onSubmit={this.handleSubmit}
            render={formikProps => {
              const errorMessageKey = getMessageKeyForError(
                formikProps.status && formikProps.status.errorMessage
              );
              return (
                <form onSubmit={formikProps.handleSubmit}>
                  <Spacings.Stack scale="m">
                    {formikProps.status && formikProps.status.errorMessage ? (
                      <ContentNotification type="error">
                        <Spacings.Stack scale="s">
                          <Text.Body>
                            {messages[errorMessageKey] ? (
                              <FormattedMessage
                                {...messages[errorMessageKey]}
                              />
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
                        </Spacings.Stack>
                      </ContentNotification>
                    ) : null}
                    <Text.Subheadline elementType="h4">
                      <FormattedMessage {...messages.title} />
                    </Text.Subheadline>
                    <TextField
                      name="organizationName"
                      title={this.props.intl.formatMessage(
                        messages.organization
                      )}
                      hint={this.props.intl.formatMessage(
                        messages.caseSensitive
                      )}
                      isAutofocussed={true}
                      isRequired={true}
                      value={formikProps.values.organizationName}
                      touched={formikProps.touched.organizationName}
                      errors={formikProps.errors.organizationName}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      isDisabled={formikProps.isSubmitting}
                    />
                    <Spacings.Inline>
                      <PrimaryButton
                        type="submit"
                        label={this.props.intl.formatMessage(messages.proceed)}
                        onClick={formikProps.handleSubmit}
                        isDisabled={formikProps.isSubmitting}
                      />
                    </Spacings.Inline>
                  </Spacings.Stack>
                </form>
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
  connect(
    null,
    mapDispatchToProps
  )
)(LoginSSO);
