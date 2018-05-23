import React from 'react';
import PropTypes from 'prop-types';
import { ConfigurationContext } from './configuration-provider';

const ConfigurationConsumer = props => (
  <ConfigurationContext.Consumer>
    {configuration => props.children(configuration)}
  </ConfigurationContext.Consumer>
);
ConfigurationConsumer.displayName = 'ConfigurationConsumer';
ConfigurationConsumer.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ConfigurationConsumer;
