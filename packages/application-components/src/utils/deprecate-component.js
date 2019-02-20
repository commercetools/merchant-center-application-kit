import React from 'react';
import { getDisplayName } from 'recompose';
import warning from 'warning';

export default function deprecateComponent({ message = '' }) {
  return Component =>
    class DeprecateComponent extends React.PureComponent {
      static displayName = `Deprecated(${getDisplayName(Component)})`;
      componentDidMount() {
        const shouldSkipWarning = process.env.NODE_ENV === 'production';
        warning(
          // `warning` logs the message when `NODE_ENV` is not 'production'
          shouldSkipWarning,
          `\`${getDisplayName(Component)}\` is no longer supported. ${message}`
        );
      }
      render() {
        return <Component {...this.props} />;
      }
    };
}
