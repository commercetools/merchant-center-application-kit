import React from 'react';
import PropTypes from 'prop-types';
import DialogContainer from '../internals/dialog-container';
import DialogHeader from '../internals/dialog-header';
import DialogContent from '../internals/dialog-content';
import DialogFooter from '../internals/dialog-footer';
import messages from '../internals/messages';

const FormDialog = props => (
  <DialogContainer
    isOpen={props.isOpen}
    onClose={props.onClose}
    size={props.size}
    zIndex={props.zIndex}
    title={props.title}
  >
    <DialogHeader title={props.title} onClose={props.onClose} />
    <DialogContent>{props.children}</DialogContent>
    <DialogFooter
      labelSecondary={props.labelSecondary}
      labelPrimary={props.labelPrimary}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      onCancel={props.onSecondaryButtonClick}
      onConfirm={props.onPrimaryButtonClick}
      dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
      dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
    />
  </DialogContainer>
);
FormDialog.displayName = 'FormDialog';
FormDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['m', 'l', 'scale']),
  zIndex: PropTypes.number,
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
  onSecondaryButtonClick: PropTypes.func.isRequired,
  onPrimaryButtonClick: PropTypes.func.isRequired,
  dataAttributesSecondaryButton: PropTypes.object,
  dataAttributesPrimaryButton: PropTypes.object,
};
FormDialog.defaultProps = {
  labelSecondary: messages.cancel,
  labelPrimary: messages.save,
};
// Make some default intl messages available to use
FormDialog.Intl = messages;

export default FormDialog;
