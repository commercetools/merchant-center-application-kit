import React from 'react';
import PropTypes from 'prop-types';
import { ACTIVATE_PLUGIN } from '@commercetools-local/constants';
import { connect } from 'react-redux';
import LocalProvider from '../local-provider';

const activatePlugin = pluginName => ({
  type: ACTIVATE_PLUGIN,
  payload: pluginName,
});

// This component will inject a plugin reducer into the global store.
// Render this as the root component of the plugin, as it should be
// the first thing the plugin needs to do to register itself.
// NOTE: this component will probably become useless once we start
// migrating plugins into applications.
export class InjectReducer extends React.PureComponent {
  static displayName = 'InjectReducer';

  static propTypes = {
    name: PropTypes.string.isRequired,
    reducer: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    activePlugin: PropTypes.string,
  };

  static contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      replaceReducer: PropTypes.func.isRequired,
      injectedReducers: PropTypes.objectOf(PropTypes.func.isRequired),
      injectReducer: PropTypes.func.isRequired,
    }),
  };

  componentWillMount() {
    // Check `store.injectedReducers[name] === reducer`.
    // In case the reducer has already been defined but the component mounts
    // again we should avoid to injecting it again.
    if (
      Reflect.has(this.context.store.injectedReducers, this.props.name) &&
      this.context.store.injectedReducers[this.props.name] ===
        this.props.reducer
    )
      return;

    // Given the plugin name and reducer, inject it into the store.
    this.context.store.injectReducer({
      name: this.props.name,
      reducer: this.props.reducer,
    });

    // Tell the store to activate the given plugin.
    this.context.store.dispatch(activatePlugin(this.props.name));
  }

  render() {
    return this.props.activePlugin === this.props.name ? (
      <LocalProvider plugin={this.props.activePlugin}>
        {this.props.children}
      </LocalProvider>
    ) : null;
  }
}

export default connect(state => ({ activePlugin: state.activePlugin }))(
  InjectReducer
);
