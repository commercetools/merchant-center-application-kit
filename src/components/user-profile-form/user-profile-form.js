import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Formik } from 'formik';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import PageBottomSpacer from '@commercetools-local/core/components/page-bottom-spacer';
import WarningSaveToolbar from '@commercetools-local/core/components/warning-save-toolbar';
import UserProfileGeneralInfoPanel from '../user-profile-general-info-panel';
import UserProfilePersonalSettingsPanel from '../user-profile-personal-settings-panel';

export const validate = values => {
  const errors = {};
  if (values.firstName.trim().length === 0) errors.firstNameMissing = true;
  if (values.lastName.trim().length === 0) errors.lastNameMissing = true;
  return errors;
};

export class UserProfileForm extends React.Component {
  state = {
    hasAttemptedSubmit: false,
  };
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
                    hasAttemptedSubmit={this.state.hasAttemptedSubmit}
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
                  onSave={(...args) => {
                    // NOTE unfortunately I could not find a way for formik to
                    // give us this information: has the user attempted to
                    // submit the form at least once?
                    // Maybe it's worth adding a PR to formik, should be simple
                    this.setState({ hasAttemptedSubmit: true });
                    return form.handleSubmit(...args);
                  }}
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
