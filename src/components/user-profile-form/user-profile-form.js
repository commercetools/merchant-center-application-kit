import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Formik } from 'formik';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import PageBottomSpacer from '@commercetools-local/core/components/page-bottom-spacer';
import WarningSaveToolbar from '@commercetools-local/core/components/warning-save-toolbar';
import UserProfileGeneralInfoSubform from '../user-profile-general-info-subform';
import UserProfilePersonalSettingsSubform from '../user-profile-personal-settings-subform';
import validate from './validations';

export class UserProfileForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        onSubmit={this.props.onSubmit}
        enableReinitialize={true}
        validate={validate}
        render={formikProps => (
          <form>
            <Spacings.Inset>
              <Spacings.Stack scale="m">
                <UserProfileGeneralInfoSubform formik={formikProps} />
                <UserProfilePersonalSettingsSubform formik={formikProps} />
              </Spacings.Stack>
              <PageBottomSpacer />
              <WarningSaveToolbar
                onSave={formikProps.handleSubmit}
                onCancel={formikProps.handleReset}
                shouldWarnOnLeave={formikProps.dirty}
                isToolbarVisible={formikProps.dirty}
                isToolbarDisabled={formikProps.isSubmitting}
              />
            </Spacings.Inset>
          </form>
        )}
      />
    );
  }
}

UserProfileForm.displayName = 'UserProfileForm';
UserProfileForm.propTypes = {
  initialValues: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    timeZone: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(UserProfileForm);
