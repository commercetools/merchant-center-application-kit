import { css, type SerializedStyles } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import type { TModalPageSize } from './modal-page';

export const TRANSITION_DURATION = 200;
export const LONGER_TRANSITION_DURATION = 300;

type StyleProps = {
  zIndex?: number;
  size?: TModalPageSize;
};

const getContainerSize = (size?: TModalPageSize) => {
  switch (size) {
    case 10:
      return '600px !important';
    case 20:
      return '900px !important';
    case 30:
      return '1200px !important';
    default:
      return '100%';
  }
};

const getTransformationSize = (size?: TModalPageSize) => {
  switch (size) {
    case 10:
      return '600px';
    case 20:
      return '900px';
    case 30:
      return '1200px';
    default:
      return '30px';
  }
};

export const getTransitionDuration = (size?: TModalPageSize) =>
  size === 'scale' ? TRANSITION_DURATION : LONGER_TRANSITION_DURATION;

export const getContainerStyles = (_props: StyleProps): SerializedStyles => css`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${getContainerSize(_props.size)};
  display: flex;
  flex-direction: column;
  background-color: ${customProperties.colorSurface};
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
  outline: 0;
  transform: translate3d(${getTransformationSize(_props.size)}, 0, 0);
  transition: transform ${getTransitionDuration(_props.size)}ms ease;
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
  background-color: hsla(195, 35%, 20%, 0.05);
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
