import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import styles from './butler-container.mod.css';

class ButlerContainer extends React.Component {
  static displayName = 'ButlerContainer';
  static propTypes = {
    timedOut: PropTypes.bool,
    error: PropTypes.any,
  };

  componentDidUpdate() {
    if (this.props.error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load component', this.props.error);
    }
  }

  render() {
    // render no overlay in case of loding error, just show nothing then
    if (this.props.timedOut || this.props.error) return null;

    return (
      <div
        className={styles.container}
        tabIndex="-1"
        // omit this.props of react-loadable
        {...omit(this.props, [
          'error',
          'timedOut',
          'pastDelay',
          'isLoading',
          'retry',
        ])}
      />
    );
  }
}

export default ButlerContainer;
