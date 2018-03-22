import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import TextInput from '@commercetools-local/ui-kit/inputs/text-input';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import CollapsiblePanel from '@commercetools-local/ui-kit/panels/collapsible-panel';
import ErrorMessage from '@commercetools-local/ui-kit/messages/error-message';
import { messages as validationMessages } from '@commercetools-local/utils/validation';
import FormBox from '@commercetools-local/core/components/form-box';
import LabelField from '@commercetools-local/core/components/fields/label-field';
import messages from './messages';

export const UserProfileGeneralInfoSubform = props => (
  <CollapsiblePanel label={props.intl.formatMessage(messages.title)}>
    <FormBox>
      <LabelField
        title={props.intl.formatMessage(messages.firstName)}
        isRequired={true}
      />
      <Spacings.Stack>
        <TextInput
          name="firstName"
          value={props.form.values.firstName}
          hasWarning={
            props.form.touched.firstName && props.form.errors.firstNameMissing
          }
          onChange={props.form.handleChange}
          isDisabled={props.form.isSubmitting}
        />
        {props.form.touched.firstName &&
          props.form.errors.firstNameMissing && (
            <ErrorMessage>
              <FormattedMessage {...validationMessages.required} />
            </ErrorMessage>
          )}
      </Spacings.Stack>
    </FormBox>
    <FormBox>
      <LabelField
        title={props.intl.formatMessage(messages.lastName)}
        isRequired={true}
      />
      <Spacings.Stack>
        <TextInput
          name="lastName"
          value={props.form.values.lastName}
          hasError={
            props.form.touched.lastName && props.form.errors.lastNameMissing
          }
          onChange={props.form.handleChange}
          isDisabled={props.form.isSubmitting}
        />
        {props.form.touched.lastName &&
          props.form.errors.lastNameMissing && (
            <ErrorMessage>
              <FormattedMessage {...validationMessages.required} />
            </ErrorMessage>
          )}
      </Spacings.Stack>
    </FormBox>
    <FormBox>
      <LabelField title={props.intl.formatMessage(messages.email)} />
      <TextInput
        name="email"
        value={props.form.values.email}
        isDisabled={true}
        onChange={props.form.handleChange}
      />
    </FormBox>
  </CollapsiblePanel>
);
UserProfileGeneralInfoSubform.displayName = 'UserProfileGeneralInfoSubform';
UserProfileGeneralInfoSubform.propTypes = {
  form: PropTypes.shape({
    isSubmitting: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      firstNameMissing: PropTypes.boolean,
      lastNameMissing: PropTypes.boolean,
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
    handleChange: PropTypes.func.isRequired,
  }),

  intl: intlShape.isRequired,
};

export default injectIntl(UserProfileGeneralInfoSubform);
