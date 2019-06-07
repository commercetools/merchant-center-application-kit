import React from 'react';
import PropTypes from 'prop-types';
import ModalPage from '../internals/modal-page';
import ModalPageTopBar from '../internals/modal-page-top-bar';
import ModalPageHeader from '../internals/modal-page-header';
import { ContentWrapper } from '../internals/modal-page.styles';

const InfoModalPage = props => (
  <ModalPage
    level={props.level}
    title={props.title}
    isOpen={props.isOpen}
    zIndex={props.zIndex}
    onClose={props.onClose}
    baseZIndex={props.baseZIndex}
    getParentSelector={props.getParentSelector}
  >
    <ModalPageTopBar
      onClose={props.onClose}
      currentPathLabel={props.topBarCurrentPathLabel || props.title}
      previousPathLabel={props.topBarPreviousPathLabel}
    />
    <ModalPageHeader
      title={props.title}
      subtitle={props.subtitle}
      showControls={false}
    />
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
InfoModalPage.displayName = 'InfoModalPage';
InfoModalPage.propTypes = {
  level: PropTypes.number,
  title: PropTypes.string.isRequired,
  zIndex: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  baseZIndex: PropTypes.number,
  getParentSelector: PropTypes.string,
  // TopBar Props
  topBarCurrentPathLabel: PropTypes.string,
  topBarPreviousPathLabel: PropTypes.string,
  // Header Props
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default InfoModalPage;
