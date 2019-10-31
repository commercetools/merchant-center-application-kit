// Inspired from ui-kit
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { colors, tokens } from '../design-system';
import AccessibleButton from './accessible-button';

const buttonSizes = {
  small: '16px',
  medium: '24px',
  big: '32px',
};

const getStateStyles = isDisabled => {
  if (isDisabled) {
    return css`
      background-color: ${colors.light.surfaceQuote};
      border-color: ${colors.light.borderSecondary};
      color: ${colors.light.textFaded};
      box-shadow: none;
    `;
  }
  return css`
    &:hover {
      box-shadow: ${tokens.shadow8};
    }
    &:active {
      box-shadow: ${tokens.shadow9};
      background-color: ${colors.light.surfacePrimary};
      border-color: ${colors.light.surfacePrimary};
    }
  `;
};
const getShapeStyles = (shape, size) => {
  switch (shape) {
    case 'round':
      return css`
        border-radius: 50%;
      `;
    case 'square':
      switch (size) {
        case 'small':
          return css`
            border-radius: ${tokens.borderRadius2};
          `;
        case 'medium':
          return css`
            border-radius: ${tokens.borderRadius4};
          `;
        case 'big':
          return css`
            border-radius: ${tokens.borderRadius6};
          `;
        default:
          return css``;
      }
    default:
      return css``;
  }
};
const getSizeStyles = size => {
  switch (size) {
    case 'small':
      return css`
        height: ${buttonSizes.small};
        width: ${buttonSizes.small};
      `;
    case 'medium':
      return css`
        height: ${buttonSizes.medium};
        width: ${buttonSizes.medium};
      `;
    case 'big':
      return css`
        height: ${buttonSizes.big};
        width: ${buttonSizes.big};
      `;
    default:
      return css``;
  }
};
// Gets the color which the icon should have based on context of button's state/cursor behavior
const getIconColor = props => {
  // if button is disabled, icon should be neutral60
  if (props.isDisabled) return 'surfaceSecondary3';
  // if button is not disabled nor has a theme, return icon's default color
  return props.icon.props.color;
};

export const IconButton = props => (
  <AccessibleButton
    type={props.type}
    label={props.label}
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    css={[
      css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid ${colors.light.surfacePrimary};
        background-color: ${colors.light.surfacePrimary};
        box-shadow: ${tokens.shadow7};
        color: ${colors.light.textPrimary};
        transition: background-color 80ms linear, box-shadow 150ms ease-in-out;
      `,
      getStateStyles(props.isDisabled),
      getShapeStyles(props.shape, props.size),
      getSizeStyles(props.size),
    ]}
  >
    {props.icon &&
      React.cloneElement(props.icon, {
        size: props.size,
        color: getIconColor(props),
      })}
  </AccessibleButton>
);

IconButton.propTypes = {
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  shape: PropTypes.oneOf(['round', 'square']),
  size: PropTypes.oneOf(['small', 'medium', 'big']),
};

IconButton.defaultProps = {
  type: 'button',
  size: 'big',
  shape: 'round',
};

IconButton.displayName = 'IconButton';

export default IconButton;
