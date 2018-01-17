import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { compose } from 'recompose';
import { reduxForm, getFormValues, getFormSyncErrors } from 'redux-form';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import { messages as validationMessages } from '@commercetools-local/utils/validation';
import PageBottomSpacer from '@commercetools-local/core/components/page-bottom-spacer';
import keepDisplayName from '@commercetools-local/core/components/keep-display-name';
import SaveToolbar from '@commercetools-local/core/components/save-toolbar';
import UserProfileGeneralInfoPanel from '../user-profile-general-info-panel';
import UserProfilePersonalSettingsPanel from '../user-profile-personal-settings-panel';
import { USER_PROFILE_FORM_NAME } from '../../constants';

export const UserProfileForm = props => (
  <Spacings.Inset>
    <Spacings.Stack scale="m">
      <UserProfileGeneralInfoPanel hasSubmitFailed={props.submitFailed} />
      <UserProfilePersonalSettingsPanel />
    </Spacings.Stack>
    <PageBottomSpacer />
    {/* TODO make WarnSaveToolbar #RR4 */}
    <SaveToolbar
      route={props.route}
      onSave={props.handleSubmit}
      onCancel={props.reset}
      shouldWarnOnLeave={!props.submitSucceeded && props.dirty}
      // remove isVisible for WarnSaveToolbar #RR4
      isVisible={props.isSaveToolbarAlwaysVisible || props.dirty}
      isToolbarVisible={props.isSaveToolbarAlwaysVisible || props.dirty}
      isToolbarDisabled={props.submitting || props.pristine || props.invalid}
    />
  </Spacings.Inset>
);
UserProfileForm.displayName = 'UserProfileForm';
UserProfileForm.propTypes = {
  // From parent component
  onSubmit: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  isSaveToolbarAlwaysVisible: PropTypes.bool,
  // This is used by the form validation
  intl: intlShape.isRequired,
  // From redux-form
  invalid: PropTypes.bool,
  dirty: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  submitSucceeded: PropTypes.bool,
  syncErrors: PropTypes.object,
  submitFailed: PropTypes.bool,
};
UserProfileForm.defaultProps = {
  isSaveToolbarAlwaysVisible: false,
};

export default compose(
  keepDisplayName(UserProfileForm),
  injectIntl,
  reduxForm({
    form: USER_PROFILE_FORM_NAME,
    enableReinitialize: true,
    validate: (values, props) => {
      const errors = {};
      if (!values.firstName)
        errors.firstName = props.intl.formatMessage(
          validationMessages.required
        );
      if (!values.lastName)
        errors.lastName = props.intl.formatMessage(validationMessages.required);
      return errors;
    },
  }),
  connect(state => ({
    values: getFormValues(USER_PROFILE_FORM_NAME)(state),
    syncErrors: getFormSyncErrors(USER_PROFILE_FORM_NAME)(state),
  }))
)(UserProfileForm);
