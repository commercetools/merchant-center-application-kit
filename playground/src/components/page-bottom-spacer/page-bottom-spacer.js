import React from 'react';
import PropTypes from 'prop-types';
import styles from './page-bottom-spacer.mod.css';

/**
 * Adding properly this component also prevents the save toolbar to overlap
 * any other component in the layout.
 */
const PageBottomSpacer = props => (
  <div className={styles[`height-${props.size}`]} />
);
PageBottomSpacer.displayName = 'PageBottomSpacer';
PageBottomSpacer.propTypes = {
  size: PropTypes.oneOf(['m', 'l', 'xl']).isRequired,
};
PageBottomSpacer.defaultProps = {
  size: 'm',
};
export default PageBottomSpacer;
