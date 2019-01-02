import React from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';

export class InjectReducers extends React.PureComponent {
  static displayName = 'InjectReducers';
  static propTypes = {
    id: PropTypes.string.isRequired,
    reducers: PropTypes.objectOf(PropTypes.func).isRequired,
    shouldCleanUpWhenUnmounts: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };
  static defaultProps = { shouldCleanUpWhenUnmounts: true };
  static contextType = ReactReduxContext;
  state = {
    areReducersInjected: false,
  };

  componentDidMount() {
    this.context.store.injectReducers({
      id: this.props.id,
      reducers: this.props.reducers,
    });
    this.setState({ areReducersInjected: true });
  }

  componentWillUnmount() {
    if (this.props.shouldCleanUpWhenUnmounts) {
      this.context.store.removeReducers({
        id: this.props.id,
      });
    }
  }

  render() {
    // Render children only when the plugin reducers have been injected
    if (this.state.areReducersInjected) return this.props.children;
    return null;
  }
}

export default InjectReducers;
