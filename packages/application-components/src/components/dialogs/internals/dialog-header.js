import React from 'react';
import PropTypes from 'prop-types';
import {
  CloseIcon,
  SecondaryIconButton,
  Text,
  Spacings,
} from '@commercetools-frontend/ui-kit';

const DialogHeader = props => (
  <Spacings.Inline scale="m" alignItems="center" justifyContent="space-between">
    <Text.Subheadline elementType="h4" truncate={true} title={props.title}>
      {props.title}
    </Text.Subheadline>
    {props.onClose && (
      <SecondaryIconButton
        label="Close dialog"
        onClick={props.onClose}
        icon={<CloseIcon size="medium" />}
      />
    )}
  </Spacings.Inline>
);
DialogHeader.displayName = 'DialogHeader';
DialogHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default DialogHeader;
