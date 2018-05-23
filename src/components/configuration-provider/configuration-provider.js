import PropTypes from 'prop-types';
import React from 'react';

export const ConfigurationContext = React.createContext({});

export default class ConfigurationProvider extends React.PureComponent {
  static displayName = 'ConfigurationProvider';
  static propTypes = {
    configuration: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  render() {
    return (
      <ConfigurationContext.Provider value={this.props.configuration}>
        {this.props.children}
      </ConfigurationContext.Provider>
    );
  }
}
