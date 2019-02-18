import React from 'react';
import PropTypes from 'prop-types';
import DialogContainer from '../internals/dialog-container';
import DialogHeader from '../internals/dialog-header';
import DialogContent from '../internals/dialog-content';
import DialogFooter from '../internals/dialog-footer';
import messages from '../internals/messages';

const ConfirmationDialog = props => (
  <DialogContainer
    isOpen={props.isOpen}
    onClose={props.onClose}
    horizontalConstraint={props.horizontalConstraint}
  >
    <DialogHeader title={props.title} onClose={props.onClose} />
    <DialogContent>{props.children}</DialogContent>
    <DialogFooter
      labelSecondary={props.labelSecondary}
      labelPrimary={props.labelPrimary}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      onCancel={props.onCancel}
      onConfirm={props.onConfirm}
      dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
      dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
    />
  </DialogContainer>
);
ConfirmationDialog.displayName = 'ConfirmationDialog';
ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  horizontalConstraint: PropTypes.oneOf(['m', 'l']),
  children: PropTypes.node.isRequired,
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
ConfirmationDialog.defaultProps = {
  labelSecondary: messages.cancel,
  labelPrimary: messages.confirm,
};
// Make some default intl messages available to use
ConfirmationDialog.Intl = messages;

export default ConfirmationDialog;
