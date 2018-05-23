import React from 'react';
import { wrapDisplayName } from 'recompose';
import { ConfigurationConsumer } from './configuration-consumer';

const injectConfiguration = (
  pathToConfiguration,
  propName = 'configuration'
) => Component => {
  class EnhancedComponent extends React.PureComponent {
    static displayName = wrapDisplayName(Component, 'injectConfiguration');
    render() {
      return (
        <ConfigurationConsumer pathToConfiguration={pathToConfiguration}>
          {configuration => (
            <Component {...this.props} {...{ [propName]: configuration }} />
          )}
        </ConfigurationConsumer>
      );
    }
  }

  return EnhancedComponent;
};

export default injectConfiguration;
