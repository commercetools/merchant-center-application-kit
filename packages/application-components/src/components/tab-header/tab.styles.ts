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

const getTabHeaderStateStyles = (
  isActive: boolean,
  isDisabled: boolean
): SerializedStyles[] => {
  const combinedStyles: SerializedStyles[] = [
    getBottomBorderStyles('transparent'),
  ];
  if (isActive) {
    combinedStyles.push(getBottomBorderStyles(customProperties.colorPrimary));
  }
  if (isDisabled) {
    combinedStyles.push(css`
      cursor: not-allowed;
    `);
  }
  return combinedStyles;
};

export const getTabHeaderStyles = (
  isActive: boolean,
  isDisabled: boolean
): SerializedStyles[] => [
  css`
    color: ${customProperties.colorAccent};
    position: relative;
    text-align: center;
    display: inline-block;

    &:first-of-type > * {
      padding-left: 0;
    }

    > * {
      color: inherit;
      text-decoration: inherit;
    }
  `,
  ...getTabHeaderStateStyles(isActive, isDisabled),
];

export const getLinkStyles = (
  isActive: boolean,
  isDisabled: boolean
): Interpolation<Theme> => [
  css`
    font-size: ${customProperties.fontSizeDefault};
    display: block;
    padding: ${customProperties.spacingS} ${customProperties.spacingM};
  `,
  isActive &&
    css`
      > * {
        color: ${customProperties.colorPrimary} !important;
      }
    `,
  isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
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
