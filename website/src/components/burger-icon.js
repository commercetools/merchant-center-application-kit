import React from 'react';
import PropTypes from 'prop-types';
import * as colors from '../colors';

const svgPaths = {
  burger: `M0 2.5 L16 2.5 M0 8 L16 8 M0 13.5 L16 13.5`,
  cross: `M2 2 L14 14 M2 14 L14 2`,
};

const BurgerIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={props.size}
    height={props.size}
    fill="none"
    stroke={colors.light.borders}
    strokeWidth="3"
    style={{
      display: 'block',
      verticalAlign: 'middle',
      overflow: 'visible',
    }}
  >
    <path d={props.isActive ? svgPaths.cross : svgPaths.burger} />
  </svg>
);
BurgerIcon.displayName = 'BurgerIcon';
BurgerIcon.propTypes = {
  size: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};
BurgerIcon.defaultProps = {
  size: 24,
};

export default BurgerIcon;
