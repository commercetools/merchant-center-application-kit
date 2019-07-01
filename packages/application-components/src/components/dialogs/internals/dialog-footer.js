import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
  SecondaryButton,
  PrimaryButton,
  Spacings,
} from '@commercetools-frontend/ui-kit';
import filterDataAttributes from '../../../utils/filter-data-attributes';

const getFormattedLabel = (label, intl) =>
  typeof label === 'string' ? label : intl.formatMessage(label);

const DialogFooter = props => {
  const intl = useIntl();
  return (
    <Spacings.Inline scale="m" alignItems="center" justifyContent="flex-end">
      <SecondaryButton
        label={getFormattedLabel(props.labelSecondary, intl)}
        onClick={props.onCancel}
        {...filterDataAttributes(props.dataAttributesSecondaryButton)}
      />
      <PrimaryButton
        label={getFormattedLabel(props.labelPrimary, intl)}
        onClick={props.onConfirm}
        isDisabled={props.isPrimaryButtonDisabled}
        {...filterDataAttributes(props.dataAttributesPrimaryButton)}
      />
    </Spacings.Inline>
  );
};
DialogFooter.displayName = 'DialogFooter';
DialogFooter.propTypes = {
  labelSecondary: PropTypes.oneOfType([
    PropTypes.string,
    // intl message
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  labelPrimary: PropTypes.oneOfType([
    PropTypes.string,
    // intl message
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  isPrimaryButtonDisabled: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  dataAttributesSecondaryButton: PropTypes.object,
  dataAttributesPrimaryButton: PropTypes.object,
};
DialogFooter.defaultProps = {
  isPrimaryButtonDisabled: false,
  dataAttributesSecondaryButton: {},
  dataAttributesPrimaryButton: {},
};

export default DialogFooter;
