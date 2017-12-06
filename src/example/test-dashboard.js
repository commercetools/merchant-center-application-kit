import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InjectReducer from '../components/inject-reducer';

const pluginName = 'mcng-dashboard';

const StoreLogger = props => (
  <pre>
    <code>{JSON.stringify(props.state, null, 2)}</code>
  </pre>
);
StoreLogger.displayName = 'StoreLogger';
StoreLogger.propTypes = {
  state: PropTypes.object.isRequired,
};
const ConnectedStoreLogger = connect(state => {
  console.log('<ConnectedStoreLogger> Dashboard', state)
  return { state }
})(StoreLogger);

const dashboardReducer = () => ({
  thisIsTheDashboard: true,
});

class TestDashboard extends React.Component {
  static displayName = 'TestDashboard';

  render() {
    return (
      <InjectReducer name={pluginName} reducer={dashboardReducer}>
        <div>
          <ConnectedStoreLogger />
          <div>{'This is the APPLICATION specific part'}</div>
        </div>
      </InjectReducer>
    );
  }
}

export default TestDashboard;
