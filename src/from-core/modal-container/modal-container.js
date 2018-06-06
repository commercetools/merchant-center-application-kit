import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';
import { portalsContainerId } from '../../components/portals-container';

const ModalContainer = props => (
  <Modal
    {...props}
    parentSelector={() => document.querySelector(`#${portalsContainerId}`)}
    ariaHideApp={false}
  >
    {props.children}
  </Modal>
);
ModalContainer.displayName = 'ModalContainer';
ModalContainer.propTypes = {
  children: PropTypes.node,
};

export default ModalContainer;
