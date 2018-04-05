import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import TextInput from '@commercetools-local/ui-kit/inputs/text-input';
import ValidationError from '@commercetools-local/core/components/validation-error';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import CollapsiblePanel from '@commercetools-local/ui-kit/panels/collapsible-panel';
import ErrorMessage from '@commercetools-local/ui-kit/messages/error-message';
import { messages as validationMessages } from '@commercetools-local/utils/validation';
import FormBox from '@commercetools-local/core/components/form-box';
import LabelField from '@commercetools-local/core/components/fields/label-field';
import messages from './messages';

export const UserProfileGeneralInfoSubform = props => (
  <CollapsiblePanel label={<FormattedMessage {...messages.title} />}>
    <FormBox>
      <LabelField
        title={<FormattedMessage {...messages.firstName} />}
        isRequired={true}
      />
      <Spacings.Stack>
        <TextInput
          name="firstName"
          value={props.formik.values.firstName}
          hasError={Boolean(
            props.formik.touched.firstName && props.formik.errors.firstName
          )}
          onChange={props.formik.handleChange}
          isDisabled={props.formik.isSubmitting}
        />
        <ValidationError.Switch
          errors={props.formik.errors.firstName}
          isTouched={props.formik.touched.firstName}
        >
          <ValidationError.Match rule="required">
            <ErrorMessage>
              <FormattedMessage {...validationMessages.required} />
            </ErrorMessage>
          </ValidationError.Match>
        </ValidationError.Switch>
      </Spacings.Stack>
    </FormBox>
    <FormBox>
      <LabelField
        title={<FormattedMessage {...messages.lastName} />}
        isRequired={true}
      />
      <Spacings.Stack>
        <TextInput
          name="lastName"
          value={props.formik.values.lastName}
          hasError={Boolean(
            props.formik.touched.lastName && props.formik.errors.lastName
          )}
          onChange={props.formik.handleChange}
          isDisabled={props.formik.isSubmitting}
        />
        <ValidationError.Switch
          errors={props.formik.errors.lastName}
          isTouched={props.formik.touched.lastName}
        >
          <ValidationError.Match rule="required">
            <ErrorMessage>
              <FormattedMessage {...validationMessages.required} />
            </ErrorMessage>
          </ValidationError.Match>
        </ValidationError.Switch>
      </Spacings.Stack>
    </FormBox>
    <FormBox>
      <LabelField title={<FormattedMessage {...messages.email} />} />
      <TextInput
        name="email"
        value={props.formik.values.email}
        isDisabled={true}
        onChange={props.formik.handleChange}
      />
    </FormBox>
  </CollapsiblePanel>
);
UserProfileGeneralInfoSubform.displayName = 'UserProfileGeneralInfoSubform';
UserProfileGeneralInfoSubform.propTypes = {
  formik: PropTypes.shape({
    isSubmitting: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      firstName: PropTypes.shape({
        required: PropTypes.bool.isRequired,
      }),
      lastName: PropTypes.shape({
        required: PropTypes.bool.isRequired,
      }),
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
};

export default UserProfileGeneralInfoSubform;
