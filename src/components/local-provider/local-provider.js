import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import memoizedCreateLocalStore from './create-local-store';

export class LocalProvider extends React.Component {
  static displayName = 'LocalProvider';

  static propTypes = {
    children: PropTypes.any,
    plugin: PropTypes.string,
    hasStateForActivePlugin: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    store: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    // Only update when a plugin is defined and has its own state slice,
    // otherwise we're in the middle of either a plugin or project switch, so
    // the state is inconsistent
    return Boolean(nextProps.plugin) && nextProps.hasStateForActivePlugin;
  }

  getChildContext() {
    return {
      store: this.props.plugin
        ? memoizedCreateLocalStore(this.context.store, this.props.plugin)
        : this.context.store,
    };
  }

  render() {
    // Only show the plugin when the state for it is initialized
    return this.props.hasStateForActivePlugin ? this.props.children : null;
  }
}

export const mapStateToProps = (state, ownProps) => ({
  hasStateForActivePlugin: Object.prototype.hasOwnProperty.call(
    state,
    ownProps.plugin
  ),
});

export default connect(mapStateToProps)(LocalProvider);
