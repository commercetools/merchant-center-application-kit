import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { customProperties } from '@commercetools-frontend/ui-kit';
import { css } from '@emotion/core';
import ModalPageHeaderTitle from './modal-page-header-title';
import ModalPageHeaderDefaultControls from './modal-page-header-default-controls';

const ModalPageHeader = props => (
  <div
    css={css`
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin: 0 ${customProperties.spacingM};
      padding: ${customProperties.spacingM} 0;
      border-bottom: 1px solid ${customProperties.colorNeutral60};
      & > * + * {
        margin-left: ${customProperties.spacingM};
      }
    `}
  >
    <ModalPageHeaderTitle title={props.title} subtitle={props.subtitle} />
    {props.showControls &&
      (props.customControls || (
        <ModalPageHeaderDefaultControls
          labelSecondaryButton={props.labelSecondaryButton}
          labelPrimaryButton={props.labelPrimaryButton}
          isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
          onSecondaryButtonClick={props.onSecondaryButtonClick}
          onPrimaryButtonClick={props.onPrimaryButtonClick}
          dataAttributesSecondaryButton={props.dataAttributesSecondaryButton}
          dataAttributesPrimaryButton={props.dataAttributesPrimaryButton}
        />
      ))}
  </div>
);
ModalPageHeader.displayName = 'ModalPageHeader';
ModalPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  showControls: PropTypes.bool,
  // Replaces default control buttons
  customControls: PropTypes.node,
  // For default control buttons
  labelSecondaryButton: requiredIf(
    PropTypes.oneOfType([
      PropTypes.string,
      // intl message
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        defaultMessage: PropTypes.string.isRequired,
      }),
    ]),
    props => !props.customControls
  ),
  labelPrimaryButton: requiredIf(
    PropTypes.oneOfType([
      PropTypes.string,
      // intl message
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        defaultMessage: PropTypes.string.isRequired,
      }),
    ]),
    props => !props.customControls
  ),
  onSecondaryButtonClick: requiredIf(
    PropTypes.func,
    props => !props.customControls
  ),
  onPrimaryButtonClick: requiredIf(
    PropTypes.func,
    props => !props.customControls
  ),
  isPrimaryButtonDisabled: PropTypes.bool,
  dataAttributesPrimaryButton: PropTypes.object,
  dataAttributesSecondaryButton: PropTypes.object,
};
ModalPageHeader.defaultProps = {
  showControls: true,
};

export default ModalPageHeader;
