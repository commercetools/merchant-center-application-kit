import React from 'react';
import PropTypes from 'prop-types';
import buttonMessages from '../../../utils/button-messages';
import ModalPage from '../internals/modal-page';
import ModalPageTopBar from '../internals/modal-page-top-bar';
import ModalPageHeader from '../internals/modal-page-header';
import { ContentWrapper } from '../internals/modal-page.styles';

const FormModalPage = props => (
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
      onClose={props.onClose}
      currentPathLabel={props.topBarCurrentPathLabel || props.title}
      previousPathLabel={props.topBarPreviousPathLabel}
    />
    <ModalPageHeader
      title={props.title}
      subtitle={props.subtitle}
      customControls={props.customControls}
      labelPrimaryButton={props.labelPrimaryButton}
      labelSecondaryButton={props.labelSecondaryButton}
      onPrimaryButtonClick={props.onPrimaryButtonClick}
      onSecondaryButtonClick={props.onSecondaryButtonClick}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
      dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
    />
    <ContentWrapper>{props.children}</ContentWrapper>
  </ModalPage>
);
FormModalPage.displayName = 'FormModalPage';
FormModalPage.propTypes = {
  level: PropTypes.number,
  title: PropTypes.string.isRequired,
  zIndex: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  baseZIndex: PropTypes.number,
  parentSelector: PropTypes.string,
  // TopBar props
  topBarCurrentPathLabel: PropTypes.string,
  topBarPreviousPathLabel: PropTypes.string,
  // Header props
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  customControls: PropTypes.node,
  labelSecondaryButton: PropTypes.oneOfType([
    PropTypes.string,
    // intl message
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  labelPrimaryButton: PropTypes.oneOfType([
    PropTypes.string,
    // intl message
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  onPrimaryButtonClick: PropTypes.func.isRequired,
  onSecondaryButtonClick: PropTypes.func,
  isPrimaryButtonDisabled: PropTypes.bool,
  dataAttributesPrimaryButton: PropTypes.object,
  dataAttributesSecondaryButton: PropTypes.object,
};
FormModalPage.defaultProps = {
  labelPrimaryButton: buttonMessages.confirm,
  labelSecondaryButton: buttonMessages.cancel,
};

FormModalPage.Intl = buttonMessages;

export default FormModalPage;
