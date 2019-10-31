import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { colors } from '../design-system';

const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
};

const getSizeStyle = size => {
  switch (size) {
    case 'scale':
      return `
        &:not(:root) {
          width: 100%;
          height: auto;
        }
      `;
    case 'small':
    case 'medium':
    case 'big':
      return `
        width: ${iconSizes[size]}px;
        height: ${iconSizes[size]}px;
      `;
    default:
      return `
        width: ${iconSizes.big}px;
        height: ${iconSizes.big}px;
      `;
  }
};

const getColor = color => {
  if (!color) return 'inherit';

  const iconColor = colors.light[color];

  if (!iconColor) {
    invariant(
      color,
      `ui-kit/Icon: the specified color '${color}' is not supported.`
    );
    return 'inherit';
  }

  return iconColor;
};

export default function createStyledIcon(Component) {
  const StyledComponent = styled(Component)(
    props => css`
      * {
        fill: ${getColor(props.color)};
      }
      ${getSizeStyle(props.size)}
    `
  );
  StyledComponent.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'big', 'scale']),
  };
  return StyledComponent;
}
