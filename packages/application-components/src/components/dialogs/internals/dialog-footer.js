import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
  SecondaryButton,
  PrimaryButton,
  Spacings,
} from '@commercetools-frontend/ui-kit';
import filterDataAttributes from '../../../utils/filter-data-attributes';

const useLabel = (label, intl) =>
  typeof label === 'string' ? label : intl.formatMessage(label);

const DialogFooter = props => (
  <Spacings.Inline scale="m" alignItems="center" justifyContent="flex-end">
    <SecondaryButton
      label={useLabel(props.labelSecondary, props.intl)}
      onClick={props.onCancel}
      {...filterDataAttributes(props.dataAttributesSecondaryButton)}
    />
    <PrimaryButton
      label={useLabel(props.labelPrimary, props.intl)}
      onClick={props.onConfirm}
      isDisabled={props.isPrimaryButtonDisabled}
      {...filterDataAttributes(props.dataAttributesPrimaryButton)}
    />
  </Spacings.Inline>
);
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

  // injected
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};
DialogFooter.defaultProps = {
  isPrimaryButtonDisabled: false,
  dataAttributesSecondaryButton: {},
  dataAttributesPrimaryButton: {},
};

export default injectIntl(DialogFooter);
