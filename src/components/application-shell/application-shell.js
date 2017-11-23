import React from 'react';
import PropTypes from 'prop-types';

class ApplicationShell extends React.PureComponent {
  static displayName = 'ApplicationShell';
  static propTypes = {
    children: PropTypes.element.isRequired,
  };
  render() {
    return (
      <div>
        {'TODO: application shell'}
        {this.props.children}
      </div>
    );
  }
}
export default ApplicationShell;
