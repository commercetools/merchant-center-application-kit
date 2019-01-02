import React from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';

export class InjectReducers extends React.PureComponent {
  static displayName = 'InjectReducers';
  static propTypes = {
    id: PropTypes.string.isRequired,
    reducers: PropTypes.objectOf(PropTypes.func).isRequired,
    children: PropTypes.node.isRequired,
  };
  static contextType = ReactReduxContext;
  state = {
    hasPluginReducerBeenInjected: false,
  };

  componentDidMount() {
    const hasPluginReducerBeenInjected =
      Reflect.has(this.context.store.injectedReducers, this.props.id) &&
      this.context.store.injectedReducers[this.props.id] ===
        this.props.reducers;

    // In case the reducer has already been defined but the component mounts
    // again we should avoid to inject it again.
    if (!hasPluginReducerBeenInjected) {
      this.context.store.injectReducers({
        id: this.props.id,
        reducers: this.props.reducers,
      });
      this.setState({ hasPluginReducerBeenInjected: true });
    }
  }

  render() {
    // Render children only when the plugin reducers have been injected
    if (this.state.hasPluginReducerBeenInjected) return this.props.children;
    return null;
  }
}

export default InjectReducers;
