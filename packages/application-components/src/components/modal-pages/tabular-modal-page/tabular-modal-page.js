import React from 'react';
import PropTypes from 'prop-types';
import ModalPage from '../internals/modal-page';
import ModalPageTopBar from '../internals/modal-page-top-bar';

const TabularModalPage = props => (
  <ModalPage
    level={props.level}
    title={props.title}
    isOpen={props.isOpen}
    zIndex={props.zIndex}
    onClose={props.onClose}
    baseZIndex={props.baseZIndex}
    parentSelector={props.parentSelector}
  >
    <ModalPageTopBar
      color="neutral"
      onClose={props.onClose}
      currentPathLabel={props.topBarCurrentPathLabel || props.title}
      previousPathLabel={props.topBarPreviousPathLabel}
    />
    {props.children}
  </ModalPage>
);
TabularModalPage.displayName = 'TabularModalPage';
TabularModalPage.propTypes = {
  level: PropTypes.number,
  title: PropTypes.string.isRequired,
  zIndex: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  baseZIndex: PropTypes.number,
  parentSelector: PropTypes.string,
  // TopBar Props
  topBarCurrentPathLabel: PropTypes.string,
  topBarPreviousPathLabel: PropTypes.string,
};

export default TabularModalPage;
