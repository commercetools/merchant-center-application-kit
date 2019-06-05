import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import ModalPage from '../internals/modal-page';
import ModalPageTopBar from '../internals/modal-page-top-bar';
import ModalPageHeader from '../internals/modal-page-header';
import { ContentWrapper } from '../internals/modal-page.styles';
import messages from '../internals/messages';

const getFormattedLabel = (label, intl) =>
  typeof label === 'string' ? label : intl.formatMessage(label);

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
      labelPrimaryButton={getFormattedLabel(
        props.labelPrimaryButton,
        props.intl
      )}
      labelSecondaryButton={getFormattedLabel(
        props.labelSecondaryButton,
        props.intl
      )}
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
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  labelPrimaryButton: PropTypes.oneOfType([
    PropTypes.string,
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
  // injected
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};
FormModalPage.defaultProps = {
  labelPrimaryButton: messages.confirm,
  labelSecondaryButton: messages.cancel,
};

FormModalPage.Intl = { confirm: messages.confirm, cancel: messages.cancel };

export default injectIntl(FormModalPage);
