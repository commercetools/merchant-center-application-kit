import {
  css,
  type SerializedStyles,
  type Interpolation,
  type Theme,
} from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

const getBottomBorderStyles = (background: string): SerializedStyles => css`
  :after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: ${designTokens.borderRadius2};
    background-color: ${background};
    transition: background-color ${designTokens.transitionEaseinout150Ms};
  }
`;

export const getLinkStyles = (
  isActive: boolean,
  isDisabled: boolean
): Interpolation<Theme> => [
  css`
    font-size: ${designTokens.fontSizeDefault};
    padding: ${designTokens.spacingS} ${designTokens.spacingM};
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
      ${getBottomBorderStyles(designTokens.colorPrimary)}
      & h4 {
        color: ${designTokens.colorPrimary} !important;
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
        & h4 {
          color: ${designTokens.colorPrimary} !important;
        }
      }
    `,
];
