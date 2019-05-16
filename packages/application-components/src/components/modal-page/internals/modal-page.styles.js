import { css, keyframes } from '@emotion/core';
import { customProperties } from '@commercetools-frontend/ui-kit';

const slideFromLeft = keyframes`
  from {
    transform: translate3d(30px, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

export const getContainerStyles = props => css`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: calc(100% - (${customProperties.spacingXl} * ${props.level}));
  display: flex;
  flex-direction: column;
  background-color: ${customProperties.colorSurface};
  outline: 0;
  animation: ${slideFromLeft} 0.2s ease;
`;

export const getOverlayStyles = props => css`
  position: absolute;
  z-index: ${
    typeof props.zIndex === 'number'
      ? props.zIndex
      : props.baseZIndex + props.level
  }
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(32, 62, 72, 0.5);
  animation: ${fadeIn} 0.2s ease;
`;

export const getTopBarStyles = props => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${customProperties.spacingS} ${customProperties.spacingM};
  background-color: ${props.tone === 'gray'
    ? customProperties.colorGray95
    : customProperties.colorWhite};
  border-bottom: 1px solid
    ${props.tone === 'gray'
      ? customProperties.colorWhite
      : customProperties.colorGray};
`;
