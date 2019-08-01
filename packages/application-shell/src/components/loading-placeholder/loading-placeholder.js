import PropTypes from 'prop-types';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-frontend/ui-kit';

const animationPulse = keyframes`
  0% {
    background-color: ${customProperties.colorNeutral};
  }
  100% {
    background-color: ${customProperties.colorNeutral95};
  }
`;

const getWidthBySize = props => {
  switch (props.shape) {
    case 'dot':
      switch (props.size) {
        case 's':
          return customProperties.spacingS;
        case 'm':
          return customProperties.spacingM;
        case 'l':
          return customProperties.spacingL;
        case 'xl':
          return customProperties.spacingXl;
        default:
          return 'auto';
      }
    case 'rect':
      switch (props.size) {
        case 's':
          return '150px';
        case 'm':
          return '300px';
        case 'l':
          return '450px';
        case 'xl':
          return '600px';
        default:
          return 'auto';
      }
    default:
      return 'auto';
  }
};
const getHeightBySize = props => {
  switch (props.shape) {
    case 'dot':
      return getWidthBySize(props);
    case 'rect':
      return '32px';
    default:
      return 'auto';
  }
};
const getRadiusBySize = props => {
  switch (props.shape) {
    case 'dot':
      switch (props.size) {
        case 's':
          return customProperties.borderRadius4;
        case 'm':
          return '8px';
        case 'l':
          return '12px';
        case 'xl':
          return '16px';
        default:
          return 'none';
      }
    case 'rect':
      return customProperties.borderRadius4;
    default:
      return 'none';
  }
};

const LoadingPlaceholder = styled.div`
  background-color: ${customProperties.colorNeutral};
  animation-name: ${animationPulse};
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: infinite;

  width: ${getWidthBySize};
  height: ${getHeightBySize};
  border-radius: ${getRadiusBySize};
`;
LoadingPlaceholder.displayName = 'LoadingPlaceholder';
LoadingPlaceholder.propTypes = {
  shape: PropTypes.oneOf(['dot', 'rect']).isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl']).isRequired,
};

export default LoadingPlaceholder;
