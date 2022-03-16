import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

export const TRANSITION_DURATION = 200;

type StyleProps = {
  level: number;
  zIndex?: number;
  baseZIndex: number;
};

export const getContainerStyles = (props: StyleProps) => css`
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
  transition: transform ${TRANSITION_DURATION}ms ease;
`;

export const getOverlayStyles = (props: StyleProps) => css`
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
  transition: opacity ${TRANSITION_DURATION}ms ease;
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
