import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import LoadingSpinner from '@commercetools-local/core/components/loading-spinner';
import messages from './messages';

// TODO: move it to some constants file?
const selectorId = 'loader-for-requests-in-flight';

export class RequestsInFlightLoader extends React.PureComponent {
  static displayName = 'RequestsInFlightLoader';
  static propTypes = {
    // Injected
    hasRequestsInFlight: PropTypes.bool.isRequired,
  };
  // Makes it easier to test
  renderLoader = () => (
    <LoadingSpinner>
      <FormattedMessage {...messages.labelLoading} />
    </LoadingSpinner>
  );
  render() {
    return (
      this.props.hasRequestsInFlight &&
      ReactDOM.createPortal(
        this.renderLoader(),
        document.getElementById(selectorId)
      )
    );
  }
}

const mapStateToProps = state => ({
  hasRequestsInFlight: Boolean(
    state.requestsInFlight && state.requestsInFlight.length > 0
  ),
});

export default connect(mapStateToProps)(RequestsInFlightLoader);
