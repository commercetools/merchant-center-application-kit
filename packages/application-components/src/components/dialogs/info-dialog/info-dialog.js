import React from 'react';
import PropTypes from 'prop-types';
import DialogContainer from '../internals/dialog-container';
import DialogHeader from '../internals/dialog-header';
import DialogContent from '../internals/dialog-content';

const InfoDialog = props => (
  <DialogContainer
    isOpen={props.isOpen}
    onClose={props.onClose}
    horizontalConstraint={props.horizontalConstraint}
  >
    <DialogHeader title={props.title} onClose={props.onClose} />
    <DialogContent>{props.children}</DialogContent>
  </DialogContainer>
);
InfoDialog.displayName = 'InfoDialog';
InfoDialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  horizontalConstraint: PropTypes.oneOf(['m', 'l']),
  // React modal props
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoDialog;
