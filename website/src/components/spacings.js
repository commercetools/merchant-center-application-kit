import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { dimensions } from '../design-system';

const getMargin = scale => {
  switch (scale) {
    case 'xs':
      return dimensions.spacings.xs;
    case 's':
      return dimensions.spacings.s;
    case 'm':
      return dimensions.spacings.m;
    case 'l':
      return dimensions.spacings.l;
    case 'xl':
      return dimensions.spacings.xl;
    default:
      return 0;
  }
};

/**
 * We need to force the margin for the child elements as ome children
 * might have `margin: 0` defined, which results in a higher CSS specificity,
 * causing the margings of the spacing components to be ignored.
 * See https://github.com/commercetools/ui-kit/issues/542
 */
const getStackStyles = props => css`
  display: flex;
  flex-direction: column;
  align-items: ${props.alignItems};
  > * + * {
    margin: ${getMargin(props.scale)} 0 0 !important;
  }
`;
const getInlineStyles = props => css`
  display: flex;
  align-items: ${props.alignItems};
  justify-content: ${props.justifyContent};
  > * + * {
    margin: 0 0 0 ${getMargin(props.scale)} !important;
  }
`;

const Stack = props => <div css={getStackStyles(props)}>{props.children}</div>;
Stack.displayName = 'Stack';
Stack.propTypes = {
  scale: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  children: PropTypes.node,
  alignItems: PropTypes.oneOf(['stretch', 'flex-start', 'flex-end', 'center']),
};
Stack.defaultProps = {
  scale: 's',
  alignItems: 'stretch',
};

const Inline = props => (
  <span css={getInlineStyles(props)}>{props.children}</span>
);
Inline.displayName = 'Inline';
Inline.propTypes = {
  scale: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  alignItems: PropTypes.oneOf([
    'stretch',
    'flex-start',
    'flex-end',
    'center',
    'baseline',
  ]),
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  children: PropTypes.node,
};
Inline.defaultProps = {
  scale: 's',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

const Spacings = { Stack, Inline };

export default Spacings;
