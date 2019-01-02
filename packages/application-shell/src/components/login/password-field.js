/* FIXME: move it to ui-kit */
import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { defineMessages, FormattedMessage } from 'react-intl';
import {
  Constraints,
  Spacings,
  FieldLabel,
  PasswordInput,
  ErrorMessage,
} from '@commercetools-frontend/ui-kit';

const messages = defineMessages({
  missingRequiredField: {
    id: 'LoginForm.missingRequiredField',
    description: 'Error message for missing required value',
    defaultMessage: 'This field is required. Provide a value.',
  },
});

const createSequentialId = prefix => {
  let id = 0;
  return () => {
    id += 1;
    return `${prefix}${id}`;
  };
};

const sequentialId = createSequentialId('password-field-');

const hasErrors = errors => errors && Object.values(errors).some(Boolean);

class PasswordField extends React.Component {
  static displayName = 'PasswordField';

  static propTypes = {
    // PasswordField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    isRequired: PropTypes.bool,
    touched: PropTypes.bool,

    // PasswordInput
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isAutofocussed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    placeholder: PropTypes.string,

    // LabelField
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    hint: requiredIf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      props => props.hintIcon
    ),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onInfoButtonClick: PropTypes.func,
    hintIcon: PropTypes.node,
    badge: PropTypes.node,
  };

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: do {
      if (props.id) props.id;
      else if (state.id) state.id;
      else sequentialId();
    },
  });

  render() {
    const hasError = this.props.touched && hasErrors(this.props.errors);
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Spacings.Stack scale="xs">
          <FieldLabel
            title={this.props.title}
            hint={this.props.hint}
            description={this.props.description}
            onInfoButtonClick={this.props.onInfoButtonClick}
            hintIcon={this.props.hintIcon}
            badge={this.props.badge}
            hasRequiredIndicator={this.props.isRequired}
            htmlFor={this.state.id}
          />
          <PasswordInput
            id={this.state.id}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            isAutofocussed={this.props.isAutofocussed}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            hasError={hasError}
            placeholder={this.props.placeholder}
            horizontalConstraint="scale"
          />
          {hasError && this.props.errors?.missing && (
            <ErrorMessage>
              <FormattedMessage {...messages.missingRequiredField} />
            </ErrorMessage>
          )}
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}

export default PasswordField;
