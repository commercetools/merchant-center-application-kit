import React from 'react';
import PropTypes from 'prop-types';
import DialogContainer from '../internals/dialog-container';
import DialogHeader from '../internals/dialog-header';
import DialogContent from '../internals/dialog-content';

const InfoDialog = props => (
  <DialogContainer
    isOpen={props.isOpen}
    onClose={props.onClose}
    size={props.size}
    zIndex={props.zIndex}
    title={props.title}
    getParentSelector={props.getParentSelector}
  >
    <DialogHeader title={props.title} onClose={props.onClose} />
    <DialogContent>{props.children}</DialogContent>
  </DialogContainer>
);
InfoDialog.displayName = 'InfoDialog';
InfoDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['m', 'l', 'scale']),
  zIndex: PropTypes.number,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  getParentSelector: PropTypes.func,
};

export default InfoDialog;
