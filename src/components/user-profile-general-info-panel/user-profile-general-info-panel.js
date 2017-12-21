import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { injectIntl, intlShape } from 'react-intl';
import { Field } from 'redux-form';
import ThrottledField from '@commercetools-local/core/components/fields/throttled-field';
import wrapInputForReduxForm from '@commercetools-local/core/components/input-wrapper';
import CollapsiblePanel from '@commercetools-local/ui-kit/panels/collapsible-panel';
import FormBox from '@commercetools-local/core/components/form-box';
import LabelField from '@commercetools-local/core/components/fields/label-field';
import messages from './messages';

const Input = compose(
  wrapInputForReduxForm,
  withProps(ownerProps => ({
    // the ThrottledField component only passes the DOM event as param when
    // calling the onChange handler but redux-form expects the changed value
    onChange: ({ target }) => ownerProps.onChange(target.value),
    // we need to pass onEnter here so that ThrottledField aborts pending
    // updates and calls onChange with the current value when hitting "Enter"
    // We don't add some custom implementation here because redux-form already
    // listens to the onKeyDown events on the field and submits the form when
    // "Enter" is pressed
    onEnter: () => {},
  }))
)(ThrottledField);

const shouldShowError = meta =>
  (meta.hasSubmitFailed || meta.touched) && meta.invalid;

export const UserProfileGeneralInfoPanel = props => (
  <CollapsiblePanel label={props.intl.formatMessage(messages.title)}>
    <FormBox>
      <LabelField
        title={props.intl.formatMessage(messages.firstName)}
        isRequired={true}
      />
      <Field
        name="firstName"
        component={Input}
        shouldDisplayTooltip={shouldShowError}
        submitFailed={props.hasSubmitFailed}
      />
    </FormBox>
    <FormBox>
      <LabelField
        title={props.intl.formatMessage(messages.lastName)}
        isRequired={true}
      />
      <Field
        name="lastName"
        component={Input}
        shouldDisplayTooltip={shouldShowError}
        submitFailed={props.hasSubmitFailed}
      />
    </FormBox>
    <FormBox>
      <LabelField title={props.intl.formatMessage(messages.email)} />
      <Field name="email" component={Input} disabled={true} />
    </FormBox>
  </CollapsiblePanel>
);
UserProfileGeneralInfoPanel.displayName = 'UserProfileGeneralInfoPanel';
UserProfileGeneralInfoPanel.propTypes = {
  hasSubmitFailed: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(UserProfileGeneralInfoPanel);
