import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Formik } from 'formik';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import PageBottomSpacer from '@commercetools-local/core/components/page-bottom-spacer';
import WarningSaveToolbar from '@commercetools-local/core/components/warning-save-toolbar';
import UserProfileGeneralInfoPanel from '../user-profile-general-info-panel';
import UserProfilePersonalSettingsPanel from '../user-profile-personal-settings-panel';
import validate from './validations';

export class UserProfileForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        onSubmit={this.props.onSubmit}
        enableReinitialize={true}
        validate={validate}
        render={form => {
          const onBlurField = name => form.setFieldTouched(name, true);
          return (
            <form>
              <Spacings.Inset>
                <Spacings.Stack scale="m">
                  <UserProfileGeneralInfoPanel
                    values={form.values}
                    errors={form.errors}
                    touched={form.touched}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    isSubmitting={form.isSubmitting}
                  />
                  <UserProfilePersonalSettingsPanel
                    values={form.values}
                    onChangeFieldValue={form.setFieldValue}
                    onBlurField={onBlurField}
                    isSubmitting={form.isSubmitting}
                  />
                </Spacings.Stack>
                <PageBottomSpacer />
                <WarningSaveToolbar
                  onSave={form.handleSubmit}
                  onCancel={form.handleReset}
                  shouldWarnOnLeave={form.dirty}
                  isToolbarVisible={form.dirty}
                  isToolbarDisabled={form.isSubmitting}
                />
              </Spacings.Inset>
            </form>
          );
        }}
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
