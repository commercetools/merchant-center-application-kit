import { css, type SerializedStyles } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';

export const TRANSITION_DURATION = 200;

type StyleProps = {
  zIndex?: number;
  size?: 'small' | 'large';
};

export const getContainerStyles = (_props: StyleProps): SerializedStyles => css`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${_props.size === 'small' ? '600px !important' : '100%'};
  display: flex;
  flex-direction: column;
  background-color: ${customProperties.colorSurface};
  box-shadow: ${customProperties.shadow4}, ${customProperties.shadow6};
  outline: 0;
  transform: translate3d(30px, 0, 0);
  transition: transform ${TRANSITION_DURATION}ms ease;
`;

export const getOverlayStyles = (props: StyleProps): SerializedStyles => css`
  position: absolute;
  z-index: ${typeof props.zIndex === 'number'
    ? // Use `!important` to overwrite the default value assigned by the Stacking Layer System.
      `${props.zIndex} !important`
    : 'auto'};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(32, 62, 72, 0.5);
  opacity: 0;
  transition: opacity ${TRANSITION_DURATION}ms ease;
`;

export const getAfterOpenContainerAnimation = (): SerializedStyles => css`
  transform: translate3d(0, 0, 0) !important;
`;

export const getAfterOpenOverlayAnimation = (): SerializedStyles => css`
  opacity: 1 !important;
`;

export const getBeforeCloseContainerAnimation = (): SerializedStyles => css`
  transform: translate3d(30px, 0, 0) !important;
`;

export const getBeforeCloseOverlayAnimation = (): SerializedStyles => css`
  opacity: 0 !important;
`;
