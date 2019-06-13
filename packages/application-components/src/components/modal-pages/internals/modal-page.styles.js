import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-frontend/ui-kit';

export const getContainerStyles = props => css`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: calc(100% - (48px * ${props.level}));
  display: flex;
  flex-direction: column;
  background-color: ${customProperties.colorSurface};
  box-shadow: ${customProperties.shadow4}, ${customProperties.shadow6};
  outline: 0;
  transform: translate3d(30px, 0, 0);
  transition: transform 0.2s ease;
`;

export const getAfterOpenContainerAnimation = () => css`
  transform: translate3d(0, 0, 0) !important;
`;

export const getAfterOpenOverlayAnimation = () => css`
  opacity: 1 !important;
`;

export const getBeforeCloseContainerAnimation = () => css`
  transform: translate3d(30px, 0, 0) !important;
`;

export const getBeforeCloseOverlayAnimation = () => css`
  opacity: 0 !important;
`;

export const getOverlayStyles = props => css`
  position: absolute;
  z-index: ${typeof props.zIndex === 'number'
    ? props.zIndex
    : props.baseZIndex + props.level};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(32, 62, 72, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: ${customProperties.spacingS} ${customProperties.spacingM};
  overflow: auto;
`;
