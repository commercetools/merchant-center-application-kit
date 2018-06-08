// TODO: move it to UIKit
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from './card.mod.css';

const getTypeClassName = type =>
  type === 'raised' ? styles['type-raised'] : styles['type-flat'];

const Card = props => (
  <div
    className={classnames(
      styles.container,
      getTypeClassName(props.type),
      props.className
    )}
  >
    {props.children}
  </div>
);
Card.displayName = 'Card';
Card.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['raised', 'flat']),
  children: PropTypes.any,
};

Card.defaultProps = {
  type: 'raised',
};

export default Card;
