import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import { ConfigurationContext } from './configuration-provider';

const ConfigurationConsumer = props => (
  <ConfigurationContext.Consumer>
    {configuration =>
      props.children(getIn(configuration, this.propspathToConfiguration))
    }
  </ConfigurationContext.Consumer>
);
ConfigurationConsumer.displayName = 'ConfigurationConsumer';
ConfigurationConsumer.propTypes = {
  pathToConfiguration: PropTypes.string,
  children: PropTypes.func.isRequired,
};

export default ConfigurationConsumer;
