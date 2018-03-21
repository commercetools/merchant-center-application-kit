import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import TextInput from '@commercetools-local/ui-kit/inputs/text-input';
import CollapsiblePanel from '@commercetools-local/ui-kit/panels/collapsible-panel';
import { messages as validationMessages } from '@commercetools-local/utils/validation';
import Text from '@commercetools-local/ui-kit/typography/text';
import FormBox from '@commercetools-local/core/components/form-box';
import LabelField from '@commercetools-local/core/components/fields/label-field';
import messages from './messages';

export const UserProfileGeneralInfoPanel = ({
  isSubmitting,
  hasAttemptedSubmit,
  values,
  errors,
  intl,
  touched,
  onChange,
  onBlur,
}) => (
  <CollapsiblePanel label={intl.formatMessage(messages.title)}>
    <FormBox>
      <LabelField
        title={intl.formatMessage(messages.firstName)}
        isRequired={true}
      />
      {hasAttemptedSubmit &&
        touched.firstName &&
        errors.firstNameMissing && (
          <Text.Detail tone="negative">
            <FormattedMessage {...validationMessages.required} />
          </Text.Detail>
        )}
      <TextInput
        name="firstName"
        value={values.firstName}
        hasWarning={
          hasAttemptedSubmit && touched.firstName && errors.firstNameMissing
        }
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={isSubmitting}
      />
    </FormBox>
    <FormBox>
      <LabelField
        title={intl.formatMessage(messages.lastName)}
        isRequired={true}
      />
      {hasAttemptedSubmit &&
        touched.lastName &&
        errors.lastNameMissing && (
          <Text.Detail tone="negative">
            <FormattedMessage {...validationMessages.required} />
          </Text.Detail>
        )}
      <TextInput
        name="lastName"
        value={values.lastName}
        hasError={
          hasAttemptedSubmit && touched.lastName && errors.lastNameMissing
        }
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={isSubmitting}
      />
    </FormBox>
    <FormBox>
      <LabelField title={intl.formatMessage(messages.email)} />
      <TextInput
        name="email"
        value={values.email}
        isDisabled={true}
        onChange={onChange}
        onBlur={onBlur}
      />
    </FormBox>
  </CollapsiblePanel>
);
UserProfileGeneralInfoPanel.displayName = 'UserProfileGeneralInfoPanel';
UserProfileGeneralInfoPanel.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  hasAttemptedSubmit: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  values: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  touched: PropTypes.shape({
    firstName: PropTypes.bool,
    lastName: PropTypes.bool,
  }),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(UserProfileGeneralInfoPanel);
