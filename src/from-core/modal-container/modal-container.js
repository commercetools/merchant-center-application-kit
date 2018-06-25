import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';

const ModalContainer = props => (
  <Modal
    {...props}
    parentSelector={() => document.querySelector(`#${PORTALS_CONTAINER_ID}`)}
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
