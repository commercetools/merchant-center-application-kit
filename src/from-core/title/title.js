import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import style from './title.mod.css';

const Title = ({ children, className, ...rest }) => (
  <h1 className={classnames(style.title, className)} {...rest}>
    {children}
  </h1>
);
Title.displayName = 'Title';
Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Title;
