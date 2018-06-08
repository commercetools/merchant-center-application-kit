// TODO: move it to UIKit
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from './card.mod.css';

const getTypeClassName = type =>
  type === 'raised' ? styles['type-raised'] : styles['type-flat'];

const getThemeClassName = theme =>
  theme === 'light' ? styles['theme-light'] : styles['theme-dark'];

const Card = props => (
  <div
    className={classnames(
      styles.container,
      getTypeClassName(props.type),
      getThemeClassName(props.theme),
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
  theme: PropTypes.oneOf(['light', 'dark']),
};

Card.defaultProps = {
  type: 'raised',
  theme: 'light',
};

export default Card;
