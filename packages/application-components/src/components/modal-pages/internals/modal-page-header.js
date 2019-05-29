import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  customProperties,
  Text,
  Spacings,
  PrimaryButton,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';
import { css } from '@emotion/core';
import filterDataAttributes from '../../../utils/filter-data-attributes';

const ModalPageHeader = props => (
  <div
    css={css`
      margin: 0 ${customProperties.spacingM};
      padding: ${customProperties.spacingM} 0;
      border-bottom: 1px solid #afafaf;
    `}
  >
    <Spacings.Inline
      scale="m"
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Spacings.Stack>
        <Text.Subheadline elementType="h4" truncate>
          {props.title}
        </Text.Subheadline>
        {typeof props.subtitle === 'string' ? (
          <Text.Body>{props.subtitle}</Text.Body>
        ) : (
          props.subtitle
        )}
      </Spacings.Stack>
      {props.showControls &&
        (props.customControls || (
          <Spacings.Inline scale="m">
            <SecondaryButton
              label={props.labelSecondaryButton}
              onClick={props.onSecondaryButtonClick}
              {...filterDataAttributes(props.dataAttributesSecondaryButton)}
            />
            <PrimaryButton
              label={props.labelPrimaryButton}
              onClick={props.onPrimaryButtonClick}
              isDisabled={props.isPrimaryButtonDisabled}
              {...filterDataAttributes(props.dataAttributesPrimaryButton)}
            />
          </Spacings.Inline>
        ))}
    </Spacings.Inline>
  </div>
);
ModalPageHeader.displayName = 'ModalPageHeader';
ModalPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  showControls: PropTypes.bool,
  customControls: PropTypes.node,
  labelPrimaryButton: requiredIf(
    PropTypes.string,
    props => props.showControls || props.customControls
  ),
  labelSecondaryButton: requiredIf(
    PropTypes.string,
    props => props.showControls || props.customControls
  ),
  isPrimaryButtonDisabled: PropTypes.bool,
  dataAttributesPrimaryButton: PropTypes.object,
  dataAttributesSecondaryButton: PropTypes.object,
  onPrimaryButtonClick: requiredIf(
    PropTypes.func,
    props => props.showControls || props.customControls
  ),
  onSecondaryButtonClick: requiredIf(
    PropTypes.func,
    props => props.showControls || props.customControls
  ),
};
ModalPageHeader.defaultProps = {
  showControls: true,
  isPrimaryButtonDisabled: false,
  dataAttributesPrimaryButton: {},
  dataAttributesSecondaryButton: {},
};

export default ModalPageHeader;
