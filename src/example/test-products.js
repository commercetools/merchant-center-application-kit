import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InjectReducer from '../components/inject-reducer';

const pluginName = 'mcng-products';

// every plugin is supposed to export which events it wants to track
export const trackingEventWhitelist = {
  ProductsButton: 'ProductsButton',
};

const StoreLogger = props => (
  <pre>
    <code>{JSON.stringify(props.state, null, 2)}</code>
  </pre>
);
StoreLogger.displayName = 'StoreLogger';
StoreLogger.propTypes = {
  state: PropTypes.object.isRequired,
};
const ConnectedStoreLogger = connect(state => ({ state }))(StoreLogger);

const productsReducer = () => ({
  thisIsProducts: true,
});

class TestProducts extends React.Component {
  static displayName = 'TestProducts';

  render() {
    return (
      <InjectReducer name={pluginName} reducer={productsReducer}>
        <div>
          <ConnectedStoreLogger />
          <div>{'This is the APPLICATION specific part'}</div>
          <button
            data-track-component="ProductsButton"
            data-track-event="click"
          >
            {
              'Clicking me will send an event to Google Analytics via Google Tag Manager'
            }
          </button>
        </div>
      </InjectReducer>
    );
  }
}

export default TestProducts;
