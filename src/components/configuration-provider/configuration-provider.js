import PropTypes from 'prop-types';
import React from 'react';

export default class ConfigurationProvider extends React.PureComponent {
  static displayName = 'ConfigurationProvider';
  static propTypes = {
    configuration: PropTypes.object.isRequired,
    children: PropTypes.element,
  };

  static childContextTypes = {
    configuration: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      configuration: this.props.configuration,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
