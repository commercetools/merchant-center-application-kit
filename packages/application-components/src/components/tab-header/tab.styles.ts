import {
  css,
  type SerializedStyles,
  type Interpolation,
  type Theme,
} from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

const getBottomBorderStyles = (background: string): SerializedStyles => css`
  :after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: ${customProperties.borderRadius2};
    background-color: ${background};
    transition: background-color ${customProperties.transitionEaseinout150Ms};
  }
`;

export const getLinkStyles = (
  isActive: boolean,
  isDisabled: boolean
): Interpolation<Theme> => [
  css`
    font-size: ${customProperties.fontSizeDefault};
    padding: ${customProperties.spacingS} ${customProperties.spacingM};
    position: relative;
    text-align: center;
    display: inline-block;
    color: inherit;
    text-decoration: inherit;

    &:first-of-type {
      padding-left: 0;
    }

    ${getBottomBorderStyles('transparent')}
  `,
  isActive &&
    css`
      ${getBottomBorderStyles(customProperties.colorPrimary)}
      > * {
        color: ${customProperties.colorPrimary} !important;
      }
    `,
  isDisabled &&
    css`
      &[aria-disabled='true'] {
        cursor: not-allowed;
        opacity: 0.5;

        &:active {
          pointer-events: none;
        }
      }
    `,
  !isActive &&
    !isDisabled &&
    css`
      :hover,
      :focus,
      :active {
        > * {
          color: ${customProperties.colorPrimary} !important;
        }
      }
    `,
];
