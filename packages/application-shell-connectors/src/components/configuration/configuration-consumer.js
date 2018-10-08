import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { ConfigurationContext } from './configuration-provider';

const ConfigurationConsumer = props => (
  <ConfigurationContext.Consumer>
    {configuration =>
      props.children(get(configuration, props.pathToConfiguration))
    }
  </ConfigurationContext.Consumer>
);
ConfigurationConsumer.displayName = 'ConfigurationConsumer';
ConfigurationConsumer.propTypes = {
  pathToConfiguration: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired,
};

export default ConfigurationConsumer;
