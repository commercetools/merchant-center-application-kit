import React from 'react';
import { wrapDisplayName } from 'recompose';
import { getIn } from 'formik';
import { ConfigurationContext } from './configuration-provider';

const injectConfiguration = (
  pathToConfiguration,
  propName = 'configuration'
) => Component => {
  class EnhancedComponent extends React.PureComponent {
    static displayName = wrapDisplayName(Component, 'injectConfiguration');
    render() {
      return (
        <ConfigurationContext.Consumer>
          {configuration => (
            <Component
              {...this.props}
              {...{ [propName]: getIn(configuration, pathToConfiguration) }}
            />
          )}
        </ConfigurationContext.Consumer>
      );
    }
  }

  return EnhancedComponent;
};

export default injectConfiguration;
