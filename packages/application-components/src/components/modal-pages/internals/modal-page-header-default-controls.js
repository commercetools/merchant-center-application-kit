import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import requiredIf from 'react-required-if';
import {
  Spacings,
  PrimaryButton,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';
import filterDataAttributes from '../../../utils/filter-data-attributes';

const getFormattedLabel = (label, intl) =>
  typeof label === 'string' ? label : intl.formatMessage(label);

const ModalPageHeaderDefaultControls = props => {
  const intl = useIntl();
  return (
    <Spacings.Inline alignItems="flex-end">
      <SecondaryButton
        label={getFormattedLabel(props.labelSecondaryButton, intl)}
        onClick={props.onSecondaryButtonClick}
        {...filterDataAttributes(props.dataAttributesSecondaryButton)}
      />
      <PrimaryButton
        label={getFormattedLabel(props.labelPrimaryButton, intl)}
        onClick={props.onPrimaryButtonClick}
        isDisabled={props.isPrimaryButtonDisabled}
        {...filterDataAttributes(props.dataAttributesPrimaryButton)}
      />
    </Spacings.Inline>
  );
};
ModalPageHeaderDefaultControls.displayName = 'ModalPageHeaderDefaultControls';
ModalPageHeaderDefaultControls.propTypes = {
  labelSecondaryButton: requiredIf(
    PropTypes.oneOfType([
      PropTypes.string,
      // intl message
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        defaultMessage: PropTypes.string.isRequired,
      }),
    ]),
    props => !props.customControls
  ),
  labelPrimaryButton: requiredIf(
    PropTypes.oneOfType([
      PropTypes.string,
      // intl message
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        defaultMessage: PropTypes.string.isRequired,
      }),
    ]),
    props => !props.customControls
  ),
  onSecondaryButtonClick: requiredIf(
    PropTypes.func,
    props => !props.customControls
  ),
  onPrimaryButtonClick: requiredIf(
    PropTypes.func,
    props => !props.customControls
  ),
  isPrimaryButtonDisabled: PropTypes.bool,
  dataAttributesPrimaryButton: PropTypes.object,
  dataAttributesSecondaryButton: PropTypes.object,
};
ModalPageHeaderDefaultControls.defaultProps = {
  isPrimaryButtonDisabled: false,
  dataAttributesPrimaryButton: {},
  dataAttributesSecondaryButton: {},
};

export default ModalPageHeaderDefaultControls;
